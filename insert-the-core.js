const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Eliminar la sección del fundador falso
code = code.replace(
  /<section className="py-16 px-4 bg-zinc-950">\s*<div className="max-w-4xl mx-auto text-center">\s*<div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-extrabold text-3xl mx-auto mb-4 shadow-xl shadow-emerald-500\/30 border-4 border-white\/10">R<\/div>\s*<h2 className="text-3xl md:text-4xl font-bold mb-4">Construido por alguien que lo vivió<\/h2>\s*<p className="text-zinc-300 text-lg max-w-2xl mx-auto leading-relaxed">Era octubre de 2024[\s\S]*?— Rodrigo · Fundador · Tenerife, 16 años<\/p>\s*<\/div>\s*<\/section>/g,
  ''
);

const nuevaSeccion = `
      {/* THE CORE */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-black font-extrabold text-3xl mx-auto mb-4 shadow-xl shadow-amber-500/30 border-4 border-white/10">TC</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Parte de The Core</h2>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto leading-relaxed">
            CFG es el primer SaaS de <strong className="text-white">The Core</strong>, un estudio de software que construye herramientas impecables para nichos desatendidos. No somos una startup tradicional: somos un equipo obsesionado con crear productos que no solo funcionan, sino que <strong className="text-amber-400">definen su categoría</strong>.
          </p>
          <p className="text-zinc-400 text-sm mt-4 max-w-xl mx-auto">
            Cada SaaS de The Core comparte la misma filosofía: perfección quirúrgica, foco en un solo problema, y una experiencia de usuario que hace innecesario el soporte. Esto es solo el principio.
          </p>
          <a href="https://thecore.studio" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm">
            Conoce The Core →
          </a>
        </div>
      </section>`;

// Insertar justo antes de la sección de Demo Interactiva
code = code.replace(
  '{/* DEMO INTERACTIVA */}',
  `${nuevaSeccion}\n{/* DEMO INTERACTIVA */}`
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Nueva sección de The Core insertada correctamente.');
