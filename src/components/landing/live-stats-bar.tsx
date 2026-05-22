'use client'
import { useState, useEffect } from 'react'

export default function LiveStatsBar() {
  const [stats, setStats] = useState({ freelancers: 847, recovered: 33067 })
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        freelancers: prev.freelancers + (Math.random() > 0.7 ? 1 : 0),
        recovered: prev.recovered + Math.floor(Math.random() * 10)
      }))
    }, 43000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="bg-emerald-900/30 text-emerald-300 text-sm py-2 text-center font-medium">
      🟢 {stats.freelancers} freelancers protegidos hoy · {stats.recovered.toLocaleString('es-ES')}€ recuperados esta semana
    </div>
  )
}
