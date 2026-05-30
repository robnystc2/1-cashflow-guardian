const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// ======== COPY FINAL ========
// 156. Cambiar "Cobra Fácil, Garantizado" bajo el logo
code = code.replace(/Cobra Fácil, Garantizado/g, 'Cobras. Garantizado.');

// 157. Cambiar copy de integraciones
code = code.replace(/CFG se integra con tu stack actual\. Sin fricción\./g, 'Funciona con lo que ya usas. Sin aprender nada nuevo.');

// 161. Añadir "40x ROI en media" bajo el CTA del hero
code = code.replace(
  /(<Link href="\/register" className="inline-flex items-center gap-2 font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg active:scale-95 cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500\/20 cta-pulse">\s*\{`Blindar mi primer proyecto de \$\{heroProfession\} gratis →`\}\s*<\/Link>)/,
  `$1\n            <p className="text-xs text-emerald-400 mt-2 font-medium">40x ROI en media para nuestros usuarios</p>`
);

// 163. Añadir valor de la garantía junto a "3 meses gratis"
code = code.replace(
  /3 meses gratis si no cobras/g,
  '3 meses gratis si no cobras (garantía valorada en 87€)'
);

// ======== PÁGINA FREELANCERS RECOMENDADOS (151) ========
const dirRec = 'src/app/freelancers-recomendados';
if (!fs.existsSync(dirRec)) fs.mkdirSync(dirRec, { recursive: true });
fs.writeFileSync(`${dirRec}/page.tsx`, `import Link from 'next/link'
export default function FreelancersRecomendados() {
  const freelancers = [
    { nombre: 'Carlos Ruiz', profesion: 'Diseñador', pais: 'España', score: 98 },
    { nombre: 'Ana López', profesion: 'Consultora', pais: 'México', score: 95 },
    { nombre: 'Lucía Fernández', profesion: 'Traductora', pais: 'Chile', score: 90 },
  ];
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Freelancers Recomendados por CFG</h1>
        <p className="text-zinc-300 mb-8">Clientes verificados con alta tasa de cobro y profesionalidad demostrada.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {freelancers.map((f, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
              <h3 className="font-bold">{f.nombre}</h3>
              <p className="text-sm text-zinc-400">{f.profesion} · {f.pais}</p>
              <p className="text-xs text-emerald-400 mt-2">Score CFG: {f.score}%</p>
            </div>
          ))}
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full mt-8">Unirme como freelancer verificado →</Link>
      </div>
    </div>
  )
}`);

// ======== PÁGINA ESTADO DEL SECTOR (150) ========
const dirEstado = 'src/app/estado-sector-freelance';
if (!fs.existsSync(dirEstado)) fs.mkdirSync(dirEstado, { recursive: true });
fs.writeFileSync(`${dirEstado}/page.tsx`, `export default function EstadoSector() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Estado del sector freelance</h1>
        <p className="text-zinc-300 mb-8">Datos anonimizados de la red CFG. Actualizado trimestralmente.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">Tasa media de impago por país</h3>
            <p className="text-sm text-zinc-400">España: 12% · México: 18% · Argentina: 22% · Colombia: 15%</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">Tiempo medio de cobro</h3>
            <p className="text-sm text-zinc-400">Con CFG: 6 días. Sin CFG: 52 días (media del sector).</p>
          </div>
        </div>
      </div>
    </div>
  )
}`);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Lote 8: cierre final con copy, freelancers recomendados y estado del sector.');
