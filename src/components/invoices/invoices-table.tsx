'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Plus, Send, CheckCircle, FileText, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react'
import CreateInvoiceForm from '@/components/invoices/create-invoice-form'
import LegalActionButton from '@/components/lexguard/legal-action-button'
import { formatDistanceToNow, isPast, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'

type FilterType = 'all' | 'pending' | 'paid' | 'overdue'

export default function InvoicesTable({ userId }: { userId: string }) {
  const [invoices, setInvoices] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<FilterType>('all')
  const supabase = createClient()

  const fetchInvoices = async () => {
    const { data } = await supabase
      .from('invoices')
      .select('*, client:clients(name, email)')
      .order('created_at', { ascending: false })
    setInvoices(data || [])
  }

  useEffect(() => { if (userId) fetchInvoices() }, [userId])

  const handleMarkAsPaid = async (invoiceId: string) => {
    await supabase.from('invoices').update({ status: 'paid', paid_date: new Date().toISOString() }).eq('id', invoiceId)
    fetchInvoices()
  }

  const handleSendReminder = async (invoiceId: string) => {
    const { error } = await supabase.functions.invoke('send-payment-reminders', { body: { invoiceId } })
    if (error) {
      alert('La función de envío no está disponible. Los recordatorios automáticos se enviarán cuando se active.')
    } else {
      alert('Recordatorio enviado')
      fetchInvoices()
    }
  }

  const counts = {
    all: invoices.length,
    pending: invoices.filter(i => i.status === 'sent' || i.status === 'draft').length,
    paid: invoices.filter(i => i.status === 'paid').length,
    overdue: invoices.filter(i => i.status === 'overdue' || (i.due_date && isPast(parseISO(i.due_date)) && i.status !== 'paid')).length,
  }

  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'all') return true
    if (filter === 'paid') return inv.status === 'paid'
    if (filter === 'pending') return inv.status === 'sent' || inv.status === 'draft'
    if (filter === 'overdue') return inv.status === 'overdue' || (inv.due_date && isPast(parseISO(inv.due_date)) && inv.status !== 'paid')
    return true
  })

  const getRelativeDueDate = (dueDate: string | null) => {
    if (!dueDate) return '-'
    const date = parseISO(dueDate)
    if (isPast(date)) {
      // Corregido: añadimos "Vencida" y luego la distancia sin "hace" duplicado
      const distance = formatDistanceToNow(date, { locale: es }).replace('alrededor de ', '')
      return `Vencida hace ${distance}`
    }
    return `Vence ${formatDistanceToNow(date, { locale: es, addSuffix: true }).replace('alrededor de ', '')}`
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {(['all', 'pending', 'paid', 'overdue'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filter === f ? 'bg-white text-black font-medium' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : f === 'paid' ? 'Pagadas' : 'Vencidas'}
              <span className="ml-1 opacity-70">({counts[f]})</span>
            </button>
          ))}
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-500" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" /> {showForm ? 'Cerrar' : 'Nueva Factura'}
        </Button>
      </div>

      {showForm && (
        <div className="mb-6">
          <CreateInvoiceForm onCreated={() => { setShowForm(false); fetchInvoices() }} />
        </div>
      )}

      {filteredInvoices.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <div className="flex justify-center gap-3 mb-6">
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-center opacity-50">
              <FileText className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <div className="text-xs text-zinc-600">Sin facturas</div>
            </div>
            <ArrowRight className="text-zinc-600 self-center" />
            <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg p-3 text-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-xs text-emerald-400 font-medium">Blindaje activo</div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Cada factura es un paso hacia el blindaje total</h3>
          <p className="text-sm text-zinc-400 mb-4 max-w-md mx-auto">
            Crea tu primera factura, asígnale un cliente y activa los recordatorios automáticos. El sistema cobrará por ti.
          </p>
          <Button onClick={() => setShowForm(true)} className="bg-emerald-600 hover:bg-emerald-500">
            <Plus className="w-4 h-4 mr-2" /> Crear factura
          </Button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-3 px-4 text-zinc-400 text-sm">Número</th>
                <th className="py-3 px-4 text-zinc-400 text-sm">Cliente</th>
                <th className="py-3 px-4 text-zinc-400 text-sm">Importe</th>
                <th className="py-3 px-4 text-zinc-400 text-sm">Estado</th>
                <th className="py-3 px-4 text-zinc-400 text-sm">Vencimiento</th>
                <th className="py-3 px-4 text-zinc-400 text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono text-sm">{inv.invoice_number}</td>
                  <td className="py-3 px-4">
                    {inv.client?.name ? (
                      <Link href={`/clients/${inv.client_id}`} className="hover:text-emerald-400 transition-colors">
                        {inv.client.name}
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-400 text-xs">
                        <AlertTriangle className="w-3 h-3" /> Sin cliente
                      </span>
                    )}
                  </td>
                  <td className={`py-3 px-4 font-semibold ${
                    inv.status === 'paid' ? 'text-emerald-400' :
                    inv.status === 'overdue' || (inv.due_date && isPast(parseISO(inv.due_date)) && inv.status !== 'paid') ? 'text-red-400' :
                    'text-zinc-200'
                  }`}>
                    €{inv.subtotal?.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      inv.status === 'paid' ? 'bg-emerald-900/50 text-emerald-400' :
                      inv.status === 'overdue' ? 'bg-red-900/50 text-red-400' :
                      inv.status === 'sent' ? 'bg-blue-900/50 text-blue-400' :
                      'bg-zinc-700 text-zinc-300'
                    }`}>
                      {inv.status === 'draft' ? 'Borrador' :
                       inv.status === 'sent' ? 'Enviada' :
                       inv.status === 'paid' ? 'Pagada' :
                       inv.status === 'overdue' ? 'Vencida' : 'Cancelada'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-400">
                    {getRelativeDueDate(inv.due_date)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2 items-center">
                      {inv.status !== 'paid' && (
                        <>
                          <button
                            onClick={() => handleMarkAsPaid(inv.id)}
                            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                            title="Marcar como pagada"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSendReminder(inv.id)}
                            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                            title="Enviar recordatorio"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {(inv.status === 'overdue' || inv.status === 'sent') && (
                        <LegalActionButton invoiceId={inv.id} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
