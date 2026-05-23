import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1 group">
      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-extrabold text-sm shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
        CFG
      </div>
      <span className="text-lg font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hidden sm:block">CFG</span>
      <span className="text-[10px] text-zinc-500 hidden sm:block ml-1">— Cobra Fácil, Garantizado.</span>
    </Link>
  )
}
