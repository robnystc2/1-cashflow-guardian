import { createClient } from '@/lib/supabase/server'
import InvoicesTable from '@/components/invoices/invoices-table'

export default async function InvoicesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Facturas</h1>
      <InvoicesTable userId={user?.id || ''} />
    </div>
  )
}
