const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// ========== HERO: Refuerzo de copy (25, 26, 35, 36) ==========
// 26. Añadir subtítulo explicativo debajo del H1
code = code.replace(
  /(<h1 className="text-5xl md:text-8xl lg:text-8xl font-extrabold tracking-tight leading-\[1\.05\] max-w-xl">\s*En 14 días cobras\. O te pagamos 3 meses\.\s*<\/h1>)/,
  `$1
            <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              El único sistema para freelancers que bloquea tus entregas, persigue el cobro automáticamente y garantiza que cobras o te devolvemos el dinero.
            </p>`
);

// 35. CTA personalizado por profesión
code = code.replace(
  /Blindar mi primer proyecto gratis →/g,
  '{`Blindar mi primer proyecto de ${heroProfession} gratis →`}'
);

// 36. Añadir 4º check: "✓ Garantía de cobro incluida"
code = code.replace(
  /(<span className="flex items-center gap-1"><span className="text-emerald-400">✓<\/span> Cancela cuando quieras<\/span>)/,
  `$1
              <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Garantía de cobro incluida</span>`
);

// ========== NICHOS: Ajuste de copy en tarjetas (40-41) ==========
// 40. Corregir acento en "Tú sin un euro"
code = code.replace(/Tu sin un euro/g, 'Tú sin un euro.');

// 41. Ampliar copy de Agencia pequeña
code = code.replace(
  /Múltiples clientes\. Caos de cobros\./g,
  'Gestionas 8 clientes. Cada uno con su propio calendario. El caos de cobros te consume 20 horas al mes.'
);

// ========== BANNER MERCADO ROTO (46-48) ==========
// 46. Añadir línea sobre Fiverr Workspace
code = code.replace(
  /(Bonsai fue comprada por Zoom\. HoneyBook subió precios un 89%\. AND\.CO cerró\. Dubsado requiere especialistas de \$500 para configurarlo\.)/,
  `× Fiverr Workspace: cerró definitivamente en marzo 2026. Miles de usuarios buscando alternativa ahora mismo.\n            $1`
);

// 47. Corregir dato de HoneyBook
code = code.replace(/HoneyBook subió precios un 89%/g, 'HoneyBook subió precios un 40% en 2024');

// 48. Añadir punto sobre Fiverr Workspace
code = code.replace(
  /(Dubsado requiere especialistas de \$500 para configurarlo\.)/,
  `$1\n            × Fiverr Workspace: cerrado en 2026. Sin alternativa nativa para LatAm. ¿Vienes de Fiverr Workspace? Migra gratis →`
);

// ========== PASOS 0/3/7: Añadir Día -1 y estadísticas (87-88) ==========
code = code.replace(
  /(Día 0: Amable)/,
  `Día -1: Recordatorio preventivo\n              24h antes del vencimiento, tu cliente recibe un recordatorio amable.\n\n            $1`
);

code = code.replace(
  /(El 94% paga antes del recordatorio legal\. Tú nunca envías nada\.)/,
  `$1\n          El 67% paga en el Día 0. El 27% en el Día 3. Solo el 6% llega al Día 7, y el 94% de esos también acaba pagando.`
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Lote 5 completado: Hero, nichos, banner, pasos 0/3/7.');
