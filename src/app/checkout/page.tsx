'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, ShieldCheck } from 'lucide-react'

const PLANS: any = {
  basic: { name: 'Básico', price: '29€', features: ['5 proyectos', 'Hitos y facturas', 'Recordatorios'] },
  pro: { name: 'Pro', price: '79€', features: ['Proyectos ilimitados', 'CFO Cassandra', 'PayScore', 'LexGuard'] },
  total: { name: 'Total', price: '197€', features: ['Todo lo de Pro', 'Gestión delegada', 'Asistente personal'] },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'pro'
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const planData = PLANS[plan] || PLANS.pro

  const handleCheckout = async () => {
    setLoading(true)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Error al crear la sesión de pago')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2">Plan {planData.name}</h1>
        <p className="text-zinc-400 mb-6">{planData.price}/mes</p>
        <Card className="bg-zinc-900 border-zinc-800 p-6 mb-6 text-left">
          <ul className="space-y-2 text-zinc-400">
            {planData.features.map((f: string) => (
              <li key={f} className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> {f}</li>
            ))}
          </ul>
        </Card>
        <Button onClick={handleCheckout} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-lg py-6">
          {loading ? <Loader2 className="animate-spin mr-2" /> : null}
          Pagar con tarjeta
        </Button>
        <p className="text-xs text-zinc-500 mt-4">Pago seguro con Stripe. Cancela cuando quieras.</p>
      </div>
    </div>
  )
}
