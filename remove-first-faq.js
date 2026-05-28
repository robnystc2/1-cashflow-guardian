const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const firstFaq = code.indexOf('const faqItems = [');
const secondFaq = code.indexOf('const faqItems = [', firstFaq + 1);

if (firstFaq === -1 || secondFaq === -1) {
  console.log('No se encontraron los bloques.');
  process.exit(1);
}

// Eliminar el primer bloque (desde firstFaq hasta antes del segundo bloque)
code = code.substring(0, firstFaq) + code.substring(secondFaq);
fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Primer bloque faqItems eliminado.');
