const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Buscar la primera ocurrencia de 'const [animatedStats'
const firstMatch = code.indexOf('const [animatedStats, setAnimatedStats]');
const secondMatch = code.indexOf('const [animatedStats, setAnimatedStats]', firstMatch + 1);

if (secondMatch === -1) {
  console.log('No se encontró duplicado de animatedStats.');
  process.exit(1);
}

// Buscar el inicio de la línea de precios (que es donde acaba la sección de estados)
const pricesIndex = code.indexOf('const prices = {', secondMatch);
if (pricesIndex === -1) {
  console.log('No se encontró la sección de precios.');
  process.exit(1);
}

// Eliminar desde el inicio del duplicado hasta antes de precios
code = code.substring(0, secondMatch) + code.substring(pricesIndex);
fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Sección duplicada de estados eliminada.');
