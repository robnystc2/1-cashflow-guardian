const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Plan Starter más limitado (1 factura, 1 cliente, sin bloqueo)
page = page.replace(
  'Protege hasta 5 facturas al mes.',
  'Protege 1 factura al mes. Ideal para probar el sistema.'
);
page = page.replace(
  /(<li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0\.5 w-4 h-4" \/> )5 facturas\/mes/,
  '$11 factura/mes'
);
page = page.replace(
  /(<li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0\.5 w-4 h-4" \/> )Bloqueo de hitos/,
  '$1Recordatorios email'
);
page = page.replace(
  /(<li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0\.5 w-4 h-4" \/> )3 clientes/,
  '$11 cliente'
);
page = page.replace(
  /(<li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0\.5 w-4 h-4" \/> )Recordatorios email/,
  '$1Sin bloqueo de hitos'
);

// 2. Reordenar planes: Élite → Pro → Starter → Por proyecto → Teams
const planesSection = page.match(
  /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">[\s\S]*?<\/div>\s*<div className="mt-8 bg-zinc-900/
);
if (planesSection) {
  let planesHTML = planesSection[0];
  
  // Extraer cada plan
  const starterMatch = planesHTML.match(/<div className="bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-10 flex flex-col">[\s\S]*?CFG Starter[\s\S]*?<\/div><\/div>/);
  const proMatch = planesHTML.match(/<div className="bg-zinc-900 border-2 rounded-2xl p-10 flex flex-col relative scale-105 border-emerald-500">[\s\S]*?CFG Pro[\s\S]*?<\/div><\/div>/);
  const eliteMatch = planesHTML.match(/<div className="bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-10 flex flex-col transition-all">[\s\S]*?CFG Élite[\s\S]*?<\/div><\/div>/);
  const proyectoMatch = planesHTML.match(/<div className="bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-10 flex flex-col transition-all">[\s\S]*?Por proyecto[\s\S]*?<\/div><\/div>/);
  const teamsMatch = planesHTML.match(/<div className="bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-10 flex flex-col transition-all">[\s\S]*?CFG Teams[\s\S]*?<\/div><\/div>/);

  if (eliteMatch && proMatch && starterMatch && proyectoMatch && teamsMatch) {
    const nuevoOrden = eliteMatch[0] + proMatch[0] + starterMatch[0] + proyectoMatch[0] + teamsMatch[0];
    page = page.replace(planesHTML, planesHTML.replace(
      /(<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">)[\s\S]*?(<\/div>\s*<div className="mt-8 bg-zinc-900)/,
      '$1\n' + nuevoOrden + '\n              $2'
    ));
  }
}

fs.writeFileSync('src/app/page.tsx', page);
console.log('✅ Planes reordenados y Starter limitado');
