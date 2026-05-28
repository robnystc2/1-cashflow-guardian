const fs = require('fs');
const path = require('path');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

function safeReplace(orig, repl, desc) {
  if (page.includes(orig)) {
    page = page.replaceAll(orig, repl);
    console.log('✅ ' + desc);
    changes++;
  } else {
    console.log('⏭️  ' + desc + ' (no encontrado)');
  }
}

console.log('🔥 Aplicando cambios seguros...\n');

// 1. CAMBIAR TEXTO DE LA SECCIÓN "CON/SIN CFG" - añadir más items
const nuncaMasOld = "['Trabajar gratis', 'Perseguir facturas', 'Esperar meses para cobrar', 'Pagar a un abogado', 'Perder clientes por pedir pago', 'Pedir el dinero con vergüenza']";
const nuncaMasNew = "['Trabajar gratis', 'Perseguir facturas', 'Esperar meses para cobrar', 'Pagar a un abogado', 'Perder clientes por pedir pago', 'Pedir el dinero con vergüenza', 'Aceptar clientes sin verificar', 'No poder subir precios por miedo', 'Revisar el banco cada mañana con ansiedad']";
safeReplace(nuncaMasOld, nuncaMasNew, 'Sección Nunca Más ampliada');

// 2. AÑADIR TEXTO DE ROI EN PRECIOS (si no se añadió)
const roiText = '💡 Un solo impago recuperado paga 7 años de CFG Pro. Matemática obvia.';
if (!page.includes(roiText)) {
  page = page.replace(
    'Todos los planes incluyen la Garantía Blindaje Total.',
    'Todos los planes incluyen la Garantía Blindaje Total.\n          <p className="text-sm text-zinc-400 max-w-2xl mx-auto mb-4">' + roiText + '</p>'
  );
  console.log('✅ ROI en precios añadido');
  changes++;
}

// 3. ELIMINAR "EMPRESA VERIFICADA" SI APARECE
safeReplace('Empresa verificada', '', 'Empresa verificada footer');

// 4. MEJORAR TEXTO DEL CHATBOT
safeReplace('¿Alguna vez un cliente te dejó sin pagar?', 'Blindar mi próximo proyecto →', 'Texto chatbot');

// 5. CORREGIR ENLACE "Ver más testimonios"
safeReplace('🔍 Ver más testimonios →', '🔍 Ver todos los casos de éxito →', 'Link testimonios');

// 6. AÑADIR GARANTÍA EN TRUST STRIP DEL HERO
safeReplace(
  '✓ Cancela cuando quieras',
  '✓ Cancela cuando quieras · Garantía Blindaje Total incluida',
  'Garantía en hero'
);

// 7. AÑADIR ENLACE A CALCULADORA DESDE PRECIOS
if (!page.includes('calculadora">Calcula tu ROI')) {
  page = page.replace(
    'Todos los precios en euros (€). Sin costes ocultos. Sin permanencia. Sin sorpresas.',
    'Todos los precios en euros (€). Sin costes ocultos. Sin permanencia. Sin sorpresas.\n          <p className="text-xs text-zinc-400 mt-2">💡 <a href="#calculadora" className="text-emerald-400 hover:text-emerald-300">Calcula tu ROI personalizado →</a></p>'
  );
  console.log('✅ Enlace a calculadora desde precios');
  changes++;
}

// 8. ELIMINAR CUALQUIER "Probar 14 días gratis" SUELTO
safeReplace('Probar 14 días gratis →', 'Empezar gratis →', 'CTA genéricos');

fs.writeFileSync('src/app/page.tsx', page);

// 9. CREAR PÁGINA DE BLACKLIST SI NO EXISTE
const blacklistDir = 'src/app/blacklist';
if (!fs.existsSync(blacklistDir)) {
  fs.mkdirSync(blacklistDir, { recursive: true });
  fs.writeFileSync(path.join(blacklistDir, 'page.tsx'), `import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blacklist de clientes morosos — Comunidad CFG',
  description: 'Base de datos anonimizada de clientes con historial de impago, reportada por la comunidad de freelancers de CFG.',
}

export default function BlacklistPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Comunidad Blindada</h1>
        <p className="text-zinc-300 text-lg mb-8">Directorio anonimizado de clientes con historial de impago. Protege tu negocio antes de aceptar un proyecto.</p>
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 mb-8">
          <p className="text-zinc-400">🔒 Disponible solo para miembros registrados de CFG.</p>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
          Acceder a la comunidad →
        </Link>
      </div>
    </main>
  )
}
`);
  console.log('✅ Página /blacklist creada');
  changes++;
}

console.log('\n🎉 ' + changes + ' cambios aplicados.');
