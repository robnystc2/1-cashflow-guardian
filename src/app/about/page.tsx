export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Nuestra <span className="text-emerald-400">historia</span></h1>
        <p className="text-zinc-400 leading-relaxed">
          CFG nació en Tenerife, construido por un freelancer de 16 años que estaba harto de perder dinero por impagos. 
          Sin inversores, sin equipo, solo con una visión: que ningún freelancer tenga que perseguir un pago nunca más.
        </p>
        <p className="text-zinc-500 mt-4 text-sm">
          Esto es solo el principio. Bienvenido al blindaje.
        </p>
      </div>
    </div>
  )
}
