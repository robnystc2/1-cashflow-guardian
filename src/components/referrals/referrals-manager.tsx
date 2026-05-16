'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Copy, Check, Gift, Users, Calendar } from 'lucide-react'

export default function ReferralsManager({ userId }: { userId: string }) {
  const [referralCode, setReferralCode] = useState('')
  const [referrals, setReferrals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: profile } = await supabase.from('profiles').select('referral_code').eq('id', userId).single()
      if (profile) setReferralCode(profile.referral_code)
      const { data } = await supabase.from('referrals').select('*').eq('referrer_id', userId)
      setReferrals(data || [])
      setLoading(false)
    }
    if (userId) fetchData()
  }, [userId])

  const referralLink = `${window.location.origin}/register?ref=${referralCode}`
  const convertedCount = referrals.filter(r => r.converted).length
  const monthsEarned = convertedCount // 1 mes por referido convertido

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-semibold">Consigue meses gratis ilimitados</h2>
        </div>
        <p className="text-zinc-400 mb-4">
          Invita a otros freelancers y gana <strong className="text-white">1 mes gratis</strong> por cada uno que se registre y active su cuenta. Sin límites.
        </p>
        {monthsEarned > 0 && (
          <div className="flex items-center gap-2 mb-4 text-emerald-400 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Has ganado {monthsEarned} {monthsEarned === 1 ? 'mes gratis' : 'meses gratis'} hasta ahora.
          </div>
        )}
        <div className="flex gap-2">
          <Input value={referralLink} readOnly className="bg-zinc-950 border-zinc-700 flex-1" />
          <Button onClick={handleCopy} className="bg-emerald-600 hover:bg-emerald-500 shrink-0">
            {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? 'Copiado' : 'Copiar'}
          </Button>
        </div>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-semibold">Tus referidos ({convertedCount} convertidos)</h2>
        </div>
        {referrals.length === 0 ? (
          <p className="text-zinc-400">Aún no has invitado a nadie. ¡Comparte tu enlace!</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-2 text-zinc-400">Email</th>
                <th className="py-2 text-zinc-400">Estado</th>
                <th className="py-2 text-zinc-400">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map(ref => (
                <tr key={ref.id} className="border-b border-zinc-800/50">
                  <td className="py-2">{ref.referred_email}</td>
                  <td className="py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${ref.converted ? 'bg-emerald-900/50 text-emerald-400' : 'bg-zinc-700 text-zinc-300'}`}>
                      {ref.converted ? 'Convertido' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="py-2 text-zinc-500">{new Date(ref.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}
