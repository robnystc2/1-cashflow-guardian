const fs = require('fs');
const path = require('path');

const competitors = [
  { slug: 'bonsai', name: 'Bonsai', quote: 'Bonsai fue comprada por Zoom. Tus contratos y clientes ahora están en manos de una empresa de videoconferencias. CFG es independiente y construido en España.' },
  { slug: 'honeybook', name: 'HoneyBook', quote: 'HoneyBook fue diseñado para el mercado americano. Sus plantillas legales no sirven en España o Latinoamérica. CFG tiene Escudo Legal en 47 países.' },
  { slug: 'moxie', name: 'Moxie', quote: 'Moxie es caro y no protege tus cobros. Con CFG activas el Escudo Legal y en 48h tienes tu dinero.' },
  { slug: 'dubsado', name: 'Dubsado', quote: 'Dubsado necesita un especialista para configurarlo. CFG lo tienes listo en 3 minutos.' },
  { slug: 'freshbooks', name: 'FreshBooks', quote: 'FreshBooks es contabilidad, no protección. CFG te garantiza cobrar o te devolvemos 3 meses.' },
  { slug: 'quickbooks-self-employed', name: 'QuickBooks SE', quote: 'QuickBooks SE no está pensado para freelancers de servicios. CFG sí.' },
  { slug: 'wave', name: 'Wave', quote: 'Wave es gratuito porque monetiza tus datos. CFG cobra 29€/mes porque su negocio es protegerte.' },
  { slug: 'zoho-invoice', name: 'Zoho Invoice', quote: 'Zoho Invoice solo hace facturas. CFG bloquea entregas y te protege de verdad.' },
  { slug: 'invoice-ninja', name: 'Invoice Ninja', quote: 'Invoice Ninja no tiene recordatorios inteligentes. CFG los envía por WhatsApp.' },
  { slug: 'copilot', name: 'Copilot', quote: 'Copilot tiene buen portal de cliente, pero cero protección anti-impago. CFG lo tiene todo.' },
  { slug: 'and.co', name: 'AND.CO', quote: 'AND.CO cerró. Menos mal que encontré CFG a tiempo.' },
  { slug: 'factorial', name: 'Factorial', quote: 'Factorial es para RRHH, no para freelancers. CFG entiende mi negocio.' },
  { slug: 'upwork', name: 'Upwork', quote: 'Upwork se queda con el 20% de tus ingresos. Con CFG, el 100% es tuyo.' },
  { slug: 'holded', name: 'Holded', quote: 'Holded es un ERP genérico. CFG está diseñado para que los freelancers cobremos.' },
];

competitors.forEach(comp => {
  const dir = `src/app/vs-${comp.slug}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const content = `import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFG vs ${comp.name} — ¿Por qué los freelancers están migrando?',
  description: '${comp.quote}',
}

export default function Vs${comp.name.replace(/[^a-zA-Z]/g, '')}Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">CFG vs ${comp.name}</h1>
        <p className="text-xl text-zinc-300 mb-8">${comp.quote}</p>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
          Probar CFG 14 días gratis →
        </Link>
      </div>
    </main>
  )
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
  console.log(`✅ VS ${comp.name} actualizada`);
});
