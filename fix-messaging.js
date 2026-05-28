const fs = require('fs');
const { execSync } = require('child_process');

let current = fs.readFileSync('src/app/page.tsx', 'utf8');
let good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

// Encontrar la sección de recordatorios: desde "El sistema que cobra por ti" hasta "Lo que nunca más tendrás que hacer"
const startMarker = 'El sistema que cobra por ti';
const endMarker = 'Lo que nunca más tendrás que hacer';

let currentStart = current.indexOf(startMarker);
let currentEnd = current.indexOf(endMarker);
let goodStart = good.indexOf(startMarker);
let goodEnd = good.indexOf(endMarker);

if (currentStart === -1 || currentEnd === -1 || goodStart === -1 || goodEnd === -1) {
    console.log('No se encontraron los marcadores');
    process.exit(1);
}

// Reemplazar la sección completa en el archivo actual con la versión buena
let fixed = current.substring(0, currentStart) + good.substring(goodStart, goodEnd) + current.substring(currentEnd);
fs.writeFileSync('src/app/page.tsx', fixed);
console.log('✅ Sección de recordatorios restaurada');
