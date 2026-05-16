'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, Loader2 } from 'lucide-react'

const STEPS = ['Cliente', 'Proyecto', 'Hitos', 'Victoria']

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [projectName, setProjectName] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleFinish = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Crear cliente
    const { data: client } = await supabase.from('clients').insert({ name: clientName, email: clientEmail, user_id: user.id }).select('id').single()
    if (!client) return

    // Crear proyecto
    const { data: project } = await supabase.from('projects').insert({ name: projectName, client_id: client.id, status: 'active', user_id: user.id }).select('id').single()
    if (!project) return

    // Crear hitos
    await supabase.from('milestones').insert([
      { project_id: project.id, name: 'Fase 1', amount: 500, status: 'pending', is_locked: false },
      { project_id: project.id, name: 'Fase 2', amount: 500, status: 'pending', is_locked: true },
    ])

    setDone(true)
    setLoading(false)
  }

  if (done) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-4xl font-bold mb-2">¡Tu primer proyecto está blindado!</h1>
      <p className="text-zinc-400 mb-6">Envía la factura y el sistema se encargará del resto.</p>
      <Button onClick={() => router.push('/overview')} className="bg-emerald-600 hover:bg-emerald-500">
        Ir al panel
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="flex justify-between items-center mb-4">
          {STEPS.map((s, i) => (
            <div key={s} className={`flex items-center gap-1 text-sm ${i <= step ? 'text-emerald-400' : 'text-zinc-600'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < step ? 'bg-emerald-500 text-black' : i === step ? 'border-2 border-emerald-400' : 'border-2 border-zinc-700'}`}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className="hidden md:inline">{s}</span>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Añade tu primer cliente</h2>
            <div>
              <Label htmlFor="clientName">Nombre</Label>
              <Input id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" />
            </div>
            <div>
              <Label htmlFor="clientEmail">Correo electrónico</Label>
              <Input id="clientEmail" type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" />
            </div>
            <Button onClick={() => setStep(1)} disabled={!clientName || !clientEmail} className="w-full bg-emerald-600 hover:bg-emerald-500">Siguiente</Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Crea tu primer proyecto</h2>
            <div>
              <Label htmlFor="projectName">Nombre del proyecto</Label>
              <Input id="projectName" value={projectName} onChange={e => setProjectName(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setStep(0)}>Atrás</Button>
              <Button onClick={() => setStep(2)} disabled={!projectName} className="flex-1 bg-emerald-600 hover:bg-emerald-500">Siguiente</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Blinda con hitos</h2>
            <p className="text-zinc-400">Crearemos 2 hitos de 500 € cada uno. El segundo estará bloqueado hasta que el cliente pague el primero.</p>
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2"><CheckCircle className="text-emerald-400 w-4 h-4" /> Fase 1 - 500 € (entregable)</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-red-400" /> Fase 2 - 500 € (bloqueado)</div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setStep(1)}>Atrás</Button>
              <Button onClick={handleFinish} disabled={loading} className="flex-1 bg-emerald-600 hover:bg-emerald-500">
                {loading ? <Loader2 className="animate-spin mr-2" /> : null} Blindar proyecto
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
