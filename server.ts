import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { API_HEALTH } from './src/lib/apiHealth';
import { createChecarPreview } from './src/lib/checarPreview';

async function startServer() {
  const app = express();
  const port = Number.parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '8kb' }));

  app.get('/api/health', (_req, res) => res.json(API_HEALTH));
  app.all('/api/health', (_req, res) => res.set('Allow', 'GET, HEAD').status(405).json({ error: 'Método no permitido.' }));

  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { error: 'Demasiadas peticiones. Intenta nuevamente en 1 minuto.' },
  });

  app.all('/api/checar/analyze', limiter, (req, res) => {
    if (req.method !== 'POST') {
      return res.set('Allow', 'POST').status(405).json({ error: 'Método no permitido.' });
    }

    const outcome = createChecarPreview(req.body);
    return res.status(outcome.status).json(outcome.body);
  });

  app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error && typeof error === 'object' && 'type' in error && error.type === 'entity.too.large') {
      return res.status(413).json({ error: 'El cuerpo de la solicitud es demasiado grande.' });
    }
    if (error instanceof SyntaxError && 'body' in error) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud no es un JSON válido.' });
    }
    return next(error);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
