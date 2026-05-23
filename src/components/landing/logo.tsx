import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
        CFG
      </div>
    </Link>
  )
}
