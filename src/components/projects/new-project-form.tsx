'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Plus, Trash2 } from 'lucide-react'

interface Template {
  name: string
  milestones: string[]
  amounts: number[]
}

export default function NewProjectForm({ template }: { template?: Template }) {
  const [name, setName] = useState(template?.name || '')
  const [clientId, setClientId] = useState('')
  const [budget, setBudget] = useState(template ? template.amounts.reduce((a, b) => a + b, 0).toString() : '')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [milestones, setMilestones] = useState<{ name: string; amount: string }[]>(
    template ? template.milestones.map((m, i) => ({ name: m, amount: template.amounts[i].toString() })) : []
  )
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.from('clients').select('id, name').then(({ data }) => setClients(data || []))
  }, [])

  const addMilestone = () => setMilestones([...milestones, { name: '', amount: '' }])
  const removeMilestone = (index: number) => setMilestones(milestones.filter((_, i) => i !== index))
  const updateMilestone = (index: number, field: string, value: string) => {
    const updated = [...milestones]
    updated[index] = { ...updated[index], [field]: value }
    setMilestones(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: project, error: projectError } = await supabase.from('projects').insert({
      name,
      client_id: clientId || null,
      budget: budget ? parseFloat(budget) : null,
      description,
      status: 'proposal',
      start_date: new Date().toISOString().split('T')[0],
      user_id: user.id,
    }).select('id').single()

    if (projectError) {
      alert(projectError.message)
      setLoading(false)
      return
    }

    if (milestones.length > 0) {
      const milestoneData = milestones.map((m, index) => ({
        project_id: project.id,
        name: m.name,
        amount: parseFloat(m.amount) || 0,
        status: 'pending',
        is_locked: index > 0,
      }))
      await supabase.from('milestones').insert(milestoneData)
    }

    router.push(`/projects/${project.id}`)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div>
        <Label htmlFor="name">Nombre del proyecto</Label>
        <Input id="name" value={name} onChange={e => setName(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" required />
      </div>
      <div>
        <Label htmlFor="client">Cliente</Label>
        <Select onValueChange={setClientId} value={clientId}>
          <SelectTrigger className="bg-zinc-950 border-zinc-700 mt-1">
            <SelectValue placeholder="Seleccionar cliente" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="budget">Presupuesto total (€)</Label>
        <Input id="budget" type="number" step="0.01" value={budget} onChange={e => setBudget(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" />
      </div>
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Input id="description" value={description} onChange={e => setDescription(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" />
      </div>

      {/* Hitos */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Hitos del proyecto</Label>
          <Button type="button" variant="ghost" size="sm" onClick={addMilestone} className="text-emerald-400 hover:text-emerald-300">
            <Plus className="w-4 h-4 mr-1" /> Añadir hito
          </Button>
        </div>
        {milestones.map((m, index) => (
          <div key={index} className="flex gap-2 items-center bg-zinc-950 p-3 rounded-lg border border-zinc-800">
            <div className="flex-1">
              <Input
                value={m.name}
                onChange={e => updateMilestone(index, 'name', e.target.value)}
                placeholder={`Hito ${index + 1}`}
                className="bg-transparent border-none p-0 h-auto text-sm"
                required
              />
            </div>
            <div className="w-24">
              <Input
                type="number"
                step="0.01"
                value={m.amount}
                onChange={e => updateMilestone(index, 'amount', e.target.value)}
                placeholder="€"
                className="bg-transparent border-none p-0 h-auto text-sm text-right"
                required
              />
            </div>
            <button type="button" onClick={() => removeMilestone(index)} className="text-zinc-600 hover:text-red-400 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {milestones.length === 0 && (
          <p className="text-xs text-zinc-500">Añade hitos para blindar tu proyecto. El primer hito estará desbloqueado y el resto aparecerán con candado.</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500" disabled={loading}>
        {loading ? <Loader2 className="animate-spin mr-2" /> : null}
        Crear y blindar proyecto
      </Button>
    </form>
  )
}
