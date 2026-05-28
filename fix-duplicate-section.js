const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Buscar la sección duplicada: empieza con <section className="py-12..."> justo después de un cierre de sección anterior y antes de CÓMO FUNCIONA
const marker = '<section id="como-funciona"';

// Encontrar la posición de CÓMO FUNCIONA
const comoFuncionaIndex = code.indexOf(marker);
if (comoFuncionaIndex === -1) {
    console.log('No se encontró CÓMO FUNCIONA');
    process.exit(1);
}

// Buscar hacia atrás desde CÓMO FUNCIONA para encontrar el cierre de la sección anterior correcta (la primera sección del mercado)
// Sabemos que hay dos secciones seguidas. La primera es correcta (tiene título h2). La segunda es la duplicada (sin título).
// Vamos a eliminar todo desde el inicio de la segunda sección <section className="py-12..."> hasta justo antes de CÓMO FUNCIONA.

// Buscar la última ocurrencia de <section className="py-12 px-4 bg-zinc-950"> antes de CÓMO FUNCIONA
const sectionStart = code.lastIndexOf('<section className="py-12 px-4 bg-zinc-950">', comoFuncionaIndex);
if (sectionStart === -1) {
    console.log('No se encontró la sección duplicada');
    process.exit(1);
}

// Verificar que es la sección duplicada: si justo después no hay un <h2> con "El mercado freelance está roto", es la duplicada
const afterSection = code.substring(sectionStart, sectionStart + 200);
if (!afterSection.includes('El mercado freelance está roto')) {
    // Es la duplicada, eliminarla
    // Buscar el cierre </section> de esa sección duplicada (está antes del <section id="como-funciona")
    const sectionEnd = code.indexOf('</section>', sectionStart);
    if (sectionEnd !== -1 && sectionEnd < comoFuncionaIndex) {
        code = code.substring(0, sectionStart) + code.substring(sectionEnd + 10);
        fs.writeFileSync('src/app/page.tsx', code);
        console.log('✅ Sección duplicada eliminada correctamente');
    } else {
        console.log('No se pudo encontrar el cierre de la sección duplicada');
    }
} else {
    console.log('La sección encontrada es la original, no se elimina');
}
