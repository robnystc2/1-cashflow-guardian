const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const pricingSection = `
      {/* PRECIOS */}
      <section id="precios" className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Elige tu <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">blindaje</span></h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Todos los planes incluyen la <strong className="text-white">Garantía Blindaje Total</strong>. Sin permanencia. Sin sorpresas.</p>
            <div className="flex justify-center gap-4 mt-4 text-xs text-zinc-500 font-medium">
              <span>🛡️ RGPD Compliant</span>
              <span>🌍 47 países</span>
              <span>⚡ Activo en 3 minutos</span>
            </div>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-700/50 rounded-full p-1">
              <button onClick={() => setBillingCycle('monthly')} className={\`px-6 py-2.5 rounded-full text-sm font-semibold transition-all \${billingCycle === 'monthly' ? 'bg-white text-black shadow-lg' : 'text-zinc-300 hover:text-white'}\`}>Mensual</button>
              <button onClick={() => setBillingCycle('annual')} className={\`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 \${billingCycle === 'annual' ? 'bg-white text-black shadow-lg' : 'text-zinc-300 hover:text-white'}\`}>Anual <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Ahorra 2 meses</span></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl p-8 flex flex-col hover:border-zinc-600 transition-all">
              <h3 className="text-2xl font-bold mb-1">CFG Free</h3>
              <p className="text-sm text-zinc-400 mb-6">Para siempre gratis.</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">0€</span>
                <span className="text-xl text-zinc-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> 1 proyecto activo</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Recordatorios básicos</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Badge CFG visible</li>
              </ul>
              <Link href="/register" className="block text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-full transition-all">Empezar gratis</Link>
            </div>

            <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl p-8 flex flex-col hover:border-zinc-600 transition-all">
              <h3 className="text-2xl font-bold mb-1">CFG Escudo</h3>
              <p className="text-sm text-zinc-400 mb-6">Protege hasta 19 facturas al mes.</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">9€</span>
                <span className="text-xl text-zinc-400">/mes</span>
                <p className="text-xs text-zinc-500 mt-1">30 céntimos/día</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> 19 facturas/mes</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Bloqueo de hitos</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> 10 clientes</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Recordatorios email</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> PayScore básico</li>
              </ul>
              <Link href="/register" className="block text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-full transition-all">Empezar con Escudo</Link>
            </div>

            <div className="bg-zinc-900 border-2 border-emerald-500 rounded-2xl p-8 flex flex-col relative scale-105 shadow-2xl shadow-emerald-500/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-sm font-extrabold px-5 py-1.5 rounded-full">🏆 Más popular</div>
              <h3 className="text-2xl font-bold mb-1 mt-2">CFG Blindaje Pro</h3>
              <p className="text-sm text-zinc-400 mb-6">Para no volver a perseguir una factura.</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-emerald-400">{prices.pro}€</span>
                <span className="text-xl text-zinc-400">/{billingCycle === 'annual' ? 'año' : 'mes'}</span>
                {billingCycle === 'annual' && <p className="text-sm text-emerald-400 mt-1">Menos de 1€ al día</p>}
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Facturas ilimitadas</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Bloqueo automático de hitos</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Recordatorios escalados</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Escudo Legal en 40+ países</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> PayScore y Cassandra IA</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Portal del cliente</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Contratos digitales</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Soporte 4h</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3.5 px-6 rounded-full transition-all shadow-lg shadow-emerald-500/20">Activar mi blindaje</Link>
              <p className="text-xs text-zinc-400 mt-3 text-center">14 días gratis · Sin tarjeta</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl p-8 flex flex-col hover:border-zinc-600 transition-all">
              <h3 className="text-2xl font-bold mb-1">CFG Agency</h3>
              <p className="text-sm text-zinc-400 mb-6">Para freelancers que facturan +5.000€/mes.</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">{prices.total}€</span>
                <span className="text-xl text-zinc-400">/{billingCycle === 'annual' ? 'año' : 'mes'}</span>
                {billingCycle === 'annual' && <p className="text-sm text-zinc-400 mt-1">Menos de 2€/día</p>}
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Todo lo de Blindaje Pro</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Cassandra IA Avanzada</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Contratos revisados por abogado</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Dashboards avanzados</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> White-label</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Onboarding 1-a-1</li>
                <li className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> Soporte prioritario 1h</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-full transition-all">Hablar con el equipo</Link>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-500 mt-10">Todos los precios en euros (€). Sin costes ocultos. Sin permanencia. Cancelas cuando quieras.</p>
        </div>
      </section>`;

// Insertar después de la sección de seguridad
code = code.replace(
  /(\s*\{\/\* FAQ \*\/\})/,
  `${pricingSection}\n$1`
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Sección de precios restaurada con las 4 columnas.');
