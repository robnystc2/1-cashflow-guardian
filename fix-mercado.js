const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Bloque correcto de "El mercado freelance está roto"
const mercadoCorrecto = `<section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-900/20 border border-amber-700/30 rounded-2xl p-6 text-center">
            <p className="text-amber-300 font-bold text-lg mb-2">⚠️ El mercado freelance está roto</p>
            <p className="text-zinc-300 text-sm max-w-2xl mx-auto">Bonsai fue comprada por Zoom. HoneyBook subió precios un 89%. AND.CO cerró. Dubsado requiere especialistas de $500 para configurarlo. CFG es independiente, construido en España, y cuesta menos de 1€ al día.</p>
            <div className="flex justify-center gap-4 mt-3 text-xs text-zinc-400 flex-wrap">
              <span>❌ Bonsai: pagos retenidos 10 días</span>
              <span>❌ HoneyBook: solo USA/Canadá</span>
              <span>❌ Moxie: sin protección anti-impago</span>
              <span>❌ Dubsado: soporte en declive</span>
            </div>
          </div>
        </div>
      </section>`;

// Buscar la sección "mercado" dañada (empieza con el <p> de "⚠️ El mercado...")
const startMarker = '<p className="text-amber-300 font-bold text-lg mb-2">⚠️ El mercado freelance está roto</p>';
const startIndex = code.indexOf(startMarker);
if (startIndex === -1) {
    console.log('No se encontró la sección de mercado');
    process.exit(1);
}

// Buscar el inicio de la sección (debería ser <section...>)
const sectionStart = code.lastIndexOf('<section className="py-12 px-4 bg-zinc-950">', startIndex);
// Buscar el final de la sección (</section>)
const sectionEnd = code.indexOf('</section>', startIndex) + 10;

if (sectionStart === -1 || sectionEnd < 10) {
    console.log('No se encontraron los límites de la sección');
    process.exit(1);
}

// Reemplazar
code = code.substring(0, sectionStart) + mercadoCorrecto + code.substring(sectionEnd);
fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Sección "El mercado está roto" corregida.');
