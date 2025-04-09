import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, redirect }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('No authorization code provided', { status: 400 });
  }

  const res = await fetch('https://api.sumup.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: import.meta.env.SUMUP_CLIENT_ID,
      client_secret: import.meta.env.SUMUP_CLIENT_SECRET,
      redirect_uri: import.meta.env.SUMUP_REDIRECT_URI,
      code,
    }),
  });

  const data = await res.json();

  if (data.access_token) {
    return redirect(`/sumup-connected#access_token=${data.access_token}`);
  }

  return new Response('Error retrieving access token', { status: 500 });
};