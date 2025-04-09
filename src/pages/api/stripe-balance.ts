import type { APIRoute } from 'astro';

const STRIPE_SECRET_KEY = import.meta.env.STRIPE_SECRET_KEY;

export const GET: APIRoute = async () => {
  const res = await fetch('https://api.stripe.com/v1/balance', {
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
    },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Error al consultar Stripe' }), { status: 500 });
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
