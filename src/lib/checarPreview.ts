export const MAX_PREVIEW_TEXT_LENGTH = 3000;

export type PreviewResponse = {
  success: true;
  mode: 'preview';
  summary: string;
  candidates: string[];
};

export type PreviewOutcome =
  | { status: 200; body: PreviewResponse }
  | { status: 400 | 413; body: { error: string } };

export function createChecarPreview(payload: unknown): PreviewOutcome {
  const text = payload && typeof payload === 'object' && !Array.isArray(payload)
    ? (payload as Record<string, unknown>).text
    : undefined;

  if (typeof text !== 'string' || text.trim().length < 5) {
    return { status: 400, body: { error: 'Proporciona un texto válido para revisar.' } };
  }

  const normalized = text.trim().replace(/\s+/g, ' ');
  if (normalized.length > MAX_PREVIEW_TEXT_LENGTH) {
    return { status: 413, body: { error: `La muestra admite hasta ${MAX_PREVIEW_TEXT_LENGTH} caracteres.` } };
  }

  const candidates = normalized.split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 5)
    .slice(0, 3);

  return {
    status: 200,
    body: {
      success: true,
      mode: 'preview',
      summary: `Se identificaron ${candidates.length} fragmentos para revisar. Esta muestra no asigna veredictos ni consulta fuentes.`,
      candidates,
    },
  };
}
