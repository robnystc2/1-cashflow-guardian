const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

function safeReplace(orig, repl, desc) {
  if (code.includes(orig)) {
    code = code.replaceAll(orig, repl);
    console.log('✅ ' + desc);
    changes++;
  } else {
    console.log('⏭️  ' + desc + ' (no encontrado o ya aplicado)');
  }
}

console.log('🔥 Aplicando últimos cambios de copy de la auditoría...\n');

// 26. Pre-headline con datos propios
safeReplace(
  'Los diseñadores pierden 1.847€/año en impagos.',
  'Nuestros freelancers perdían 1.847€ de media antes de usar CFG.',
  'Pre-headline hero'
);

// 27. Headline con garantía primero
safeReplace(
  'El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero.',
  'En 14 días cobras o te pagamos 3 meses. Garantizado.',
  'Headline hero'
);

// 28. Subhero sin paréntesis ni coletilla
safeReplace(
  '94% de facturas cobradas en menos de 14 días. Verificado en 848 casos reales. Si no cobras, te devolvemos 3 meses de suscripción.',
  '94% de facturas cobradas en menos de 14 días. Verificado en 848 casos reales.',
  'Subhero limpio'
);

// 34. Fundador: añadir cierre circular
safeReplace(
  'Así que construí CFG. Y desde entonces, 847 freelancers no han vuelto a perseguir una factura.',
  'Así que construí CFG. Y desde entonces, 847 freelancers no han vuelto a perseguir una factura. Ninguno.',
  'Cierre fundador'
);

// 45. Paso 2 de la garantía: cambiar "El cliente acepta los hitos (1 clic)" por algo menos dependiente del cliente
safeReplace(
  'El cliente acepta los hitos (1 clic)',
  'El cliente recibe notificación del proyecto y los términos de entrega',
  'Paso 2 garantía'
);

// 46. Cambiar "en efectivo" por "transferencia bancaria" si aparece en la landing (ya está en la de garantía, verificar)
safeReplace(
  'en efectivo, en 48 horas',
  'por transferencia bancaria en 48h',
  'Efectivo → transferencia'
);

// 126. Añadir ángulo de crecimiento en el hero (debajo del subtítulo, si encontramos el lugar)
const growthLine = '<p className="text-xs text-emerald-400 mt-2 max-w-xl mx-auto lg:mx-0">Los freelancers de CFG suben sus precios un 40% en promedio.</p>';
if (!code.includes('Los freelancers de CFG suben sus precios')) {
  code = code.replace(
    '</h1>',
    '</h1>' + growthLine
  );
  console.log('✅ Ángulo de crecimiento añadido en hero');
  changes++;
}

// 130. Cita LatAm en la sección de garantía o features
const latamLine = '<p className="text-xs text-zinc-500 mt-4 text-center">Desde México hasta Argentina, el impago freelance es el mismo problema. El Escudo Legal se adapta a cada jurisdicción.</p>';
if (!code.includes('Desde México hasta Argentina')) {
  code = code.replace(
    '<!-- FEATURES EXCLUSIVAS -->',
    latamLine + '\n          <!-- FEATURES EXCLUSIVAS -->'
  );
  console.log('✅ Cita LatAm añadida');
  changes++;
}

// 66. ROI text en precios (si no se añadió antes)
const roiPricing = '💡 Un solo impago recuperado paga 7 años de CFG Pro. Matemática obvia.';
if (!code.includes(roiPricing)) {
  code = code.replace(
    'Todos los planes incluyen la Garantía Blindaje Total.',
    'Todos los planes incluyen la Garantía Blindaje Total.\n          <p className="text-sm text-zinc-400 max-w-2xl mx-auto mb-4">' + roiPricing + '</p>'
  );
  console.log('✅ ROI text en precios añadido');
  changes++;
}

// 19. Texto de la barra de garantía (por si no se aplicó)
safeReplace(
  'Solo 51 de 849 suscripciones activas han necesitado la garantía. El 94% nunca la activa.',
  'Solo 6 de cada 100 freelancers necesitan activarla.',
  'Texto garantía'
);

// 22. Soporte 24/7
safeReplace(
  'Soporte en español nativo 24/7',
  'Soporte prioritario en español < 4h',
  'Soporte 24/7'
);

// 24. Unificar números inconsistentes
safeReplace('848 casos gestionados', '847 casos gestionados', 'Casos 848→847');

// 25. Texto de "¿No está tu profesión?"
safeReplace('Yo también existo →', 'CFG te protege también →', 'CTA otra profesión');

// 4. Cambiar "Seguro de impago opcional" (si todavía aparece)
safeReplace(
  'Seguro de impago opcional: Para proyectos +5.000€. Cobertura total pagando solo el 2-3%.',
  'Garantía interna CFG para proyectos +5.000€.',
  'Seguro de impago'
);

// 5. Contratos por abogado
safeReplace(
  'Contratos personalizados por abogado',
  'Contratos con plantillas revisadas por abogado',
  'Contratos abogado'
);

// 6. Eliminar "Empresa verificada"
safeReplace('Empresa verificada', '', 'Empresa verificada footer');

// 14. Eliminar "¿Eres estudiante?"
safeReplace('¿Eres estudiante? Pide tu descuento →', '', 'Descuento estudiante');

// 15. Eliminar urgencia falsa
safeReplace('Plazas limitadas a 29€/mes. Después subirá.', '', 'Urgencia falsa plazas');

// 61. Toggle Anual por defecto (verificar)
if (code.includes("useState<'monthly' | 'annual'>('annual')")) {
  console.log('✅ Toggle Anual ya está por defecto');
} else if (code.includes("useState<'monthly' | 'annual'>('monthly')")) {
  code = code.replace("useState<'monthly' | 'annual'>('monthly')", "useState<'monthly' | 'annual'>('annual')");
  console.log('✅ Toggle cambiado a Anual por defecto');
  changes++;
}

fs.writeFileSync('src/app/page.tsx', code);
console.log('\n🎉 ' + changes + ' cambios adicionales aplicados.');
