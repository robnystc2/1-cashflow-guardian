const fs = require('fs');
const path = require('path');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

console.log('🔥 Aplicando últimos ajustes de UX y diseño...\n');

// ====== 1. TOGGLE ANUAL POR DEFECTO ======
if (page.includes("useState<'monthly' | 'annual'>('monthly')")) {
  page = page.replace("useState<'monthly' | 'annual'>('monthly')", "useState<'monthly' | 'annual'>('annual')");
  console.log('✅ Toggle Anual por defecto activado');
  changes++;
} else {
  console.log('ℹ️  Toggle ya está en Anual');
}

// ====== 2. BADGE PAGE COMPLETA (punto 77 de la auditoría) ======
const badgeDir = 'src/app/badge';
if (!fs.existsSync(badgeDir)) fs.mkdirSync(badgeDir, { recursive: true });
const badgeContent = `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Badge CFG — Muestra que proteges tus proyectos',
  description: 'Añade el badge de CFG a tu web, propuestas y emails para mostrar a tus clientes que trabajas con protección anti-impago.',
}

const variants = [
  { label: 'Modo oscuro (web)', bg: 'bg-[#0a0a0a]', text: 'text-emerald-400', code: '<a href="https://cashflowguardian.com" target="_blank"><img src="https://cashflowguardian.com/badge-cfg-dark.svg" alt="Proyectos blindados con CFG" style="height:40px" /></a>' },
  { label: 'Modo claro (web)', bg: 'bg-white', text: 'text-emerald-600', code: '<a href="https://cashflowguardian.com" target="_blank"><img src="https://cashflowguardian.com/badge-cfg-light.svg" alt="Proyectos blindados con CFG" style="height:40px" /></a>' },
  { label: 'Firma de email', bg: 'bg-zinc-900', text: 'text-emerald-400', code: '<a href="https://cashflowguardian.com" target="_blank"><img src="https://cashflowguardian.com/badge-cfg-email.png" alt="CFG" style="height:20px" /></a>' },
  { label: 'Propuesta PDF', bg: 'bg-zinc-900', text: 'text-emerald-400', code: '<a href="https://cashflowguardian.com" target="_blank"><img src="https://cashflowguardian.com/badge-cfg-pdf.png" alt="Proyecto protegido con CFG" /></a>' },
];

const platforms = ['Notion', 'Google Docs', 'LinkedIn', 'Bento', 'Malt', 'Domestika', 'WordPress', 'Webflow'];

export default function BadgePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Badge CFG</h1>
        <p className="text-zinc-300 text-lg mb-10">Añade el badge a tu web, propuestas y emails para mostrar a tus clientes que tus proyectos están protegidos.</p>
        
        <h2 className="text-2xl font-bold mb-6">Variantes disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {variants.map((v, i) => (
            <div key={i} className={\`\${v.bg} border border-zinc-700 rounded-2xl p-6\`}>
              <h3 className="font-bold mb-3 \${v.text}">{v.label}</h3>
              <div className="bg-zinc-800 rounded-lg p-4 flex items-center justify-center mb-4">
                <span className={\`\${v.text} text-sm font-semibold\`}>🛡️ Proyecto protegido con CFG</span>
              </div>
              <p className="text-xs text-zinc-400 mb-2">Código:</p>
              <pre className="bg-black/50 text-xs text-zinc-300 p-3 rounded-lg overflow-x-auto">{v.code}</pre>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Compatible con</h2>
        <div className="flex flex-wrap gap-3">
          {platforms.map(p => (
            <span key={p} className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-full text-sm text-zinc-400">{p}</span>
          ))}
        </div>
      </div>
    </main>
  )
}
`;
fs.writeFileSync(path.join(badgeDir, 'page.tsx'), badgeContent);
console.log('✅ Página /badge completa con variantes y plataformas');
changes++;

// ====== 3. HERRAMIENTAS PAGE MEJORADA (añadir descripciones) ======
const herramientasDir = 'src/app/herramientas';
if (fs.existsSync(herramientasDir)) {
  const herramientasContent = `import type { Metadata } from 'next'
import Link from 'next/link'

const tools = [
  { icon: '🧮', title: 'Calculadora de riesgo de impago', desc: 'Calcula exactamente cuánto pierdes al año por clientes morosos.', href: '/calculadora-riesgo-impago' },
  { icon: '📄', title: 'Generador de contratos', desc: 'Crea un contrato anti-impago con hitos en 2 minutos.', href: '/generador-contratos' },
  { icon: '📨', title: 'Modelo carta reclamación', desc: 'Plantilla descargable lista para enviar a clientes morosos.', href: '/blog/modelo-carta-reclamacion-espana' },
  { icon: '💶', title: 'Calculadora de tarifa freelance', desc: 'Descubre cuánto deberías cobrar por hora según tu riesgo.', href: '/calculadora-irpf' },
  { icon: '🔍', title: 'Verificar cliente', desc: 'Comprueba el historial de pago antes de aceptar un proyecto.', href: '/check-cliente' },
];

export const metadata: Metadata = {
  title: 'Herramientas gratuitas para freelancers — Calculadoras, plantillas y más | CFG',
  description: 'Calculadora de impago, generador de contratos, carta de reclamación descargable y más herramientas gratuitas.',
}

export default function HerramientasPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Herramientas gratuitas</h1>
        <p className="text-zinc-300 text-lg mb-10">Todo lo que necesitas para blindar tu negocio freelance.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((t, i) => (
            <Link key={i} href={t.href} className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:border-emerald-500 transition-all group">
              <span className="text-3xl">{t.icon}</span>
              <h2 className="text-xl font-bold mt-2 mb-2 group-hover:text-emerald-400">{t.title}</h2>
              <p className="text-sm text-zinc-400">{t.desc}</p>
              <span className="text-xs text-emerald-400 mt-2 inline-block">Usar gratis →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
`;
  fs.writeFileSync(path.join(herramientasDir, 'page.tsx'), herramientasContent);
  console.log('✅ Página /herramientas mejorada con descripciones');
  changes++;
}

fs.writeFileSync('src/app/page.tsx', page);
console.log('\n🎉 ' + changes + ' ajustes UX aplicados.');
