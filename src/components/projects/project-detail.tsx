'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Plus, Lock, CheckCircle, Upload, DollarSign, FileText, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function ProjectDetail({ projectId }: { projectId: string }) {
  const [milestones, setMilestones] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const supabase = createClient()

  useEffect(() => { fetchMilestones() }, [])

  const fetchMilestones = async () => {
    const { data } = await supabase
      .from('milestones')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true })
    setMilestones(data || [])
  }

  const totalPaid = milestones.filter(m => m.status === 'paid').reduce((sum, m) => sum + Number(m.amount), 0)
  const totalAmount = milestones.reduce((sum, m) => sum + Number(m.amount), 0)
  const progress = totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0
  const paidCount = milestones.filter(m => m.status === 'paid').length
  const totalCount = milestones.length

  const addMilestone = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('milestones').insert({
      project_id: projectId,
      name: newName,
      amount: parseFloat(newAmount),
      status: 'pending',
      is_locked: milestones.length > 0,
    })
    if (error) alert(error.message)
    else {
      setNewName('')
      setNewAmount('')
      setShowForm(false)
      fetchMilestones()
    }
    setLoading(false)
  }

  const markDelivered = async (milestoneId: string) => {
    await supabase.from('milestones').update({ status: 'invoiced' }).eq('id', milestoneId)
    fetchMilestones()
  }

  const markPaid = async (milestoneId: string) => {
    const { data: all } = await supabase.from('milestones').select('*').eq('project_id', projectId).order('created_at', { ascending: true })
    if (!all) return
    await supabase.from('milestones').update({ status: 'paid', is_locked: false, unlocked_at: new Date().toISOString() }).eq('id', milestoneId)
    const currentIndex = all.findIndex(m => m.id === milestoneId)
    if (currentIndex < all.length - 1) {
      const next = all[currentIndex + 1]
      await supabase.from('milestones').update({ is_locked: false }).eq('id', next.id)
    }
    // Activar animación de victoria
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
    fetchMilestones()
  }

  return (
    <div className="space-y-6 relative">
      {/* Animación de confeti al pagar */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="text-4xl animate-bounce text-emerald-400">
            <Sparkles className="w-12 h-12" />
          </div>
        </div>
      )}

      {/* Resumen de Blindaje */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <p className="text-xs text-zinc-500">Asegurado</p>
          <p className="text-2xl font-bold text-emerald-400">€{totalPaid.toFixed(2)}</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <p className="text-xs text-zinc-500">Pendiente</p>
          <p className="text-2xl font-bold text-amber-400">€{(totalAmount - totalPaid).toFixed(2)}</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <p className="text-xs text-zinc-500">Hitos completados</p>
          <p className="text-2xl font-bold">{paidCount}/{totalCount}</p>
        </Card>
      </div>

      {/* Barra de Progreso */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-400">Progreso del proyecto</span>
          <span className="text-emerald-400 font-semibold">{progress.toFixed(0)}% completado</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-3">
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Lista de Hitos */}
      <div className="space-y-3">
        {milestones.map((milestone, index) => (
          <Card 
            key={milestone.id} 
            className={`bg-zinc-900 border p-4 transition-all duration-300 ${
              milestone.is_locked 
                ? 'border-red-900/50 opacity-60 blur-[1px]' 
                : milestone.status === 'paid' 
                  ? 'border-emerald-900/50' 
                  : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {milestone.is_locked ? (
                  <Lock className="w-5 h-5 text-red-400" />
                ) : milestone.status === 'paid' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : milestone.status === 'invoiced' ? (
                  <Upload className="w-5 h-5 text-cyan-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />
                )}
                <div>
                  <h3 className="font-semibold">{milestone.name}</h3>
                  <p className="text-sm text-zinc-400">
                    €{milestone.amount} · 
                    <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                      milestone.status === 'pending' ? 'bg-zinc-800 text-zinc-300' :
                      milestone.status === 'invoiced' ? 'bg-cyan-900/50 text-cyan-400' :
                      'bg-emerald-900/50 text-emerald-400'
                    }`}>
                      {milestone.status === 'pending' ? 'Pendiente' : 
                       milestone.status === 'invoiced' ? 'Entregado' : 'Pagado'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {!milestone.is_locked && milestone.status === 'pending' && (
                  <Button size="sm" variant="outline" className="border-zinc-700 text-cyan-400 hover:text-cyan-300" onClick={() => markDelivered(milestone.id)}>
                    <Upload className="w-3 h-3 mr-1" /> Entregar
                  </Button>
                )}
                {milestone.status === 'invoiced' && (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500" onClick={() => markPaid(milestone.id)}>
                      <DollarSign className="w-3 h-3 mr-1" /> Registrar Pago
                    </Button>
                    <Link href={`/invoices?create=true&milestone=${milestone.id}&amount=${milestone.amount}`}>
                      <Button size="sm" variant="outline" className="border-zinc-700">
                        <FileText className="w-3 h-3 mr-1" /> Facturar
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Añadir Hito */}
      {!showForm && (
        <Button variant="outline" className="border-zinc-700 w-full" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" /> Añadir Hito de Valor
        </Button>
      )}
      {showForm && (
        <form onSubmit={addMilestone} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">
          <div>
            <Label htmlFor="milestoneName">Nombre del hito</Label>
            <Input id="milestoneName" value={newName} onChange={e => setNewName(e.target.value)} className="bg-zinc-950 border-zinc-700" placeholder="Ej: Diseño de wireframes" required />
          </div>
          <div>
            <Label htmlFor="milestoneAmount">Importe (€)</Label>
            <Input id="milestoneAmount" type="number" step="0.01" value={newAmount} onChange={e => setNewAmount(e.target.value)} className="bg-zinc-950 border-zinc-700" placeholder="500" required />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500" disabled={loading}>Guardar hito</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </form>
      )}
    </div>
  )
}
