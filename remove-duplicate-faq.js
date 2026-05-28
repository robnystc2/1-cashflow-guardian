const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Buscar la primera ocurrencia de "const faqItems = ["
const firstFaq = code.indexOf('const faqItems = [');
if (firstFaq === -1) {
  console.log('No se encontró faqItems.');
  process.exit(1);
}

// Buscar el cierre "];" de ese primer bloque
const endOfFirstFaq = code.indexOf('];', firstFaq) + 2;

// Eliminar ese primer bloque
code = code.substring(0, firstFaq) + code.substring(endOfFirstFaq);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Primer bloque faqItems eliminado.');
