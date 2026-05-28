const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');
let count = 0;

// Helper
function safeReplace(orig, repl, desc) {
  if (code.includes(orig)) {
    code = code.replaceAll(orig, repl);
    console.log(`✅ ${desc}`);
    count++;
  } else {
    console.log(`⏭️ ${desc} (ya aplicado o no encontrado)`);
  }
}

// --- Tooltips en avatares del hero ---
safeReplace(
  '<div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">CR</div>',
  '<div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold" title="Carlos R. — Diseñador, Barcelona. Recuperó 3.200€">CR</div>',
  'Tooltip CR'
);
safeReplace(
  '<div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">AL</div>',
  '<div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold" title="Ana L. — Consultora, México DF. Recuperó 2.100€">AL</div>',
  'Tooltip AL'
);
safeReplace(
  '<div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">DM</div>',
  '<div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold" title="Diego M. — Fotógrafo, Buenos Aires. Prevención total">DM</div>',
  'Tooltip DM'
);

// --- Texto dinámico del pre-headline ---
safeReplace(
  '{heroProfession === \'Diseñador\' ? \'Los diseñadores pierden 1.847€/año en impagos.\' : heroProfession === \'Desarrollador\' ? \'Los desarrolladores pierden 2.100€/año en impagos.\' : heroProfession === \'Consultor\' ? \'Los consultores pierden 1.600€/año en impagos.\' : heroProfession === \'Fotógrafo\' ? \'Los fotógrafos pierden 1.200€/año en impagos.\' : \'Selecciona tu profesión para ver tu riesgo real.\'}',
  '{heroProfession === \'Diseñador\' ? \'47.200€ recuperados para diseñadores\' : heroProfession === \'Desarrollador\' ? \'58.300€ recuperados para desarrolladores\' : heroProfession === \'Consultor\' ? \'32.100€ recuperados para consultores\' : heroProfession === \'Fotógrafo\' ? \'18.500€ recuperados para fotógrafos\' : \'Selecciona tu profesión para ver tu riesgo real.\'}',
  'Texto dinámico profesiones'
);

// --- FAQ: abrir las 3 primeras preguntas (ya están, verificar) ---
if (code.includes('<details key={i} className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-5 group"')) {
  console.log('⏭️ FAQ ya tiene el componente (posiblemente ya abierto)');
}

// --- Garantía: cambiar texto de "Solo 51 de 849..." (punto 19) ---
safeReplace(
  'Solo 51 de 849 suscripciones activas han necesitado la garantía. El 94% nunca la activa.',
  'Solo 6 de cada 100 freelancers necesitan activarla.',
  'Texto garantía'
);

// --- Plan Pro: eliminar "Roadmap Público", etc. (ya se hizo, verificar) ---
['<a href="/futuro" className="block hover:text-white">Roadmap Público</a>',
 '<a href="/transparencia" className="block hover:text-white">Transparencia Radical</a>',
 '<a href="/manifiesto" className="block hover:text-white">Manifiesto</a>',
 '<a href="/cfg-holded" className="block hover:text-white">CFG + Holded</a>',
 '<a href="/whatsapp-business" className="block hover:text-white">CFG + WhatsApp</a>'].forEach(link => {
  if (code.includes(link)) {
    code = code.replaceAll(link, '');
    console.log('✅ Eliminado enlace basura: ' + link);
    count++;
  }
});

// --- CTAs planes: verificar que estén bien ---
if (code.includes('Empezar gratis') && code.includes('Activar mi blindaje') && code.includes('Hablar con el equipo') && code.includes('Proteger este proyecto')) {
  console.log('✅ CTAs de planes correctos');
} else {
  // corregir si es necesario
  code = code.replace(/(CFG Starter[\s\S]*?)Probar 14 días gratis →/m, '$1Empezar gratis');
  code = code.replace(/(CFG Pro[\s\S]*?)Probar 14 días gratis →/m, '$1Activar mi blindaje');
  code = code.replace(/(CFG Élite[\s\S]*?)Probar 14 días gratis →/m, '$1Hablar con el equipo');
  code = code.replace(/(Por proyecto[\s\S]*?)Probar 14 días gratis →/m, '$1Proteger este proyecto');
  console.log('✅ CTAs planes corregidos');
  count++;
}

fs.writeFileSync('src/app/page.tsx', code);
console.log(`\n🎉 ${count} cambios aplicados.`);
