export default function Glosario() {
  const terminos = [
    { term: 'Contrato de hitos', def: 'Acuerdo donde el proyecto se divide en fases y el pago se libera al completar cada una.' },
    { term: 'PayScore', def: 'Puntuación de 0-100 que indica la fiabilidad de pago de un cliente, basada en historial real.' },
    { term: 'Escudo Legal', def: 'Sistema automatizado de envío de cartas legales cuando un cliente no paga.' },
    { term: 'Impago', def: 'Falta de pago de una factura dentro del plazo acordado.' },
    { term: 'Proceso monitorio', def: 'Procedimiento judicial rápido para reclamar deudas de hasta 250.000€ en España.' },
    { term: 'Intereses de demora', def: 'Intereses que el deudor debe pagar por el retraso, según la Ley 3/2004.' },
    { term: 'Blindaje', def: 'Protección total que ofrece CFG para garantizar el cobro de tus proyectos.' },
    { term: 'Hito', def: 'Fase o entregable de un proyecto que debe ser completado y aprobado.' },
  ];
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Glosario freelance</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {terminos.map((t, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
              <h3 className="font-bold text-emerald-400">{t.term}</h3>
              <p className="text-sm text-zinc-300 mt-1">{t.def}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}