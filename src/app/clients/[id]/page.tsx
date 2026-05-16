import { createClient } from '@/lib/supabase/server'
import ClientDetail from '@/components/clients/client-detail'

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (!client) return <div className="p-6 text-zinc-400">Cliente no encontrado</div>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{client.name}</h1>
      <ClientDetail clientId={client.id} />
    </div>
  )
}
