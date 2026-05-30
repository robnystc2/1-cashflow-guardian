const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Reemplazar desde el inicio de la sección de seguridad hasta justo antes de {/* MODAL */}
const bloqueRoto = /(\s*\{\/\* SEGURIDAD Y PRIVACIDAD \*\/\}[\s\S]*?)<footer className="py-16 border-t border-zinc-700\/50 bg-\[#0a0a0a\]">/;
const bloqueArreglado = `
        {/* SEGURIDAD Y PRIVACIDAD */}
        <section className="py-16 px-4 bg-zinc-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tus datos están <span className="text-emerald-400">seguros</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Infraestructura', desc: 'Servidores en Europa con cifrado AES-256. Cumplimos con el RGPD. Cifrado en tránsito (TLS 1.3) y en reposo (AES-256). Infraestructura en AWS/Vercel EU.' },
                { title: 'Datos de clientes', desc: 'Tus clientes solo reciben notificaciones. No necesitas su email, basta con LinkedIn o teléfono.' },
                { title: 'Si CFG desaparece', desc: 'Tus datos son tuyos. Siempre. Exporta todo en 1 clic, sin candados.' },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><h3 className="font-bold mb-2">{item.title}</h3><p className="text-sm text-zinc-400">{item.desc}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 border-t border-zinc-700/50 bg-[#0a0a0a]">`;

code = code.replace(bloqueRoto, bloqueArreglado);

// Eliminar el </footer> extra que pueda haber quedado
code = code.replace(/<\/footer>\s*<\/footer>/g, '</footer>');

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Footer y seguridad reparados.');
