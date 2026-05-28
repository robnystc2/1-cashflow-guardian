const fs = require('fs');
const { execSync } = require('child_process');

// Leer archivo actual
let current = fs.readFileSync('src/app/page.tsx', 'utf8');

// Obtener versión buena del commit
let good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

// Encontrar el inicio del return en la versión buena
const returnIndex = good.indexOf('  return (');
if (returnIndex === -1) {
  console.log('No se encontró return en la versión buena');
  process.exit(1);
}

// En la versión actual, encontrar dónde termina la lógica (antes del primer 'use client' duplicado)
const duplicateIndex = current.indexOf("\n'use client'\nimport Link");
if (duplicateIndex === -1) {
  console.log('No se encontró el bloque duplicado');
  process.exit(1);
}

// Unir lógica actual (hasta antes del duplicado) + JSX de la versión buena
const fixed = current.substring(0, duplicateIndex) + good.substring(returnIndex);
fs.writeFileSync('src/app/page.tsx', fixed);
console.log('✅ Archivo reconstruido correctamente.');
