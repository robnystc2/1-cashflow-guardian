const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Headline
code = code.replace(
  'El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero.',
  'En 14 días cobras o te pagamos 3 meses. Garantizado.'
);

// Subtítulo
code = code.replace(
  'Con CFG, tus clientes pagan antes de que tengas que pedir nada. El 94% paga en menos de 7 días. Y si no, te devolvemos 3 meses de suscripción.',
  '94% de facturas cobradas en menos de 14 días. Verificado en 848 casos reales.'
);

// Pre-headline
code = code.replace(
  '47.200€ recuperados para diseñadores',
  'Nuestros freelancers perdían 1.847€ de media antes de usar CFG.'
);

// CTAs genéricos
code = code.replace(/Probar 14 días gratis →/g, 'Empezar gratis →');

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Cambios de copy aplicados.');
