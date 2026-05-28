import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const params = new URLSearchParams(body);
  const incomingMsg = params.get('Body') || '';
  const from = params.get('From') || '';

  // Aquí se integraría Twilio Messaging Response
  // const twiml = new MessagingResponse();
  // twiml.message('Gracias por contactar con CFG. ¿En qué podemos ayudarte?');

  console.log('WhatsApp recibido:', incomingMsg, 'de', from);
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const challenge = url.searchParams.get('hub.challenge');
  if (challenge) return new NextResponse(challenge);
  return NextResponse.json({ ok: true });
}
