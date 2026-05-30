const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Eliminar cualquier resto roto de footer
code = code.replace(/<footer[\s\S]*?<\/footer>/g, '');

// 2. Construir el footer completo
const footerCompleto = `
      <footer className="py-16 border-t border-zinc-700/50 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-extrabold text-sm"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg></div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
              <p className="text-zinc-400 text-xs">Construido por un freelancer, actualizado cada semana. Mira nuestro changelog público.</p>
              <p className="text-zinc-500 text-xs mt-1">© 2026 CFG · Tenerife, Spain · Actualizado: 23/05/2026</p>
              <p className="text-zinc-500 text-xs mt-1">CFG SL · Tenerife, España</p>
              <p className="text-zinc-500 text-xs mt-1">hola@cashflowguardian.com</p>
              <div className="flex gap-3 mt-2 text-zinc-400 text-sm">
                <a href="https://instagram.com/cashflowguardian" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Instagram</a>
                <a href="https://linkedin.com/company/cashflowguardian" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">LinkedIn</a>
                <a href="https://twitter.com/cashflowguard" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Twitter</a>
                <a href="https://tiktok.com/@cashflowguardian" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">TikTok</a>
              </div>
            </div>
            <div><h4 className="font-bold mb-3 text-zinc-200">Producto</h4><div className="space-y-2 text-zinc-400"><a href="#como-funciona" className="block hover:text-white">Cómo funciona</a><a href="#garantia" className="block hover:text-white">Garantía</a><a href="#precios" className="block hover:text-white">Precios</a><Link href="/login" className="block hover:text-white">Iniciar sesión</Link></div></div>
            <div><h4 className="font-bold mb-3 text-zinc-200">Recursos</h4><div className="space-y-2 text-zinc-400"><Link href="/blog" className="block hover:text-white">Blog</Link><Link href="/casos" className="block hover:text-white">Casos de éxito</Link><Link href="/afiliados" className="block hover:text-white">Afiliados</Link><Link href="/badge" className="block hover:text-white">Badge CFG</Link><Link href="/changelog" className="block hover:text-white">Changelog</Link><Link href="/herramientas" className="block hover:text-white">Herramientas</Link></div></div>
            <div><h4 className="font-bold mb-3 text-zinc-200">Comparativas</h4><div className="space-y-2 text-zinc-400">
              <Link href="/vs-bonsai" className="block hover:text-white">CFG vs Bonsai</Link><Link href="/vs-honeybook" className="block hover:text-white">CFG vs Honeybook</Link><Link href="/vs-moxie" className="block hover:text-white">CFG vs Moxie</Link><Link href="/vs-dubsado" className="block hover:text-white">CFG vs Dubsado</Link><Link href="/vs-freshbooks" className="block hover:text-white">CFG vs Freshbooks</Link><Link href="/vs-quickbooks-self-employed" className="block hover:text-white">CFG vs Quickbooks Self-Employed</Link><Link href="/vs-wave" className="block hover:text-white">CFG vs Wave</Link><Link href="/vs-zoho-invoice" className="block hover:text-white">CFG vs Zoho Invoice</Link><Link href="/vs-invoice-ninja" className="block hover:text-white">CFG vs Invoice Ninja</Link><Link href="/cfg-holded" className="block hover:text-white">CFG vs Holded</Link><Link href="/vs-copilot" className="block hover:text-white">CFG vs Copilot</Link><Link href="/vs-andco" className="block hover:text-white">CFG vs And.Co</Link><Link href="/vs-factorial" className="block hover:text-white">CFG vs Factorial</Link><Link href="/vs-upwork" className="block hover:text-white">CFG vs Upwork</Link>
            </div></div>
            <div><h4 className="font-bold mb-3 text-zinc-200">Legal</h4><div className="space-y-2 text-zinc-400"><Link href="/support" className="block hover:text-white">Soporte</Link><Link href="/privacy" className="block hover:text-white">Privacidad</Link><Link href="/terms" className="block hover:text-white">Términos</Link><Link href="/cookies" className="block hover:text-white">Cookies</Link><Link href="/changelog" className="block hover:text-white">Changelog</Link></div></div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-zinc-700/50">
          <div className="text-center">
            <p className="text-sm text-zinc-300 font-bold mb-2">📩 La guía gratuita: Los 7 contratos que todo freelancer debe usar (valorados en 199€)</p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input type="email" placeholder="tu@email.com" className="flex-1 bg-zinc-800 border border-zinc-700/50 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
              <button type="button" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-4 py-2 rounded-full transition-all whitespace-nowrap">Descargar gratis</button>
            </div>
            <p className="text-xs text-zinc-400 font-medium mt-2">También recibirás nuestra newsletter mensual con tips de cobro.</p>
          </div>
        </div>
      </footer>`;

// 3. Insertar el footer completo justo antes del cierre del main
code = code.replace(
  /(\s*<\/main>)/,
  `${footerCompleto}\n$1`
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Footer completo restaurado con las 5 columnas, guía de contratos y separaciones.');
