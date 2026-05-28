const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

function safeReplace(orig, repl, desc) {
  if (page.includes(orig)) {
    page = page.replaceAll(orig, repl);
    console.log('✅ ' + desc);
    changes++;
  } else {
    console.log('⏭️  ' + desc + ' (no encontrado)');
  }
}

console.log('🔥 Aplicando últimos ajustes de copy...\n');

// 32. Añadir "Garantía Blindaje Total incluida" en el trust strip debajo del CTA del hero
safeReplace(
  '✓ Cancela cuando quieras',
  '✓ Cancela cuando quieras · Garantía Blindaje Total incluida',
  'Garantía en trust strip'
);

// 33. Eliminar o cambiar "Últimas 24h: 847 freelancers activaron su blindaje · 124.000€ recuperados"
// No se ve en la versión actual, verificar si existe
if (page.includes('Últimas 24h')) {
  page = page.replace(/Últimas 24h: \d+ freelancers activaron su blindaje · [\d.]+€ recuperados/g, '');
  console.log('✅ Texto "Últimas 24h" eliminado');
  changes++;
} else {
  console.log('⏭️  Texto "Últimas 24h" no encontrado');
}

// 7. Añadir disclaimer en la barra de estado (si existe)
if (page.includes('freelancers protegidos hoy')) {
  page = page.replace(
    'freelancers protegidos hoy',
    'freelancers protegidos'
  );
  page = page.replace(
    '€ recuperados esta semana',
    '€ recuperados esta semana (datos actualizados diariamente)'
  );
  console.log('✅ Disclaimer en barra de estado añadido');
  changes++;
}

// 8. Eliminar "Usado por freelancers de: Domestika · LinkedIn · Malt · Workana..." si existe
if (page.includes('Domestika · LinkedIn · Malt')) {
  page = page.replace(/Usado por freelancers de: Domestika · LinkedIn · Malt · Workana · Product Hunt · G2/g, '');
  console.log('✅ "Usado por freelancers de..." eliminado');
  changes++;
}

// 12. Eliminar "Construido con cada euro recuperado de mis propios impagos" si existe
safeReplace('Construido con cada euro recuperado de mis propios impagos.', '', 'Frase caption eliminada');

// 16. Ajustar el texto del chatbot (ya está "Blindar mi próximo proyecto →", verificar)
if (page.includes('Blindar mi próximo proyecto →')) {
  console.log('✅ Chatbot texto ya está bien');
} else {
  safeReplace('¿Alguna vez un cliente te dejó sin pagar?', 'Blindar mi próximo proyecto →', 'Chatbot texto');
}

// 18. Eliminar "Compartir mi PayScore en LinkedIn →" si existe en la landing
safeReplace('Compartir mi PayScore en LinkedIn →', '', 'PayScore LinkedIn');

// 57. Añadir más pasos a la secuencia de mensajes (Día 1 y Día 14)
if (page.includes('Día 7: Legal') && !page.includes('Día 1: Confirmación')) {
  const dia1 = `
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
              <span className="text-2xl">📬</span>
              <h3 className="font-bold mt-2 mb-2">Día 1: Confirmación</h3>
              <p className="text-xs text-zinc-400 italic">"María, hemos recibido la confirmación de entrega del proyecto Branding. La factura de 500€ tiene vencimiento en 7 días. Puedes pagarla aquí: [botón de pago]."</p>
            </div>`;
  const dia14 = `
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
              <span className="text-2xl">🛡️</span>
              <h3 className="font-bold mt-2 mb-2">Día 14: Garantía</h3>
              <p className="text-xs text-zinc-400 italic">"María, han pasado 14 días desde la notificación legal. Se ha activado la Garantía Blindaje Total. El freelancer recibirá 3 meses de suscripción gratuitos."</p>
            </div>`;
  page = page.replace(
    '<div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">\n              <span className="text-2xl">😊</span>',
    dia1 + '\n' + '            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">\n              <span className="text-2xl">😊</span>'
  );
  page = page.replace(
    '</section>\n\n      {/* NUNCA MÁS */}',
    dia14 + '\n            </div>\n          </div>\n        </div>\n      </section>\n\n      {/* NUNCA MÁS */}'
  );
  console.log('✅ Secuencia de mensajes ampliada (5 pasos)');
  changes++;
}

// 59. Añadir texto a los botones de filtro de testimonios (ya están, verificar)
if (page.includes('Menos de 500€') && page.includes('500€ - 2.000€')) {
  console.log('✅ Filtros de testimonios ya presentes');
}

// 60. Cambiar "Ver más testimonios" para que apunte a /casos
safeReplace('🔍 Ver más testimonios →', '🔍 Ver todos los casos de éxito →', 'Link testimonios');

// 30. Asegurar que el link del video placeholder no lleva a ningún lado roto
safeReplace('Mira cómo funciona en 90 segundos', 'Mira cómo funciona en 90 segundos (próximamente)', 'Video placeholder');

// 156. Añadir enlace a la calculadora de ROI desde la página de precios
if (!page.includes('calculadora">Calcula tu ROI')) {
  page = page.replace(
    'Todos los precios en euros (€). Sin costes ocultos. Sin permanencia. Sin sorpresas.',
    'Todos los precios en euros (€). Sin costes ocultos. Sin permanencia. Sin sorpresas.\n          <p className="text-xs text-zinc-400 mt-2">💡 <a href="#calculadora" className="text-emerald-400 hover:text-emerald-300">Calcula tu ROI personalizado →</a></p>'
  );
  console.log('✅ Enlace a calculadora ROI en precios');
  changes++;
}

fs.writeFileSync('src/app/page.tsx', page);
console.log('\n🎉 ' + changes + ' cambios finales aplicados.');
