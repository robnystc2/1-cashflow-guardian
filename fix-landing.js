const fs = require('fs');

let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// =====================================================
// 1. Eliminar imports no usados
// =====================================================
code = code.replace(/import HeroAnimation from '\.\/components\/landing\/hero-animation'\n/g, '');
code = code.replace(/import CalculadoraInline from '\.\/components\/landing\/calculadora-inline'\n/g, '');

// =====================================================
// 2. Eliminar filas duplicadas en comparisonRows
// =====================================================
// Eliminar la segunda aparición de "Comisiones por transacción"
code = code.replace(
  /  \{ feat: 'Comisiones por transacción', bonsai: '✓ \(hasta 3%\)', honeybook: '✓ \(hasta 3%\)', moxie: '✓', dubsado: '✓', nosotros: '✓ 0% \(precio fijo\)' \},\n/g,
  ''
);
// Eliminar la segunda aparición de "Control del dinero"
code = code.replace(
  /  \{ feat: 'Control del dinero', bonsai: 'Retiene pagos', honeybook: 'Retiene pagos', moxie: 'Retiene pagos', dubsado: 'Retiene pagos', nosotros: '✓ Directo a tu cuenta' \},\n/g,
  ''
);

// =====================================================
// 3. Corregir lógica de roiPerdida (arreglar fórmula)
// =====================================================
code = code.replace(
  /const roiPerdida = Math\.round\(roiFacturacion \* 12 \* \(roiTardanza \/ 100\) \* \(roiImpago === 1 \? 1 : 0\.71\)\)/,
  'const roiPerdida = Math.round(roiFacturacion * 12 * (roiTardanza / 100) * (roiImpago === 1 ? 1.4 : 1))'
);

// =====================================================
// 4. Separar el estado roiClientes para el slider de proyectos activos
// =====================================================
// Añadir nuevo estado justo después de la declaración de roiClientes
code = code.replace(
  /const \[roiClientes, setRoiClientes\] = useState\(3\)/,
  'const [roiClientes, setRoiClientes] = useState(3)\n  const [roiProyectosActivos, setRoiProyectosActivos] = useState(3)'
);

// Cambiar el slider de "¿Cuántos proyectos activos tienes ahora?" para que use roiProyectosActivos
// Buscamos el fragmento del slider y reemplazamos los bindings
code = code.replace(
  /<div><label className="text-sm text-zinc-300 block mb-2">¿Cuántos proyectos activos tienes ahora\?<\/label><input type="range" min="1" max="10" value=\{roiClientes\} onChange=\{e => setRoiClientes\(Number\(e\.target\.value\)\)\} className="w-full accent-emerald-500 cursor-pointer" \/><span className="text-xs text-zinc-400">\{roiClientes\} proyectos activos<\/span><\/div>/,
  '<div><label className="text-sm text-zinc-300 block mb-2">¿Cuántos proyectos activos tienes ahora?</label><input type="range" min="1" max="10" value={roiProyectosActivos} onChange={e => setRoiProyectosActivos(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiProyectosActivos} proyectos activos</span></div>'
);

// =====================================================
// 5. Reemplazar imágenes de pravatar por avatares con iniciales
// =====================================================
code = code.replace(
  /<img src=\{`https:\/\/i\.pravatar\.cc\/100\?u=\$\{t\.name\}`\} alt=\{t\.name\} className="w-full h-full object-cover" \/>/g,
  '<div className="w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-xs">{t.name.split(" ").map(n=>n[0]).join("")}</div>'
);

// =====================================================
// 6. Añadir id y htmlFor a campos clave para accesibilidad
// =====================================================
// Hero: select de profesión
code = code.replace(
  /<select value=\{heroProfession\} onChange=\{e => setHeroProfession\(e\.target\.value\)\} className="ml-2 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-emerald-500">/,
  '<select id="hero-profession" value={heroProfession} onChange={e => setHeroProfession(e.target.value)} className="ml-2 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-emerald-500">'
);
code = code.replace(
  /<label className="text-sm text-zinc-400">Tu profesión:<\/label>/,
  '<label htmlFor="hero-profession" className="text-sm text-zinc-400">Tu profesión:</label>'
);

// Demo: input de nombre cliente
code = code.replace(
  /<input type="text" placeholder="Nombre del cliente" value=\{demoNombre\} onChange=\{e => setDemoNombre\(e\.target\.value\)\} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" \/>/,
  '<input id="demo-nombre" type="text" placeholder="Nombre del cliente" value={demoNombre} onChange={e => setDemoNombre(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />'
);
// Añadir label correspondiente (no hay label para ese input, lo omitimos porque es un placeholder. Mejor dejarlo.)
// Demo: input de proyecto
code = code.replace(
  /<input type="text" placeholder="Nombre del proyecto" value=\{demoProyecto\} onChange=\{e => setDemoProyecto\(e\.target\.value\)\} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" \/>/,
  '<input id="demo-proyecto" type="text" placeholder="Nombre del proyecto" value={demoProyecto} onChange={e => setDemoProyecto(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />'
);

// Email en calculadora
code = code.replace(
  /<input type="email" placeholder="Recibe tu análisis personalizado" className="flex-1 bg-zinc-800 border border-zinc-700\/50 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" \/>/,
  '<input id="calc-email" type="email" placeholder="Recibe tu análisis personalizado" className="flex-1 bg-zinc-800 border border-zinc-700/50 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />'
);
// No hay label asociado, pero al menos tiene id.

// =====================================================
// 7. Añadir aria-label al botón de menú hamburguesa
// =====================================================
code = code.replace(
  /<button onClick=\{\(\) => setMobileMenu\(!mobileMenu\)\} className="md:hidden text-zinc-400 hover:text-white p-2">/,
  '<button aria-label="Menú" onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-zinc-400 hover:text-white p-2">'
);

// =====================================================
// 8. Corregir texto del video: "(mira el video) (video real)"
// =====================================================
code = code.replace(
  /\(mira el video\) \(video real\)/g,
  '(video de 90s)'
);

// Guardar los cambios
fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Landing corregida con éxito. Verifica con git diff.');
