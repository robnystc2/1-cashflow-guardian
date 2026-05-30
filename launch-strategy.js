const fs = require('fs');
const path = require('path');

// ============================================================
// 1. REDISEÑO TOTAL DE LA SECCIÓN DE PRECIOS (HERMOSA Y FUNCIONAL)
// ============================================================
let landingCode = fs.readFileSync('src/app/page.tsx', 'utf8');

const nuevaSeccionPrecios = `
      {/* PRECIOS */}
      <section id="precios" className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Elige tu <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">blindaje</span></h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Todos los planes incluyen la <strong className="text-white">Garantía Blindaje Total</strong>. Sin permanencia. Sin sorpresas.</p>
            <div className="flex justify-center gap-4 mt-4 text-xs text-zinc-500 font-medium">
              <span>🛡️ RGPD Compliant</span>
              <span>🌍 47 países</span>
              <span>⚡ Activo en 3 minutos</span>
            </div>
          </div>

          {/* Toggle Mensual / Anual */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-700/50 rounded-full p-1">
              <button onClick={() => setBillingCycle('monthly')} className={\`px-6 py-2.5 rounded-full text-sm font-semibold transition-all \${billingCycle === 'monthly' ? 'bg-white text-black shadow-lg' : 'text-zinc-300 hover:text-white'}\`}>Mensual</button>
              <button onClick={() => setBillingCycle('annual')} className={\`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 \${billingCycle === 'annual' ? 'bg-white text-black shadow-lg' : 'text-zinc-300 hover:text-white'}\`}>
                Anual
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Ahorra 99€</span>
              </button>
            </div>
          </div>

          {/* Planes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan Escudo */}
            <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl p-8 flex flex-col hover:border-zinc-600 transition-all">
              <h3 className="text-2xl font-bold mb-1">CFG Escudo</h3>
              <p className="text-sm text-zinc-400 mb-6">Protege hasta 5 facturas al mes.</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">9€</span>
                <span className="text-xl text-zinc-400">/mes</span>
                <p className="text-xs text-zinc-500 mt-1">30 céntimos/día</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> 5 facturas/mes</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Bloqueo de hitos</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> 3 clientes</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Recordatorios email</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> PayScore básico</li>
              </ul>
              <Link href="/register" className="block text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-full transition-all">Comenzar</Link>
            </div>

            {/* Plan Blindaje Pro (Destacado) */}
            <div className="bg-zinc-900 border-2 border-emerald-500 rounded-2xl p-8 flex flex-col relative scale-105 shadow-2xl shadow-emerald-500/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-sm font-extrabold px-5 py-1.5 rounded-full">
                🏆 Más popular
              </div>
              <h3 className="text-2xl font-bold mb-1 mt-2">CFG Blindaje Pro</h3>
              <p className="text-sm text-zinc-400 mb-6">Para no volver a perseguir una factura.</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-emerald-400">{prices.pro}€</span>
                <span className="text-xl text-zinc-400">/{billingCycle === 'annual' ? 'año' : 'mes'}</span>
                {billingCycle === 'annual' && <p className="text-sm text-emerald-400 mt-1">Menos de 1€ al día</p>}
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Facturas ilimitadas</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Bloqueo automático de hitos</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Recordatorios escalados</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Escudo Legal en 40+ países</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> PayScore y Cassandra IA</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Portal del cliente</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Contratos digitales</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Soporte 4h</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3.5 px-6 rounded-full transition-all shadow-lg shadow-emerald-500/20">Activar mi blindaje</Link>
              <p className="text-xs text-zinc-400 mt-3 text-center">14 días gratis · Sin tarjeta</p>
            </div>

            {/* Plan Fortress */}
            <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl p-8 flex flex-col hover:border-zinc-600 transition-all">
              <h3 className="text-2xl font-bold mb-1">CFG Fortress</h3>
              <p className="text-sm text-zinc-400 mb-6">Para freelancers que facturan +5.000€/mes.</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">{prices.total}€</span>
                <span className="text-xl text-zinc-400">/{billingCycle === 'annual' ? 'año' : 'mes'}</span>
                {billingCycle === 'annual' && <p className="text-sm text-zinc-400 mt-1">Menos de 2€/día</p>}
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Todo lo de Blindaje Pro</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Cassandra IA Avanzada</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Contratos revisados por abogado</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Dashboards avanzados</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> White-label</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Onboarding 1-a-1</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Soporte prioritario 1h</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-full transition-all">Hablar con el equipo</Link>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-500 mt-10">Todos los precios en euros (€). Sin costes ocultos. Sin permanencia. Cancelas cuando quieras.</p>
        </div>
      </section>`;

// Reemplazar la sección de precios existente (desde <section id="precios" hasta el cierre de </section> antes de FAQ o siguiente sección)
landingCode = landingCode.replace(
  /<section id="precios"[\s\S]*?<\/section>\s*(?={\/\* FAQ \*\/}|{\/\* CTA)/,
  nuevaSeccionPrecios
);
fs.writeFileSync('src/app/page.tsx', landingCode);
console.log('✅ Sección de precios rediseñada.');


// ============================================================
// 2. GENERAR SITEMAP.XML CON LAS 139 RUTAS
// ============================================================
const getRoutes = (dir, base = '') => {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory() && !item.name.startsWith('.') && !item.name.startsWith('api') && !item.name.startsWith('_')) {
      const fullPath = path.join(dir, item.name);
      if (fs.existsSync(path.join(fullPath, 'page.tsx'))) {
        results.push(base + '/' + item.name);
      }
      results = results.concat(getRoutes(fullPath, base + '/' + item.name));
    }
  }
  return results;
};

const appDir = 'src/app';
const routes = getRoutes(appDir).filter(r => !r.includes('/blog/') && !r.includes('/api/')); // Excluir dinámicas para simplificar
const blogRoutes = getRoutes('src/app/blog').filter(r => r.startsWith('/blog/') && r !== '/blog');

const allRoutes = ['/', ...routes, ...blogRoutes];
const uniqueRoutes = [...new Set(allRoutes)];

let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
uniqueRoutes.forEach(route => {
  sitemap += `  <url>\n    <loc>https://cashflowguardian.com${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
});
sitemap += '</urlset>';
fs.writeFileSync('public/sitemap.xml', sitemap);
console.log(`✅ Sitemap generado con ${uniqueRoutes.length} URLs.`);


// ============================================================
// 3. CREAR GUÍA DE MIGRACIÓN DESDE BONSAI (ACTIVO DE CAPTURA MASIVO)
// ============================================================
const bonsaiDir = 'src/app/migrar-de-bonsai';
if (!fs.existsSync(bonsaiDir)) fs.mkdirSync(bonsaiDir, { recursive: true });
const bonsaiContent = `import Link from 'next/link'

export default function MigrarDeBonsai() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">Guía de migración de Bonsai a CFG</h1>
        <p className="text-lg text-zinc-300 mb-8 text-center">Bonsai fue comprada por Zoom. Si eres uno de los 100.000 freelancers que buscan una alternativa, esta guía te explica cómo migrar en 10 minutos.</p>

        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Paso 1: Exporta tus datos de Bonsai</h2>
            <p className="text-zinc-300 text-sm">Accede a tu cuenta de Bonsai, ve a Configuración y descarga tus clientes y proyectos activos en formato CSV. También puedes descargar tus contratos y facturas pendientes.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Paso 2: Crea tu cuenta en CFG (gratis)</h2>
            <p className="text-zinc-300 text-sm">Regístrate en CFG en menos de 3 minutos. No necesitas tarjeta de crédito. Activa tu prueba gratuita de 14 días del plan Blindaje Pro.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Paso 3: Importa tus proyectos</h2>
            <p className="text-zinc-300 text-sm">Desde el panel de CFG, puedes importar tus clientes y proyectos. Define los hitos de pago para cada uno y activa la protección automática.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Paso 4: Activa el Escudo Legal y olvídate</h2>
            <p className="text-zinc-300 text-sm">CFG se encargará de los recordatorios y, si un cliente no paga, activará el Escudo Legal automáticamente. Si en 14 días no cobras, te devolvemos 3 meses de suscripción.</p>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-4 text-emerald-400">¿Listo para migrar?</h3>
            <p className="text-zinc-300 mb-6">Únete a los cientos de freelancers que ya están protegidos con CFG.</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full">
              Migrar a CFG ahora →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}`;
fs.writeFileSync(`${bonsaiDir}/page.tsx`, bonsaiContent);
console.log('✅ Guía de migración desde Bonsai creada.');


// ============================================================
// 4. CREAR 5 ARTÍCULOS ESTRATÉGICOS DE BLOG (COMPARATIVOS)
// ============================================================
const articulos = [
  {
    slug: 'cfga-vs-bonsai-comparativa-real',
    titulo: 'CFG vs Bonsai: comparativa real para autónomos españoles en 2026',
    intro: 'Bonsai fue comprada por Zoom y su futuro es incierto. En este artículo comparamos CFG y Bonsai en protección de pagos, precios y soporte en español.',
    linkComparativa: '/vs-bonsai'
  },
  {
    slug: 'proteger-cobros-freelance-espana',
    titulo: 'Cómo proteger los cobros siendo freelance en España: guía completa',
    intro: 'El 71% de los freelancers españoles ha sufrido impagos. Descubre cómo CFG te ayuda a blindar cada factura con bloqueo de hitos y garantía de devolución.',
    linkComparativa: null
  },
  {
    slug: 'herramientas-freelance-impago-latam',
    titulo: 'Las mejores herramientas para evitar impagos si eres freelancer en Latinoamérica',
    intro: 'México, Colombia, Argentina... los freelancers latinoamericanos necesitan protección específica. Analizamos CFG frente a otras opciones.',
    linkComparativa: '/comparar'
  },
  {
    slug: 'que-es-payscore-como-funciona',
    titulo: '¿Qué es el PayScore y cómo te ayuda a evitar clientes morosos?',
    intro: 'El PayScore de CFG califica a tus clientes según su historial real de pago. Así puedes decidir si aceptar un proyecto o pedir un anticipo.',
    linkComparativa: null
  },
  {
    slug: 'alternativas-honeybook-espanol',
    titulo: 'Alternativas a HoneyBook en español para freelancers',
    intro: 'HoneyBook subió sus precios y sigue sin ofrecer soporte nativo en español. Descubre por qué CFG es la mejor opción para el mercado hispanohablante.',
    linkComparativa: '/vs-honeybook'
  }
];

articulos.forEach(a => {
  const artDir = `src/app/blog/${a.slug}`;
  if (!fs.existsSync(artDir)) fs.mkdirSync(artDir, { recursive: true });
  const artContent = `import Link from 'next/link'

export default function Articulo${a.slug.replace(/-/g, '')}() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <article className="max-w-4xl mx-auto pt-24 pb-16 px-4">
        <div className="mb-8">
          <p className="text-xs text-zinc-500 mb-2">Blog · {new Date().toLocaleDateString('es-ES')}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">${a.titulo}</h1>
          <p className="text-lg text-zinc-400 leading-relaxed">${a.intro}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6">
          <p>En el mercado freelance actual, la protección de pagos es fundamental. Miles de profesionales independientes pierden horas y dinero persiguiendo facturas impagadas.</p>
          <p>CFG nació para resolver este problema con un enfoque claro: garantizar el cobro o devolver el dinero. A diferencia de otras herramientas, CFG ofrece bloqueo de entregas, recordatorios automáticos, Escudo Legal con jurisdicción local y un PayScore que evalúa la fiabilidad de tus clientes.</p>
          <h2>Comparativa con otras soluciones</h2>
          <p>Mientras que herramientas como Bonsai o HoneyBook se centran en facturación y CRM, CFG es la única que garantiza el resultado económico. Si un cliente no paga, no solo envías recordatorios: CFG escala automáticamente a un proceso legal y, si aún así no cobras, te devuelve hasta 3 meses de suscripción.</p>
          ${a.linkComparativa ? `<p className="text-center mt-8"><Link href="${a.linkComparativa}" className="text-emerald-400 font-bold hover:text-emerald-300">Ver comparativa completa →</Link></p>` : ''}
          <h2>Conclusión</h2>
          <p>Si quieres dejar de perseguir facturas y empezar a blindar cada proyecto, CFG es la herramienta que necesitas. Pruébala gratis durante 14 días sin tarjeta.</p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center mt-12">
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Protege tu próximo proyecto</h3>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full">
            Blindar mi primer proyecto →
          </Link>
        </div>
      </article>
    </div>
  )
}`;
  fs.writeFileSync(`${artDir}/page.tsx`, artContent);
});
console.log('✅ 5 artículos estratégicos de blog creados.');

console.log('🚀 Estrategia completa desplegada: precios rediseñados, sitemap, guía Bonsai, blog comparativo.');
