import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { invoiceId } = await request.json()
  if (!invoiceId) return NextResponse.json({ error: 'Falta invoiceId' }, { status: 400 })

  // Obtener datos de la factura, cliente y perfil del freelancer
  const { data: invoice } = await supabase.from('invoices').select('*, client:clients(*), profile:profiles!invoices_user_id_fkey(jurisdiction)').eq('id', invoiceId).single()
  if (!invoice) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })

  const client = invoice.client
  const jurisdiction = invoice.profile?.jurisdiction || 'ES'
  const invoiceNumber = invoice.invoice_number
  const amount = invoice.total || invoice.subtotal
  const dueDate = invoice.due_date
  const clientName = client?.name || 'cliente'
  const clientEmail = client?.email || ''

  // Generar documento legal según jurisdicción (simplificado, adaptable)
  const today = new Date().toISOString().split('T')[0]
  let documentText = ''
  let subject = ''

  if (jurisdiction === 'ES') {
    subject = `Reclamación extrajudicial de deuda - Factura ${invoiceNumber}`
    documentText = `ASUNTO: RECLAMACIÓN EXTRAJUDICIAL DE DEUDA

Muy Sr./Sra. ${clientName}:

Por medio de la presente, le requiero formalmente el pago de la factura ${invoiceNumber} emitida el ${dueDate} por un importe total de ${amount} €, la cual se encuentra impagada a fecha de hoy, ${today}.

Le concedemos un plazo improrrogable de SIETE DÍAS HÁBILES para proceder al pago. En caso contrario, nos reservamos el derecho de iniciar las acciones legales oportunas, incluida la reclamación judicial de la deuda y los intereses de demora correspondientes, de conformidad con la Ley 3/2004, de 29 de diciembre, por la que se establecen medidas de lucha contra la morosidad en las operaciones comerciales.

Puede realizar el pago mediante los medios habituales o contactar con nosotros para resolver cualquier discrepancia.

Atentamente,

Firma del acreedor`
  } else {
    // Jurisdicción genérica (inglés o internacional)
    subject = `Formal Demand for Payment - Invoice ${invoiceNumber}`
    documentText = `Dear ${clientName},\n\nThis is a formal demand for payment of invoice ${invoiceNumber} dated ${dueDate} for the amount of ${amount} €, which remains unpaid as of ${today}.\n\nYou are hereby given SEVEN BUSINESS DAYS to settle this debt. Failure to do so will result in further legal action, including referral to a debt collection agency or court proceedings.\n\nPlease remit payment immediately or contact us to resolve any dispute.\n\nSincerely,\n\nCreditor`
  }

  // Guardar la acción legal
  const { data: legalAction, error } = await supabase.from('legal_actions').insert({
    invoice_id: invoiceId,
    client_id: invoice.client_id,
    user_id: user.id,
    action_type: 'formal_letter',
    document_text: documentText,
    status: 'draft'
  }).select('id').single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Opcional: marcar factura como en disputa legal o similar (no implementado aún)

  return NextResponse.json({ 
    success: true, 
    document: documentText,
    subject,
    legalActionId: legalAction.id,
    clientEmail
  })
}
