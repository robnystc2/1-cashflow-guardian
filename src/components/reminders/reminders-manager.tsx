'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Send, BellRing, Clock, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { format, formatDistanceToNow, isPast, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

type FilterType = 'all' | 'pending' | 'sent' | 'failed'

export default function RemindersManager({ userId }: { userId: string }) {
  const [reminders, setReminders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')
  const supabase = createClient()

  const fetchReminders = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: remindersData, error: remindersError } = await supabase
        .from('payment_reminders')
        .select('*, invoice:invoices!inner(invoice_number, subtotal, due_date, client:clients!inner(name, email))')
        .order('scheduled_date', { ascending: true })

      if (remindersError) throw remindersError

      const reminderIds = (remindersData || []).map(r => r.id)
      let logsData: any[] = []
      if (reminderIds.length > 0) {
        const { data: logs, error: logsError } = await supabase
          .from('reminder_logs')
          .select('*')
          .in('reminder_id', reminderIds)
        if (!logsError) logsData = logs || []
      }

      const combined = (remindersData || []).map(reminder => ({
        ...reminder,
        reminder_logs: logsData.filter(log => log.reminder_id === reminder.id)
      }))

      setReminders(combined)
    } catch (err: any) {
      console.error('Error fetching reminders:', err)
      setError(err.message || 'Error al cargar recordatorios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReminders() }, [userId])

  const handleSendNow = async (reminderId: string) => {
    const { error } = await supabase.functions.invoke('send-payment-reminders', { body: { reminderId } })
    if (error) alert(error.message)
    else { alert('Recordatorio enviado'); fetchReminders() }
  }

  const getStatusIcon = (reminder: any) => {
    if (reminder.sent) {
      const log = reminder.reminder_logs?.[0]
      if (log?.status === 'failed') return <XCircle className="w-4 h-4 text-red-400" />
      return <CheckCircle2 className="w-4 h-4 text-emerald-400" />
    }
    if (isPast(new Date(reminder.scheduled_date))) return <AlertTriangle className="w-4 h-4 text-amber-400" />
    return <Clock className="w-4 h-4 text-blue-400" />
  }

  const getRelativeTime = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { locale: es, addSuffix: true }).replace('alrededor de ', '')
    } catch { return date }
  }

  const getFormattedDueDate = (date: string) => {
    try {
      return format(parseISO(date), 'd MMM yyyy', { locale: es })
    } catch { return date }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'friendly': return <span className="px-2 py-0.5 rounded-full text-xs bg-blue-900/50 text-blue-400 border border-blue-700">Amable</span>
      case 'firm': return <span className="px-2 py-0.5 rounded-full text-xs bg-amber-900/50 text-amber-400 border border-amber-700">Firme</span>
      case 'final': return <span className="px-2 py-0.5 rounded-full text-xs bg-red-900/50 text-red-400 border border-red-700">Final</span>
      default: return <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-700">-</span>
    }
  }

  const filteredReminders = reminders.filter(r => {
    if (filter === 'all') return true
    if (filter === 'pending') return !r.sent
    if (filter === 'sent') return r.sent && r.reminder_logs?.[0]?.status !== 'failed'
    if (filter === 'failed') return r.sent && r.reminder_logs?.[0]?.status === 'failed'
    return true
  })

  if (loading) return <div className="text-center py-8"><Loader2 className="animate-spin mx-auto w-8 h-8 text-zinc-400" /></div>

  if (error) return (
    <Card className="bg-zinc-900 border-red-900/50 p-8 text-center">
      <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Error al cargar recordatorios</h3>
      <p className="text-zinc-400 text-sm mb-4">{error}</p>
      <Button variant="outline" className="border-zinc-700" onClick={fetchReminders}>
        <RefreshCw className="w-4 h-4 mr-2" /> Reintentar
      </Button>
    </Card>
  )

  return (
    <div className="space-y-6">
      {reminders.length === 0 ? (
        <Card className="bg-zinc-900 border-zinc-800 p-12 text-center">
          <BellRing className="w-16 h-16 text-zinc-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold mb-3">Tu máquina de cobro está lista</h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto text-sm">
            Crea tu primera factura con un cliente y activa los recordatorios automáticos. El sistema cobrará por ti.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/invoices">
              <Button className="bg-emerald-600 hover:bg-emerald-500">Crear factura</Button>
            </Link>
            <Button variant="outline" className="border-zinc-700" onClick={fetchReminders}>
              <RefreshCw className="w-4 h-4 mr-2" /> Recargar
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-zinc-900 border-zinc-800 p-4">
              <p className="text-xs text-zinc-500">Recordatorios activos</p>
              <p className="text-2xl font-bold">{reminders.filter(r => !r.sent).length}</p>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 p-4">
              <p className="text-xs text-zinc-500">Próximo envío</p>
              <p className="text-2xl font-bold text-blue-400">
                {reminders.find(r => !r.sent && !isPast(new Date(r.scheduled_date)))
                  ? getRelativeTime(reminders.find(r => !r.sent && !isPast(new Date(r.scheduled_date)))!.scheduled_date)
                  : 'Ninguno'}
              </p>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 p-4">
              <p className="text-xs text-zinc-500">Total pendientes</p>
              <p className="text-2xl font-bold text-amber-400">{reminders.filter(r => !r.sent).length}</p>
            </Card>
          </div>

          <div className="flex gap-2">
            {(['all', 'pending', 'sent', 'failed'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  filter === f ? 'bg-white text-black font-medium' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendientes' : f === 'sent' ? 'Enviados' : 'Fallidos'}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredReminders.map(reminder => (
              <Card key={reminder.id} className="bg-zinc-900 border-zinc-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(reminder)}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">
                        {reminder.invoice?.client?.name || 'Cliente'} — Factura {reminder.invoice?.invoice_number}
                      </p>
                      {getTypeBadge(reminder.type)}
                    </div>
                    <p className="text-xs text-zinc-400">
                      €{reminder.invoice?.subtotal} · Vence {getFormattedDueDate(reminder.invoice?.due_date)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-zinc-500">
                        {reminder.sent 
                          ? `Enviado ${reminder.reminder_logs?.[0]?.sent_at ? getRelativeTime(reminder.reminder_logs[0].sent_at) : ''}`
                          : `Programado ${getRelativeTime(reminder.scheduled_date)}`
                        }
                      </span>
                      {reminder.sent && reminder.reminder_logs?.[0]?.status === 'failed' && (
                        <span className="text-xs text-red-400 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Falló
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!reminder.sent && (
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500" onClick={() => handleSendNow(reminder.id)}>
                      <Send className="w-4 h-4 mr-1" /> Enviar ahora
                    </Button>
                  )}
                  {reminder.sent && (
                    <Button size="sm" variant="outline" className="border-zinc-700" onClick={() => handleSendNow(reminder.id)}>
                      <RefreshCw className="w-4 h-4 mr-1" /> Reenviar
                    </Button>
                  )}
                </div>
              </Card>
            ))}
            {filteredReminders.length === 0 && (
              <p className="text-center text-zinc-500 py-8">No hay recordatorios en esta categoría.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
