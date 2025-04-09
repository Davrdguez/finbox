export const prerender = false; // 🔥 Impide que Astro lo ejecute en el build

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const stripeSecret = import.meta.env.STRIPE_SECRET_KEY;

  if (!stripeSecret) {
    return new Response(
      JSON.stringify({ error: "Falta STRIPE_SECRET_KEY" }),
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.stripe.com/v1/balance", {
      headers: {
        Authorization: `Bearer ${stripeSecret}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return new Response(JSON.stringify({ error }), { status: res.status });
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Error al consultar Stripe", details: err.message }),
      { status: 500 }
    );
  }
};
