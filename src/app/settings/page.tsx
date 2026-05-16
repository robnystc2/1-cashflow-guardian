'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Globe, Bell, Settings, CreditCard, CheckCircle, Loader2, Clock, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [jurisdiction, setJurisdiction] = useState('ES')
  const [currency, setCurrency] = useState('EUR')
  const [friendlyDays, setFriendlyDays] = useState('3')
  const [firmDays, setFirmDays] = useState('7')
  const [finalDays, setFinalDays] = useState('14')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [trialDaysLeft, setTrialDaysLeft] = useState(0)
  const [plan, setPlan] = useState('none')
  const supabase = createClient()

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (profile) {
          if (profile.jurisdiction) setJurisdiction(profile.jurisdiction)
          if (profile.currency) setCurrency(profile.currency)
          if (profile.trial_ends_at) {
            const diff = Math.ceil((new Date(profile.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
            setTrialDaysLeft(diff > 0 ? diff : 0)
          }
          setPlan(profile.plan || 'none')
        }
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    setLoading(true)
    setSaved(false)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        jurisdiction,
        currency,
        updated_at: new Date().toISOString(),
      })
    }
    localStorage.setItem('reminderConfig', JSON.stringify({ friendlyDays, firmDays, finalDays }))
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Ajustes</h1>
        <p className="text-zinc-400 mt-1">Configura tu centro de operaciones.</p>
      </div>

      {/* Estado de la prueba gratuita */}
      {plan === 'trial' && trialDaysLeft > 0 && (
        <Card className="bg-amber-900/10 border border-amber-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-sm font-medium text-amber-400">
                Te quedan {trialDaysLeft} día{trialDaysLeft > 1 ? 's' : ''} de prueba Pro
              </p>
              <p className="text-xs text-zinc-400">Después de esto, necesitarás hacer upgrade para seguir usando el plan Pro.</p>
            </div>
          </div>
          <Link href="/checkout?plan=pro">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500">Hacer upgrade</Button>
          </Link>
        </Card>
      )}

      {/* Jurisdicción y Moneda */}
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-semibold">Región y moneda</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="jurisdiction">Jurisdicción legal (LexGuard)</Label>
            <Select value={jurisdiction} onValueChange={setJurisdiction}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="ES">España</SelectItem>
                <SelectItem value="MX">México</SelectItem>
                <SelectItem value="US">Estados Unidos</SelectItem>
                <SelectItem value="OTHER">Otro (genérico)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currency">Moneda principal</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="bg-zinc-950 border-zinc-700 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="EUR">Euro (€)</SelectItem>
                <SelectItem value="USD">Dólar ($)</SelectItem>
                <SelectItem value="MXN">Peso mexicano (MX$)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Recordatorios */}
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-semibold">Recordatorios automáticos</h2>
        </div>
        <p className="text-sm text-zinc-500 mb-4">Define los días tras el vencimiento para cada tipo de aviso.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="friendlyDays">Amable (días)</Label>
            <Input id="friendlyDays" type="number" value={friendlyDays} onChange={e => setFriendlyDays(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" />
          </div>
          <div>
            <Label htmlFor="firmDays">Firme (días)</Label>
            <Input id="firmDays" type="number" value={firmDays} onChange={e => setFirmDays(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" />
          </div>
          <div>
            <Label htmlFor="finalDays">Final (días)</Label>
            <Input id="finalDays" type="number" value={finalDays} onChange={e => setFinalDays(e.target.value)} className="bg-zinc-950 border-zinc-700 mt-1" />
          </div>
        </div>
      </Card>

      {/* Cobro automático */}
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-semibold">Cobro automático (Stripe)</h2>
        </div>
        <p className="text-sm text-zinc-500 mb-4">Conecta tu cuenta de Stripe para aceptar pagos con tarjeta y automatizar el cobro de facturas.</p>
        <Button disabled className="bg-zinc-700 text-zinc-400 cursor-not-allowed">
          Conectar Stripe (próximamente)
        </Button>
        <p className="text-xs text-zinc-600 mt-2">Recibirás un aviso cuando esta función esté disponible.</p>
      </Card>

      {/* Botón de guardado */}
      <div className="flex items-center gap-4">
        <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-500" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Settings className="w-4 h-4 mr-2" />}
          Guardar cambios
        </Button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-emerald-400">
            <CheckCircle className="w-4 h-4" /> Configuración actualizada
          </span>
        )}
      </div>
    </div>
  )
}
