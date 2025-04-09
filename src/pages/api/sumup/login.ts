import type { APIRoute } from 'astro';

const client_id = import.meta.env.SUMUP_CLIENT_ID;
const redirect_uri = import.meta.env.SUMUP_REDIRECT_URI;

export const GET: APIRoute = async () => {
  const scopes = [
    'user.profile_readonly',
    'email',
    'accounting.read',
    'transactions.history',
  ].join(' ');

  const url = new URL('https://api.sumup.com/authorize');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', client_id);
  url.searchParams.set('redirect_uri', redirect_uri);
  url.searchParams.set('scope', scopes);

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
};