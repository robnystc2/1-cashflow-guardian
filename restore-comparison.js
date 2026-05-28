const fs = require('fs');
const { execSync } = require('child_process');

let code = fs.readFileSync('src/app/page.tsx', 'utf8');
let good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

// Extraer el bloque comparisonRows de la versión buena
const startMarker = 'const comparisonRows = [';
const endMarker = '];';
const goodStart = good.indexOf(startMarker);
const goodEnd = good.indexOf(endMarker, goodStart) + 2;
const comparisonBlock = good.substring(goodStart, goodEnd);

// Insertarlo justo antes de "const allTestimonials = [" en el archivo actual
const insertPoint = code.indexOf('const allTestimonials = [');
if (insertPoint === -1) {
  console.log('No se encontró allTestimonials.');
  process.exit(1);
}

code = code.substring(0, insertPoint) + comparisonBlock + '\n\n  ' + code.substring(insertPoint);
fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Bloque comparisonRows restaurado.');
