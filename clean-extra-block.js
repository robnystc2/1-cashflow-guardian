const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Buscar el inicio del bloque extra (el segundo 'use client' que aparece después del faqItems)
const extraStart = code.indexOf("\n'use client'\nimport { useState");

if (extraStart === -1) {
  console.log('No se encontró el bloque extra.');
  process.exit(1);
}

// Eliminar desde el inicio del bloque extra hasta el final del archivo
code = code.substring(0, extraStart);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Bloque extra eliminado.');
