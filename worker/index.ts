import { Hono } from 'hono';
import { api } from '../server/api.ts';

/** Cloudflare Workers 静态资源绑定（wrangler.jsonc 的 assets.binding = ASSETS） */
type AssetsBinding = { fetch: (request: Request) => Promise<Response> };
type Bindings = { ASSETS: AssetsBinding };

/** 带这些后缀的路径一律按静态资源处理，未命中就 404，不能回退成页面 */
const ASSET_EXT = /\.(?:js|mjs|cjs|css|map|json|txt|xml|ico|png|jpe?g|gif|svg|webp|avif|bmp|woff2?|ttf|otf|eot|mp4|webm|mp3|wav|pdf|zip)$/i;

const app = new Hono<{ Bindings: Bindings }>();

/** 与 Node 端共用同一份 API */
app.route('/api', api);

/**
 * 静态资源由 Workers assets 直接命中（命中即返回，不经过 Worker）。
 * 走到这里说明 assets 未命中，只有「文档请求」（GET + Accept 含 text/html 且无文件扩展名）
 * 才回退到 index.html，其余一律 404 —— 对齐 Node 端与原始成品包的行为：
 * 缺失的 /images/hero-bg.jpg、/favicon.ico 必须返回 404，而不是一份 HTML。
 */
app.all('*', (c) => {
  const path = new URL(c.req.url).pathname;
  const accept = c.req.header('accept') ?? '';
  const isDocument = c.req.method === 'GET' && !ASSET_EXT.test(path) && accept.includes('text/html');

  if (!isDocument) return c.text('Not Found', 404);

  return c.env.ASSETS.fetch(
    new Request(new URL('/index.html', c.req.url), { headers: c.req.raw.headers }),
  );
});

export default app;
