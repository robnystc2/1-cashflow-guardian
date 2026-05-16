import { createClient } from '@/lib/supabase/server'
import ReportsDashboard from '@/components/reports/reports-dashboard'

export default async function ReportsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Informes de Imperio</h1>
      <ReportsDashboard userId={user?.id || ''} />
    </div>
  )
}
