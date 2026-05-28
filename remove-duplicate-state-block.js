const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Buscar la primera y segunda ocurrencia de 'const [billingCycle'
const first = code.indexOf('const [billingCycle, setBillingCycle]');
const second = code.indexOf('const [billingCycle, setBillingCycle]', first + 1);

if (second === -1) {
  console.log('No se encontró el duplicado de billingCycle.');
  process.exit(1);
}

// Buscar 'const prices = {' después del segundo bloque
const pricesIdx = code.indexOf('const prices = {', second);
if (pricesIdx === -1) {
  console.log('No se encontró const prices.');
  process.exit(1);
}

// Eliminar desde el inicio del segundo bloque hasta justo antes de const prices
code = code.substring(0, second) + code.substring(pricesIdx);
fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Bloque duplicado de estados eliminado.');
