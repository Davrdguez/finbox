import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response(JSON.stringify({ error: 'Token requerido' }), {
      status: 401,
    });
  }

  const res = await fetch('https://api.sumup.com/v0.1/balance', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Error al consultar SumUp' }), {
      status: res.status,
    });
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};
