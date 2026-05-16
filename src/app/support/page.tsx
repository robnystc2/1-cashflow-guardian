import { createClient } from '@/lib/supabase/server'
import SupportForm from '@/components/support/support-form'

export default async function SupportPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Soporte</h1>
      <p className="text-zinc-400 mb-4">
        Si no respondemos en menos de <strong className="text-white">4 horas</strong>, te regalamos <strong className="text-emerald-400">1 mes gratis</strong>.
      </p>
      <SupportForm userId={user?.id || ''} />
    </div>
  )
}
