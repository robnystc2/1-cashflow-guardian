const fs = require('fs');

// ========== 1. CARGAR EL ARCHIVO ==========
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// ========== 2. ELIMINAR BARRA DE LOGOS DUPLICADA ==========
// Se insertó accidentalmente dos veces. Eliminamos la segunda ocurrencia.
const logosBlock = `<div className="py-4 bg-zinc-950/50 border-b border-zinc-800">
    <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-6 flex-wrap text-xs text-zinc-500">
      <span>Compatible con:</span>
      <span className="text-zinc-400 font-bold">Holded</span>
      <span className="text-zinc-400 font-bold">Quipu</span>
      <span className="text-zinc-400 font-bold">Stripe</span>
      <span className="text-zinc-400 font-bold">Google Calendar</span>
      <span className="text-zinc-400 font-bold">Zapier</span>
      <span className="text-zinc-400 font-bold">Notion</span>
    </div>
  </div>`;
// Contar ocurrencias
const count = code.split(logosBlock).length - 1;
if (count > 1) {
  // Reemplazar solo la segunda aparición
  let found = 0;
  code = code.replace(new RegExp(logosBlock.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), (match) => {
    found++;
    return found === 2 ? '' : match;
  });
  console.log('✅ Barra de logos duplicada eliminada.');
}

// ========== 3. PANEL DE CONTROL: QUITAR PLACEHOLDER ==========
code = code.replace(
  /Tu Panel de Control Real \(próximamente screenshot real\)/g,
  'Tu Panel de Control Blindado'
);

// ========== 4. UNIFICAR NÚMERO DE FREELANCERS EN HERO ==========
// Cambiar "848 freelancers recuperaron..." por el valor dinámico {liveFreelancers}
code = code.replace(
  /848 freelancers recuperaron 124\.000€ y 200\.000 horas/g,
  '{liveFreelancers} freelancers recuperaron 124.000€ y 200.000 horas'
);

// ========== 5. CORREGIR PREVIEW DE LA DEMO INTERACTIVA ==========
// Reemplazar la preview anterior (que usaba template literals mal) por una versión JSX correcta
const previewCode = `{demoNombre && demoProyecto && (
    <div className="mt-4 p-3 bg-zinc-800 rounded-xl text-left text-xs text-zinc-300 max-w-md mx-auto">
      <p className="font-bold text-emerald-400 mb-1">Vista previa del recordatorio:</p>
      <p>Día 0: &quot;{demoNombre}, aquí tienes la factura del proyecto {demoProyecto}. Puedes pagar fácilmente aquí: [botón de pago]. Gracias.&quot;</p>
      <p className="mt-1">Día 3: &quot;{demoNombre}, tu factura del proyecto {demoProyecto} lleva 3 días pendiente. El siguiente hito está bloqueado hasta recibir el pago.&quot;</p>
      <p className="mt-1">Día 7: &quot;{demoNombre}, hemos iniciado el proceso legal por el importe del proyecto {demoProyecto}. Adjuntamos carta de reclamación.&quot;</p>
    </div>
  )}`;

// Buscar el bloque antiguo y reemplazarlo
const oldPreviewRegex = /\{demoNombre && demoProyecto && \([\s\S]*?\)\}/;
if (code.match(oldPreviewRegex)) {
  code = code.replace(oldPreviewRegex, previewCode);
} else {
  // Si no existe, lo insertamos justo después de los inputs de la demo
  const demoSectionEnd = '</section>\n<section className="py-16 px-4 bg-zinc-950">';
  code = code.replace(demoSectionEnd, `${previewCode}\n</section>\n<section className="py-16 px-4 bg-zinc-950">`);
}
console.log('✅ Vista previa de la demo corregida.');

// ========== 6. ELIMINAR LOS 4 PASOS NUMERADOS DE LA GARANTÍA (ya están los 3 bullets) ==========
// Los bullets simplificados ya se insertaron. Ahora borramos los 4 pasos largos si todavía existen.
code = code.replace(
  /<div className="text-xs text-zinc-400 mt-3 space-y-2">[\s\S]*?<p>1\. Creas el proyecto[\s\S]*?por transferencia bancaria en 48h<\/p>/,
  ''
);

// ========== 7. GUARDAR ==========
fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Pulido final completado. La landing está perfecta.');
