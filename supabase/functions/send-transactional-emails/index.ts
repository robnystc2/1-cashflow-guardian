import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@^3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const resend = new Resend(RESEND_API_KEY);

  // Solo POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { type, userId } = await req.json();

  if (!type || !userId) {
    return new Response(JSON.stringify({ error: "type and userId required" }), { status: 400 });
  }

  // Verificar si ya se envió este tipo de email a este usuario
  const { data: existing } = await supabase.from("email_logs").select("id").eq("user_id", userId).eq("email_type", type).single();
  if (existing) {
    return new Response(JSON.stringify({ skipped: true, reason: "Already sent" }), { status: 200 });
  }

  // Obtener datos del usuario
  const { data: profile } = await supabase.from("profiles").select("email, full_name").eq("id", userId).single();
  if (!profile) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

  let subject = "";
  let body = "";

  switch (type) {
    case "welcome":
      subject = "Bienvenido a CashFlow Guardian, Emperador";
      body = `Hola ${profile.full_name || "Emperador"},

Tu cuenta está activa y lista para blindar tus proyectos.

Recuerda:
1. Añade tu primer cliente
2. Crea un proyecto con hitos
3. Blinda tu trabajo y cobra sin perseguir

Accede aquí: ${SUPABASE_URL}/overview

— El equipo de CashFlow Guardian`;
      break;

    case "day3":
      subject = "¿Ya probaste el CFO Cassandra?";
      body = `Hola ${profile.full_name || "Emperador"},

Tu CFO personal te está esperando. Predice tu flujo de caja a 30 días y te avisa antes de que tengas problemas.

Míralo aquí: ${SUPABASE_URL}/overview

— CashFlow Guardian`;
      break;

    case "day14":
      subject = "Tienes un proyecto sin blindar";
      body = `Hola ${profile.full_name || "Emperador"},

Notamos que aún no has blindado ningún proyecto. ¿Sabías que el 95% de nuestros usuarios recuperan su inversión en su primer proyecto blindado?

Crea tu primer proyecto blindado ahora: ${SUPABASE_URL}/projects/new

— CashFlow Guardian`;
      break;

    case "day30":
      subject = "Tu imperio te espera";
      body = `Hola ${profile.full_name || "Emperador"},

Hace un mes que empezaste esta aventura. Queremos recordarte que cada proyecto sin blindaje es dinero que podrías perder.

Vuelve y blinda tu primer proyecto: ${SUPABASE_URL}/projects/new

— CashFlow Guardian`;
      break;

    default:
      return new Response(JSON.stringify({ error: "Unknown type" }), { status: 400 });
  }

  const { error: emailError } = await resend.emails.send({
    from: "CashFlow Guardian <onboarding@resend.dev>",
    to: [profile.email],
    subject,
    text: body,
  });

  if (emailError) {
    return new Response(JSON.stringify({ error: emailError.message }), { status: 500 });
  }

  // Registrar envío
  await supabase.from("email_logs").insert({ user_id: userId, email_type: type });

  return new Response(JSON.stringify({ sent: true, type }), { status: 200 });
});
