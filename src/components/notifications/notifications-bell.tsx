'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Bell } from 'lucide-react'

export default function NotificationsBell() {
  const [unread, setUnread] = useState(0)
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    fetchNotifications()
    // Suscripción en tiempo real para nuevas notificaciones
    const channel = supabase.channel('notifications')
    channel.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, () => {
      fetchNotifications()
    }).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const fetchNotifications = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5)
    setNotifications(data || [])
    setUnread(data?.filter(n => !n.read).length || 0)
  }

  const markAsRead = async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id)
    fetchNotifications()
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 hover:bg-zinc-800 rounded-lg transition-colors">
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-80 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-3 border-b border-zinc-800 font-semibold">Notificaciones</div>
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-zinc-500">No tienes notificaciones.</p>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`p-3 border-b border-zinc-800 text-sm hover:bg-zinc-800/50 cursor-pointer ${!n.read ? 'bg-zinc-800/30' : ''}`} onClick={() => markAsRead(n.id)}>
                <p className="text-zinc-300">{n.message}</p>
                <p className="text-xs text-zinc-500 mt-1">{new Date(n.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
