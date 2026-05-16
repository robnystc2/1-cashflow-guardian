import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any })

const PRICES = {
  basic: process.env.STRIPE_PRICE_BASIC || 'price_basic',
  pro: process.env.STRIPE_PRICE_PRO || 'price_pro',
  total: process.env.STRIPE_PRICE_TOTAL || 'price_total',
}

export async function POST(request: Request) {
  try {
    const { plan } = await request.json()
    const priceId = PRICES[plan as keyof typeof PRICES] || PRICES.pro

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      metadata: { plan },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
