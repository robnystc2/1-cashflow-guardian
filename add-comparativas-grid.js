const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const gridComparativas = `
          <div id="comparativas" className="mt-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comparativas detalladas <span className="text-emerald-400">frente a cada competidor</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { name: 'Bonsai', slug: 'vs-bonsai' },
                { name: 'HoneyBook', slug: 'vs-honeybook' },
                { name: 'Moxie', slug: 'vs-moxie' },
                { name: 'Dubsado', slug: 'vs-dubsado' },
                { name: 'FreshBooks', slug: 'vs-freshbooks' },
                { name: 'QuickBooks', slug: 'vs-quickbooks-self-employed' },
                { name: 'Wave', slug: 'vs-wave' },
                { name: 'Zoho Invoice', slug: 'vs-zoho-invoice' },
                { name: 'Invoice Ninja', slug: 'vs-invoice-ninja' },
                { name: 'Holded', slug: 'cfg-holded' },
                { name: 'Copilot', slug: 'vs-copilot' },
                { name: 'And.co', slug: 'vs-and.co' },
                { name: 'Factorial', slug: 'vs-factorial' },
                { name: 'Upwork', slug: 'vs-upwork' },
              ].map(comp => (
                <Link key={comp.slug} href={\`/\${comp.slug}\`} className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 hover:border-emerald-500 hover:-translate-y-1 transition-all text-center group">
                  <span className="text-sm font-semibold text-zinc-200 group-hover:text-white">CFG vs {comp.name}</span>
                  <p className="text-[10px] text-zinc-400 mt-1">Ver comparativa completa →</p>
                </Link>
              ))}
            </div>
            <p className="text-xs text-zinc-500 mt-4 text-center">Comparaciones objetivas, basadas en datos públicos y experiencia real. Sin patrocinios.</p>
          </div>`;

// Insertar justo después del </table> y el div del CTA que le sigue
code = code.replace(
  /(<\/table>\s*<div className="mt-4 text-center"><Link href="\/register"[^>]*>Probar 14 días gratis →<\/Link><\/div>\s*)<\/div>/,
  '$1' + gridComparativas + '\n          </div>'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Cuadrícula de comparativas añadida.');
