const fs = require('fs');
const { execSync } = require('child_process');

let current = fs.readFileSync('src/app/page.tsx', 'utf8');
let good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

// Extraer comparisonRows de la versión buena
const startMarker = 'const comparisonRows = [';
const endMarker = '];';
const goodStart = good.indexOf(startMarker);
const goodEnd = good.indexOf(endMarker, goodStart) + 2; // incluye ];
const comparisonBlock = good.substring(goodStart, goodEnd);

// Buscar 'const allTestimonials' en el archivo actual
const allTestimonialsIdx = current.indexOf('const allTestimonials = [');
if (allTestimonialsIdx === -1) {
  console.log('No se encontró allTestimonials.');
  process.exit(1);
}

// Insertar el bloque justo antes
current = current.substring(0, allTestimonialsIdx) + comparisonBlock + '\n\n  ' + current.substring(allTestimonialsIdx);
fs.writeFileSync('src/app/page.tsx', current);
console.log('✅ comparisonRows insertado.');
