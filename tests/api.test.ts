import test from 'node:test';
import assert from 'node:assert/strict';
import analyze, { config as analyzeConfig } from '../netlify/functions/checar';
import health from '../netlify/functions/health';

const analyzeUrl = 'http://localhost/api/checar/analyze';

test('health has the same JSON contract as the local server', async () => {
  const response = await health(new Request('http://localhost/api/health'));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: 'ok',
    role: 'Product Web Developer Portfolio Backend',
  });

  const wrongMethod = await health(new Request('http://localhost/api/health', { method: 'POST' }));
  assert.equal(wrongMethod.status, 405);
  assert.equal(wrongMethod.headers.get('Allow'), 'GET, HEAD');
  assert.deepEqual(await wrongMethod.json(), { error: 'Método no permitido.' });

  const head = await health(new Request('http://localhost/api/health', { method: 'HEAD' }));
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
});

test('preview returns passages from the submitted text without invented verdicts', async () => {
  const text = 'La nota afirma que se votó una medida. El informe menciona una cifra que requiere contraste.';
  const response = await analyze(new Request(analyzeUrl, {
    method: 'POST',
    body: JSON.stringify({ text }),
  }));
  assert.equal(response.status, 200);
  const body = await response.json() as Record<string, unknown>;
  assert.equal(body.mode, 'preview');
  assert.deepEqual(body.candidates, [
    'La nota afirma que se votó una medida.',
    'El informe menciona una cifra que requiere contraste.',
  ]);
  assert.equal('claims' in body, false);
  assert.equal('liveApi' in body, false);
});

test('preview rejects bad methods, JSON and oversized requests', async () => {
  const get = await analyze(new Request(analyzeUrl));
  assert.equal(get.status, 405);
  assert.equal(get.headers.get('Allow'), 'POST');

  const badJson = await analyze(new Request(analyzeUrl, { method: 'POST', body: '{' }));
  assert.equal(badJson.status, 400);

  const shortText = await analyze(new Request(analyzeUrl, { method: 'POST', body: JSON.stringify({ text: 'abc' }) }));
  assert.equal(shortText.status, 400);

  const longText = await analyze(new Request(analyzeUrl, { method: 'POST', body: JSON.stringify({ text: 'a'.repeat(3001) }) }));
  assert.equal(longText.status, 413);

  const largeBody = await analyze(new Request(analyzeUrl, { method: 'POST', body: JSON.stringify({ text: 'a'.repeat(9000) }) }));
  assert.equal(largeBody.status, 413);
  assert.deepEqual(analyzeConfig.rateLimit, {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  });
});

test('preview keeps decimal numbers inside their passage', async () => {
  const response = await analyze(new Request(analyzeUrl, {
    method: 'POST',
    body: JSON.stringify({ text: 'La cifra fue 3.5 millones. Falta contrastar el dato.' }),
  }));
  const body = await response.json() as { candidates: string[] };
  assert.deepEqual(body.candidates, ['La cifra fue 3.5 millones.', 'Falta contrastar el dato.']);
});
