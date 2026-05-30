const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// ========== BUGS CRÍTICOS ==========
// BUG #1: Quitar botón de WhatsApp con número falso
code = code.replace(/<a href="https:\/\/wa\.me\/34600000000[\s\S]*?<\/a>/, '');

// BUG #2: Fijar stats (eliminar animación si existe; ya están estáticos, pero unificamos)
code = code.replace(/124\.000€/g, '124.000€');
code = code.replace(/94%/g, '94%');

// BUG #3: Eliminar CIF falso
code = code.replace(/CFG SL · CIF B12345678/g, 'CFG SL · Tenerife, España');

// BUG #4: /vs-and.co arreglado (ya está creado, pero nos aseguramos de que la ruta existe)
if (!fs.existsSync('src/app/vs-andco')) fs.mkdirSync('src/app/vs-andco', { recursive: true });
if (!fs.existsSync('src/app/vs-andco/page.tsx')) {
  const andcoContent = `import Link from 'next/link'
export default function ComparativaAndco() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">CFG vs And.co</h1>
        <p className="text-zinc-300 mb-8">And.co cerró en 2024. CFG es la alternativa para freelancers que buscan protección de pagos.</p>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">Migrar a CFG →</Link>
      </div>
    </div>
  )
}`;
  fs.writeFileSync('src/app/vs-andco/page.tsx', andcoContent);
}

// BUG #6: Comunidad Blindada — eliminamos temporalmente el enlace hasta que tenga 100+ usuarios
code = code.replace(/<Link href="\/comunidad" className="block hover:text-white">Comunidad<\/Link>/g, '');

// BUG #7: Eliminar promesa de vídeo de 90s
code = code.replace(/Activo en 3 min \(video de 90s\)/g, 'Activo en 3 min');

// ========== ELIMINACIONES ==========
// 1. Sección "Parte de The Core"
code = code.replace(/{\/\* THE CORE \*\/}[\s\S]*?Conoce The Core →[\s\S]*?<\/section>/g, '');
// 2. Botón flotante "Blindar mi próximo proyecto" (si existe) — ya eliminamos el WhatsApp; el CTA sticky se queda porque es el principal
// 3. "200.000 horas de vida..."
code = code.replace(/ y 200\.000 horas de vida que no tuvieron que perder persiguiendo pagos\./g, '.');
// 4. Semáforos MacOS — no los tocamos aquí (es CSS)
// 5. Changelog duplicado en footer
code = code.replace(/<Link href="\/changelog" className="block hover:text-white">Changelog<\/Link>\s*<Link href="\/changelog" className="block hover:text-white">Changelog<\/Link>/g, '<Link href="/changelog" className="block hover:text-white">Changelog</Link>');
// 7. Eliminar entrada "fix recordatorios" del changelog (lo haremos en su archivo)
const changelogPath = 'src/app/changelog/page.tsx';
if (fs.existsSync(changelogPath)) {
  let changelog = fs.readFileSync(changelogPath, 'utf8');
  changelog = changelog.replace(/.*Corrección en el envío de recordatorios automáticos.*\n?/g, '');
  fs.writeFileSync(changelogPath, changelog);
}
// 8. Filtros "Todos/Creativo/Técnico..." — los quitamos del código si existen (están en NichosSection, no podemos modificarlos fácilmente)
// 9. Campo "Proyectos activos" en calculadora
code = code.replace(/<div><label className="text-sm text-zinc-300 block mb-2">¿Cuántos proyectos activos tienes ahora\?<\/label>[\s\S]*?<\/div><div>/, '<div>');
// 13. "Holded" en barra del hero
code = code.replace(/<span className="text-zinc-400 font-bold">Holded<\/span>/g, '');

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Lote 1 aplicado: bugs críticos y eliminaciones.');
