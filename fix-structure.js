const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Extraer el bloque faqItems que está suelto al principio
const faqStart = code.indexOf('const faqItems = [');
const faqEnd = code.indexOf('];', faqStart) + 2; // incluye ];

if (faqStart === -1 || faqEnd === -1) {
  console.log('No se encontró el array faqItems suelto.');
  process.exit(1);
}

const faqBlock = code.substring(faqStart, faqEnd + 1); // incluye el salto de línea

// 2. Eliminar ese bloque de donde está ahora
code = code.substring(0, faqStart) + code.substring(faqEnd + 1);

// 3. Buscar el componente LandingPage y un punto de inserción adecuado
const functionStart = code.indexOf('export default function LandingPage() {');
if (functionStart === -1) {
  console.log('No se encontró la función LandingPage.');
  process.exit(1);
}

// Insertar el bloque faqItems justo antes de "const allTestimonials = ["
const insertionPoint = code.indexOf('const allTestimonials = [');
if (insertionPoint === -1) {
  // Si no se encuentra, insertar antes del return
  const returnIdx = code.indexOf('return (');
  if (returnIdx === -1) {
    console.log('No se encontró punto de inserción.');
    process.exit(1);
  }
  code = code.substring(0, returnIdx) + faqBlock + '\n  ' + code.substring(returnIdx);
} else {
  code = code.substring(0, insertionPoint) + faqBlock + '\n  ' + code.substring(insertionPoint);
}

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Estructura del archivo corregida.');
