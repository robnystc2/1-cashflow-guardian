import { createClient } from '@/lib/supabase/server'
import ReferralsManager from '@/components/referrals/referrals-manager'

export default async function ReferralsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Programa de Referidos</h1>
      <ReferralsManager userId={user?.id || ''} />
    </div>
  )
}
