'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import SelectClient from '@/components/clients/select-client'

export default function CreateInvoiceForm({ onCreated }: { onCreated: () => void }) {
  const searchParams = useSearchParams()
  const preselectedClientId = searchParams.get('client') || null
  const preselectedAmount = searchParams.get('amount') || ''

  const [selectedClientId, setSelectedClientId] = useState<string | null>(preselectedClientId)
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [amount, setAmount] = useState(preselectedAmount)
  const [notes, setNotes] = useState('')
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !selectedClientId) {
      alert('Selecciona un cliente')
      setLoading(false)
      return
    }

    const { data: invoice, error } = await supabase.from('invoices').insert({
      user_id: user.id,
      client_id: selectedClientId,
      invoice_number: 'INV-' + Date.now(),
      subtotal: parseFloat(amount),
      notes,
      due_date: dueDate,
    }).select('id').single()

    if (error) {
      console.error(error)
      alert('Error al crear factura: ' + error.message)
      setLoading(false)
      return
    }

    // Insertar recordatorios automáticos
    const reminders = [
      { type: 'friendly', days: 3 },
      { type: 'firm', days: 7 },
      { type: 'final', days: 14 },
    ]
    
    let reminderErrors = false
    for (const r of reminders) {
      const d = new Date(dueDate)
      d.setDate(d.getDate() + r.days)
      
      const { error: remError } = await supabase.from('payment_reminders').insert({
        invoice_id: invoice.id,
        type: r.type,
        scheduled_date: d.toISOString(),
      })
      
      if (remError) {
        reminderErrors = true
        console.error('Error al crear recordatorio:', remError)
        // Registrar en tabla de debug
        await supabase.from('reminder_debug_logs').insert({
          invoice_id: invoice.id,
          error_message: remError.message
        })
      }
    }

    if (reminderErrors) {
      alert('Factura creada, pero algunos recordatorios fallaron. Por favor, contacta con soporte.')
    } else {
      alert('Factura creada y recordatorios programados.')
    }
    
    onCreated()
    setLoading(false)
  }

  return (
    <form onSubmit={handleCreate} className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
      <div>
        <Label>Cliente</Label>
        <SelectClient
          defaultClientId={preselectedClientId}
          onClientSelected={(c) => {
            if (c) { setSelectedClientId(c.id); setClientName(c.name); setClientEmail(c.email) }
            else { setSelectedClientId(null); setClientName(''); setClientEmail('') }
          }}
        />
        {clientName && <p className="text-xs text-zinc-400 mt-1">{clientName} ({clientEmail})</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Importe (€)</Label>
          <Input id="amount" type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" required />
        </div>
        <div>
          <Label htmlFor="dueDate">Fecha de vencimiento</Label>
          <Input id="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1 text-white" />
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Descripción / Notas</Label>
        <Input id="notes" value={notes} onChange={e => setNotes(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" placeholder="Ej: Diseño web fase 1" />
      </div>
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500" disabled={loading || !selectedClientId}>
        {loading ? <Loader2 className="animate-spin mr-2" /> : null}
        Crear factura y programar recordatorios
      </Button>
    </form>
  )
}
