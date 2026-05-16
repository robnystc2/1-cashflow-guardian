import { createClient } from '@/lib/supabase/server'
import ClientsManager from '@/components/clients/clients-manager'

export default async function ClientsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Clientes</h1>
      <ClientsManager userId={user?.id || ''} />
    </div>
  )
}
