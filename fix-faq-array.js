const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Buscar el bloque faqItems y eliminar líneas vacías entre objetos
const start = code.indexOf('const faqItems = [');
const end = code.indexOf('];', start) + 2;
const faqBlock = code.substring(start, end);

// Eliminar líneas vacías entre objetos (una coma seguida de salto de línea y otra llave)
const fixedFaqBlock = faqBlock.replace(/},\s*\n\s*\n\s*{/g, '},\n    {');

code = code.substring(0, start) + fixedFaqBlock + code.substring(end);
fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ FAQ array arreglado');
