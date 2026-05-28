const fs = require('fs');
const { execSync } = require('child_process');
let current = fs.readFileSync('src/app/page.tsx', 'utf8');
let good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

const startMarker = 'const comparisonRows = [';
const endMarker = '{/* FEATURES EXCLUSIVAS */}';

let currentStart = current.indexOf(startMarker);
let currentEnd = current.indexOf(endMarker);
let goodStart = good.indexOf(startMarker);
let goodEnd = good.indexOf(endMarker);

if (currentStart === -1 || currentEnd === -1 || goodStart === -1 || goodEnd === -1) {
    console.log('No se encontraron los marcadores');
    process.exit(1);
}

let fixed = current.substring(0, currentStart) + good.substring(goodStart, goodEnd) + current.substring(currentEnd);
fs.writeFileSync('src/app/page.tsx', fixed);
console.log('✅ Bloque reparado con versión estable');
