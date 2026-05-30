const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Eliminar TODO el bloque de seguridad actual (desde <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> hasta su cierre </div>)
code = code.replace(
  /<div className="grid grid-cols-1 md:grid-cols-3 gap-6">\s*\{\[\s*\{ title: 'Infraestructura'[\s\S]*?\]\s*\.map\s*\([\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  ''
);

// Insertar el bloque correcto justo después del <h2> de seguridad
const seguridadCorrecta = `
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Infraestructura', desc: 'Servidores en Europa con cifrado AES-256. Cumplimos con el RGPD. Cifrado en tránsito (TLS 1.3) y en reposo (AES-256). Infraestructura en AWS/Vercel EU.' },
              { title: 'Datos de clientes', desc: 'Tus clientes solo reciben notificaciones. No necesitas su email, basta con LinkedIn o teléfono.' },
              { title: 'Si CFG desaparece', desc: 'Tus datos son tuyos. Siempre. Exporta todo en 1 clic, sin candados.' },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><h3 className="font-bold mb-2">{item.title}</h3><p className="text-sm text-zinc-400">{item.desc}</p></div>
            ))}
          </div>`;

code = code.replace(
  /(<h2 className="text-3xl md:text-4xl font-bold mb-6">Tus datos están <span className="text-emerald-400">seguros<\/span><\/h2>)/,
  `$1\n${seguridadCorrecta}`
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Sección de seguridad reparada por completo.');
