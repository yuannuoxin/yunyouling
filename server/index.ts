import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { readFileSync } from 'node:fs';
import { api } from './api.ts';

const PORT = Number(process.env.PORT ?? 3000);

/** 带这些后缀的路径一律按静态资源处理，未命中就 404，不能回退成页面 */
const ASSET_EXT = /\.(?:js|mjs|cjs|css|map|json|txt|xml|ico|png|jpe?g|gif|svg|webp|avif|bmp|woff2?|ttf|otf|eot|mp4|webm|mp3|wav|pdf|zip)$/i;

const indexHtml = readFileSync('./dist/index.html', 'utf-8');

const app = new Hono();

app.route('/api', api);

/** 静态资源：命中即返回 */
app.use('/*', serveStatic({ root: './dist' }));

/**
 * SPA 回退只对「文档请求」生效（GET + Accept 含 text/html 且无文件扩展名）。
 * 缺失的 /images/hero-bg.jpg、/favicon.ico 返回 404 纯文本，
 * 与原始成品包 / Cloudflare Workers 版本行为一致。
 */
app.get('*', (c) => {
  const accept = c.req.header('accept') ?? '';
  if (ASSET_EXT.test(c.req.path) || !accept.includes('text/html')) {
    return c.text('Not Found', 404);
  }
  return c.html(indexHtml);
});

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`山海经云游令 · Hono 服务已启动：http://localhost:${info.port}`);
});
