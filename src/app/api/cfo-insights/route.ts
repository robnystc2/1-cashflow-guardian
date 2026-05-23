// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const thirtyDaysAhead = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()

  // 1. Ingresos esperados (facturas pendientes que vencen en los próximos 30 días)
  const { data: pendingInvoices } = await supabase
    .from('invoices')
    .select('subtotal, due_date')
    .eq('user_id', user.id)
    .not('status', 'eq', 'paid')
    .lte('due_date', thirtyDaysAhead)
  
  const expectedIncome = pendingInvoices?.reduce((sum: number, inv: any) => sum + Number(inv.subtotal), 0) || 0

  // 2. Gastos recientes (promedio mensual)
  const { data: recentExpenses } = await supabase
    .from('expenses')
    .select('amount')
    .eq('user_id', user.id)
    .gte('created_at', thirtyDaysAgo)

  const totalExpenses = recentExpenses?.reduce((sum: number, exp: any) => sum + Number(exp.amount), 0) || 0
  const projectedExpenses = totalExpenses * 1.05 // Asumimos un ligero incremento del 5%

  // 3. PayScore de clientes
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)

  const clientScores = await Promise.all((clients || []).map(async (client) => {
    const { data: clientInvoices } = await supabase
      .from('invoices')
      .select('status, issued_date, paid_date, due_date')
      .eq('client_id', client.id)
    
    const paidInvs = clientInvoices?.filter(inv => inv.status === 'paid') || []
    const avgPaymentDays = paidInvs.length > 0 
      ? paidInvs.reduce((sum, inv) => {
          const paid = new Date(inv.paid_date!)
          const due = new Date(inv.due_date)
          return sum + (paid.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
        }, 0) / paidInvs.length
      : 0

    let score = 'gold' // oro
    if (avgPaymentDays > 15) score = 'bronze'
    else if (avgPaymentDays > 7) score = 'silver'
    else if (avgPaymentDays < -5) score = 'gold_plus' // paga antes

    return { ...client, score, avgPaymentDays: Math.round(avgPaymentDays) }
  }))

  // 4. Frase de Cassandra
  let status = 'green'
  let phrase = 'Tus finanzas están estables. Sigue así.'
  const balance = expectedIncome - projectedExpenses
  
  if (balance < 0) {
    status = 'red'
    phrase = `Alerta: Con tus gastos actuales, tendrás un déficit de €${Math.abs(balance).toFixed(2)} en 30 días. Considera facturar a clientes con pagos pendientes.`
  } else if (expectedIncome < projectedExpenses * 1.2) {
    status = 'yellow'
    phrase = `Precaución: Tu flujo de caja está justo. Revisa los gastos o acelera los pagos.`
  }

  return NextResponse.json({
    expectedIncome,
    projectedExpenses,
    balance,
    status,
    phrase,
    clientScores,
  })
}
