const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');
const lines = code.split('\n');
const filtered = lines.filter(line => !line.includes('TODO: Reemplazar por foto real'));
fs.writeFileSync('src/app/page.tsx', filtered.join('\n'));
console.log('✅ Línea eliminada definitivamente.');
