import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { api } from './api.ts';

const PORT = Number(process.env.PORT ?? 3000);

const app = new Hono();

app.route('/api', api);

/** 静态资源与 SPA 回退 */
app.use('/*', serveStatic({ root: './dist' }));
app.get('*', serveStatic({ path: './dist/index.html' }));

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`山海经云游令 · Hono 服务已启动：http://localhost:${info.port}`);
});
