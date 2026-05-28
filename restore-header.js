const fs = require('fs');
const { execSync } = require('child_process');

// Leer archivo actual
const current = fs.readFileSync('src/app/page.tsx', 'utf8');

// Obtener la versión buena del commit estable
const good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

// Encontrar el marcador "const faqItems = [" en ambos archivos
const marker = 'const faqItems = [';
const goodHeaderEnd = good.indexOf(marker);
const currentBodyStart = current.indexOf(marker);

if (goodHeaderEnd === -1 || currentBodyStart === -1) {
    console.log('❌ No se encontró el marcador en alguno de los archivos');
    process.exit(1);
}

// Extraer la cabecera buena (todo antes del marcador)
const goodHeader = good.substring(0, goodHeaderEnd);

// Extraer el cuerpo actual (desde el marcador hasta el final)
const currentBody = current.substring(currentBodyStart);

// Unir cabecera buena + cuerpo actual
const fixed = goodHeader + currentBody;

// Sobrescribir el archivo
fs.writeFileSync('src/app/page.tsx', fixed);
console.log('✅ Cabecera restaurada. El archivo ahora debería compilar.');
