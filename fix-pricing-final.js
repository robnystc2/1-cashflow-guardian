const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Buscar el inicio de la sección FAQ
const faqRegex = /\{\/\* FAQ \*\/\}/;
if (!faqRegex.test(code)) {
  console.log('No se encontró la sección FAQ. Buscando SEGURIDAD Y PRIVACIDAD...');
  // Intentar insertar después de seguridad
  const seguridadRegex = /(\s*\{\/\* SEGURIDAD Y PRIVACIDAD \*\/\}[\s\S]*?<\/section>)/;
  if (seguridadRegex.test(code)) {
    code = code.replace(seguridadRegex, `$1\n${pricingSection}`);
    console.log('Insertado después de Seguridad y Privacidad.');
  } else {
    console.log('ERROR: No se encontró ningún punto de inserción.');
    process.exit(1);
  }
} else {
  code = code.replace(faqRegex, `${pricingSection}\n$&`);
  console.log('Insertado antes de FAQ.');
}

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Sección de precios insertada correctamente.');
