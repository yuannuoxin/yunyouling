import { Hono } from 'hono';
import { api } from '../server/api.ts';

/** Cloudflare Workers 静态资源绑定（wrangler.jsonc 的 assets.binding = ASSETS） */
type AssetsBinding = { fetch: (request: Request) => Promise<Response> };
type Bindings = { ASSETS: AssetsBinding };

const app = new Hono<{ Bindings: Bindings }>();

/** 与 Node 端共用同一份 API */
app.route('/api', api);

/**
 * 其余请求交给 Workers 静态资源：
 * dist 内的文件按原路径返回，未命中的路径由 not_found_handling = single-page-application
 * 回退到 index.html（等价 Node 端 serveStatic + SPA 回退）。
 */
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
