const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Buscar la primera y segunda ocurrencia de 'const [demoNombre'
const first = code.indexOf('const [demoNombre, setDemoNombre]');
const second = code.indexOf('const [demoNombre, setDemoNombre]', first + 1);

if (second === -1) {
  console.log('No se encontró duplicado de demoNombre.');
  process.exit(1);
}

// Buscar 'const prices = {' DESPUÉS del segundo bloque
const pricesIdx = code.indexOf('const prices = {', second);
if (pricesIdx === -1) {
  console.log('No se encontró const prices.');
  process.exit(1);
}

// Eliminar desde el inicio del duplicado hasta justo antes de const prices
code = code.substring(0, second) + code.substring(pricesIdx);
fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Bloque duplicado eliminado desde demoNombre.');
