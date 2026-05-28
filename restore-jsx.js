const fs = require('fs');
const { execSync } = require('child_process');

let current = fs.readFileSync('src/app/page.tsx', 'utf8');
let good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

// Encontrar dónde empieza el JSX en la versión buena (después de "return (")
const returnStart = good.indexOf('  return (');
if (returnStart === -1) {
  console.log('No se encontró el return en la versión buena.');
  process.exit(1);
}

// Extraer el JSX completo desde el return hasta el final
const goodJSX = good.substring(returnStart);

// En el archivo actual, encontrar el último cierre de useEffect o array antes del JSX truncado
const lastGoodLine = current.indexOf('  useEffect(() => { const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) setAnimatedStats(true) }, { threshold: 0.3 }); if (statsRef.current) observer.observe(statsRef.current); return () => observer.disconnect() }, [])');
if (lastGoodLine === -1) {
  console.log('No se encontró el último useEffect.');
  process.exit(1);
}

// Encontrar el final de esa línea (el cierre de la función)
const endOfLogic = current.indexOf('\n', lastGoodLine) + 1;

// Unir lógica actual + JSX de la versión buena
const fixed = current.substring(0, endOfLogic) + goodJSX;
fs.writeFileSync('src/app/page.tsx', fixed);
console.log('✅ JSX restaurado correctamente.');
