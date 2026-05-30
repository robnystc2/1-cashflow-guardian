const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Eliminar cualquier inserción previa del plan gratuito
code = code.replace(/<div className="bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-10 flex flex-col transition-all">\s*<h3 className="text-2xl font-bold mb-2">CFG Free<\/h3>[\s\S]*?Empezar gratis<\/Link>\s*<\/div>/g, '');

// Nuevo plan gratuito bien formado
const planGratuitoBien = `
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-10 flex flex-col transition-all">
              <h3 className="text-2xl font-bold mb-2">CFG Free</h3>
              <p className="text-xs text-zinc-400 mb-4">Para siempre gratis.</p>
              <p className="text-4xl font-extrabold text-white mb-4">0€<span className="text-xl text-zinc-400">/mes</span></p>
              <ul className="text-left text-zinc-300 space-y-6 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> 1 proyecto activo</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Recordatorios básicos</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Badge CFG visible</li>
              </ul>
              <Link href="/register" className="block text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-full transition-all">Empezar gratis</Link>
            </div>`;

// Insertar justo antes de CFG Escudo
code = code.replace(
  /(<div className="bg-zinc-900 border border-zinc-700\/50 rounded-2xl p-8 flex flex-col hover:border-zinc-600 transition-all">\s*<h3 className="text-2xl font-bold mb-1">CFG Escudo<\/h3>)/,
  planGratuitoBien + '\n' + '$1'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Plan gratuito corregido e insertado correctamente.');
