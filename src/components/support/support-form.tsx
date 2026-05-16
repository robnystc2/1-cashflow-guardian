'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle } from 'lucide-react'

export default function SupportForm({ userId }: { userId: string }) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('support_tickets').insert({ user_id: userId, subject, message })
    if (error) alert(error.message)
    else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) return (
    <div className="text-center py-8">
      <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Mensaje enviado</h3>
      <p className="text-zinc-400">Te responderemos en menos de 4 horas.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div>
        <Label htmlFor="subject">Asunto</Label>
        <Input id="subject" value={subject} onChange={e => setSubject(e.target.value)} className="bg-zinc-950 border-zinc-700" required />
      </div>
      <div>
        <Label htmlFor="message">Mensaje</Label>
        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} className="bg-zinc-950 border-zinc-700 rounded-md w-full p-2 text-white" rows={5} required />
      </div>
      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500" disabled={loading}>
        {loading ? <Loader2 className="animate-spin mr-2" /> : null} Enviar
      </Button>
    </form>
  )
}
