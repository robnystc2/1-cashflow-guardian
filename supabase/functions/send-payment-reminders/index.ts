// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "jsr:@supabase/server@^1";
import { Resend } from "npm:resend@^3";

const RESEND_API_KEY = "re_UDDDR5WG_Kw3LUnG7wkJVFrbUzvCeZ2QZ";

export default {
  fetch: withSupabase({ auth: ["secret"] }, async (req, ctx) => {
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const resend = new Resend(RESEND_API_KEY);
    const now = new Date().toISOString();

    const { data: reminders, error } = await ctx.supabase
      .from("payment_reminders")
      .select("id, invoice_id, type, scheduled_date, invoice:invoices(client_id, invoice_number, subtotal, due_date, client:clients(email, name))")
      .lte("scheduled_date", now)
      .eq("sent", false);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    if (!reminders || reminders.length === 0) return new Response(JSON.stringify({ processed: 0 }), { status: 200 });

    const results = [];
    for (const reminder of reminders) {
      try {
        const invoice = Array.isArray(reminder.invoice) ? reminder.invoice[0] : reminder.invoice;
        if (!invoice) continue;
        const clientEmail = invoice?.client?.email;
        const clientName = invoice?.client?.name || "cliente";
        const invoiceNumber = invoice?.invoice_number || "N/A";
        const amount = invoice?.subtotal || 0;
        const dueDate = invoice?.due_date || "sin fecha";
        if (!clientEmail) continue;

        let subject = "", body = "";
        switch (reminder.type) {
          case "friendly":
            subject = `Recordatorio amable: Factura ${invoiceNumber} pendiente`;
            body = `Hola ${clientName},\n\nTe recordamos que la factura ${invoiceNumber} por €${amount} vence el ${dueDate}.\nPor favor, realiza el pago a la mayor brevedad.\n\nGracias.`; break;
          case "firm":
            subject = `Factura ${invoiceNumber} vencida - Segundo aviso`;
            body = `Hola ${clientName},\n\nLa factura ${invoiceNumber} por €${amount} ha vencido el ${dueDate}.\nTe pedimos que regularices el pago lo antes posible para evitar recargos.\n\nSaludos.`; break;
          case "final":
            subject = `Último aviso: Factura ${invoiceNumber} - Acción requerida`;
            body = `Hola ${clientName},\n\nLamentamos tener que insistir. La factura ${invoiceNumber} por €${amount} sigue impaga desde el ${dueDate}.\nSi no recibimos el pago en 48h, iniciaremos acciones de cobro.\n\nPor favor, contáctanos si tienes alguna duda.`; break;
          default:
            subject = `Factura ${invoiceNumber} pendiente`;
            body = `Hola ${clientName},\n\nLa factura ${invoiceNumber} está pendiente de pago. Gracias.`;
        }

        const { error: emailError } = await resend.emails.send({
          from: "CashFlow Guardian <onboarding@resend.dev>",
          to: [clientEmail],
          subject,
          text: body,
        });

        if (emailError) {
          await ctx.supabase.from("reminder_logs").insert({ reminder_id: reminder.id, invoice_id: reminder.invoice_id, sent_to: clientEmail, status: "failed", error_message: emailError.message });
          continue;
        }

        await ctx.supabase.from("payment_reminders").update({ sent: true, sent_at: new Date().toISOString() }).eq("id", reminder.id);
        await ctx.supabase.from("reminder_logs").insert({ reminder_id: reminder.id, invoice_id: reminder.invoice_id, sent_to: clientEmail, status: "sent" });
        results.push({ invoice: invoiceNumber, email: clientEmail, status: "sent" });
      } catch (err) { console.error(err); }
    }
    return new Response(JSON.stringify({ processed: results.length, details: results }), { status: 200, headers: { "Content-Type": "application/json" } });
  }),
};
