const fs = require('fs');
const { execSync } = require('child_process');

let good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

// Extraer la cabecera (todo antes de 'const comparisonRows = [')
const headerEnd = good.indexOf('const comparisonRows = [');
const header = good.substring(0, headerEnd);

// Extraer el JSX (todo después de '];' de comparisonRows)
const comparisonEnd = good.indexOf('];', headerEnd) + 2;
const afterComparison = good.substring(comparisonEnd);

// Leer el archivo actual (solo contiene el nuevo comparisonRows)
let currentComparison = fs.readFileSync('src/app/page.tsx', 'utf8');

// Reconstruir: cabecera + nuevo comparisonRows + JSX
const repaired = header + currentComparison + afterComparison;

fs.writeFileSync('src/app/page.tsx', repaired);
console.log('✅ Archivo reparado con el nuevo comparisonRows.');
