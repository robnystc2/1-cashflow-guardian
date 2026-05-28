const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Reemplazar la cadena exacta que causa el error
code = code.replace('];use client\'', '];\n\n\'use client\'');

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ \'use client\' separado correctamente.');
