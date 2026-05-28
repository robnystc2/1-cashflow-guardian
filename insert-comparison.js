const fs = require('fs');
const { execSync } = require('child_process');

let current = fs.readFileSync('src/app/page.tsx', 'utf8');
let good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

// Extraer el bloque comparisonRows de la versión buena
const startMarker = 'const comparisonRows = [';
const endMarker = 'const allTestimonials = [';
const goodStart = good.indexOf(startMarker);
const goodEnd = good.indexOf(endMarker, goodStart);
const comparisonBlock = good.substring(goodStart, goodEnd).trimEnd();

// Buscar el punto de inserción en el archivo actual: justo antes de 'const allTestimonials'
const allTestimonialsIdx = current.indexOf('const allTestimonials = [');
if (allTestimonialsIdx === -1) {
  // Si no existe allTestimonials, insertar antes del return
  const returnIdx = current.indexOf('  return (');
  if (returnIdx === -1) {
    console.log('No se encontró punto de inserción.');
    process.exit(1);
  }
  current = current.substring(0, returnIdx) + comparisonBlock + '\n\n  ' + current.substring(returnIdx);
} else {
  current = current.substring(0, allTestimonialsIdx) + comparisonBlock + '\n\n  ' + current.substring(allTestimonialsIdx);
}

fs.writeFileSync('src/app/page.tsx', current);
console.log('✅ comparisonRows insertado.');
