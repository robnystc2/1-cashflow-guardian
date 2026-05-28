const fs = require('fs');
const { execSync } = require('child_process');

let current = fs.readFileSync('src/app/page.tsx', 'utf8');
let good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

// Usar marcadores más confiables: "Día 7: Legal" y "Lo que dicen los freelancers"
const startMarker = 'Día 7: Legal';
const endMarker = 'Lo que dicen los freelancers';

let currentStart = current.indexOf(startMarker);
let currentEnd = current.indexOf(endMarker);
let goodStart = good.indexOf(startMarker);
let goodEnd = good.indexOf(endMarker);

if (currentStart === -1 || currentEnd === -1 || goodStart === -1 || goodEnd === -1) {
    console.log('Buscando marcadores alternativos...');
    // Intentar con otros marcadores
    const altStart = 'Tres mensajes. Cero esfuerzo.';
    const altEnd = 'Lo que nunca más';
    let cStart = current.indexOf(altStart);
    let cEnd = current.indexOf(altEnd);
    let gStart = good.indexOf(altStart);
    let gEnd = good.indexOf(altEnd);
    
    if (cStart === -1 || cEnd === -1 || gStart === -1 || gEnd === -1) {
        console.log('No se encontraron marcadores. Abortando.');
        process.exit(1);
    }
    
    let fixed = current.substring(0, cStart) + good.substring(gStart, gEnd) + current.substring(cEnd);
    fs.writeFileSync('src/app/page.tsx', fixed);
    console.log('✅ Sección restaurada con marcadores alternativos');
} else {
    let fixed = current.substring(0, currentStart) + good.substring(goodStart, goodEnd) + current.substring(currentEnd);
    fs.writeFileSync('src/app/page.tsx', fixed);
    console.log('✅ Sección de recordatorios y testimonios restaurada');
}
