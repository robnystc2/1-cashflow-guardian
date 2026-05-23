'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookies_accepted')
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookies_accepted', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4 z-50 flex items-center justify-between text-sm text-zinc-300">
      <p>
        🍪 Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra{' '}
        <Link href="/cookies" className="text-emerald-400 underline">
          política de cookies
        </Link>
        .
      </p>
      <button
        onClick={accept}
        className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-full text-sm font-semibold ml-4"
      >
        Aceptar
      </button>
    </div>
  )
}
