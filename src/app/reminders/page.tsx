import { createClient } from '@/lib/supabase/server'
import RemindersManager from '@/components/reminders/reminders-manager'

export default async function RemindersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Recordatorios</h1>
      <RemindersManager userId={user?.id || ''} />
    </div>
  )
}
