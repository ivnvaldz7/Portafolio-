import { createChecarPreview } from '../../src/lib/checarPreview';

const MAX_BODY_BYTES = 8192;

const jsonResponse = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json',
    ...(status === 405 ? { Allow: 'POST' } : {}),
  },
});

async function readBoundedJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return null;

  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new RangeError('body-too-large');
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export default async (request: Request) => {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Método no permitido.' }, 405);
  }

  try {
    const outcome = createChecarPreview(await readBoundedJson(request));
    return jsonResponse(outcome.body, outcome.status);
  } catch (error) {
    return error instanceof RangeError
      ? jsonResponse({ error: 'El cuerpo de la solicitud es demasiado grande.' }, 413)
      : jsonResponse({ error: 'El cuerpo de la solicitud no es un JSON válido.' }, 400);
  }
};

export const config = {
  path: '/api/checar/analyze',
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};
