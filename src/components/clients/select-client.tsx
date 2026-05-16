'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Client {
  id: string
  name: string
  email: string
}

export default function SelectClient({ 
  onClientSelected, 
  defaultClientId 
}: { 
  onClientSelected: (client: Client | null) => void
  defaultClientId?: string | null
}) {
  const [clients, setClients] = useState<Client[]>([])
  const [value, setValue] = useState(defaultClientId || '')
  const supabase = createClient()

  useEffect(() => {
    supabase.from('clients').select('id,name,email').then(({ data }) => {
      setClients(data || [])
      if (defaultClientId && data) {
        const client = data.find(c => c.id === defaultClientId)
        if (client) onClientSelected(client)
      }
    })
  }, [])

  return (
    <Select 
      value={value} 
      onValueChange={(val) => {
        setValue(val)
        const c = clients.find(x => x.id === val)
        onClientSelected(c || null)
      }}
    >
      <SelectTrigger className="bg-zinc-950 border-zinc-700 text-white">
        <SelectValue placeholder="Seleccionar cliente..." />
      </SelectTrigger>
      <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
        {clients.map(c => (
          <SelectItem key={c.id} value={c.id}>{c.name} ({c.email})</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
