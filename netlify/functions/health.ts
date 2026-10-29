import { API_HEALTH } from '../../src/lib/apiHealth';

export default async (request: Request) => {
  const allowed = request.method === 'GET' || request.method === 'HEAD';
  return new Response(request.method === 'HEAD' ? null : JSON.stringify(allowed ? API_HEALTH : { error: 'Método no permitido.' }), {
    status: allowed ? 200 : 405,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json',
      ...(allowed ? {} : { Allow: 'GET, HEAD' }),
    },
  });
};

export const config = { path: '/api/health' };
