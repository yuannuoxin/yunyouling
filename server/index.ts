import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { premiumLines, standardLines, allLines } from '../src/data/lines.ts';
import { faq, features, plans, reviews, downloads, ticker } from '../src/data/content.ts';
import { footerColumns, navLinks } from '../src/data/site.ts';

const PORT = Number(process.env.PORT ?? 3000);

const app = new Hono();

/** 健康检查 */
app.get('/api/health', (c) =>
  c.json({
    status: 'ok',
    app: '山海经云游令',
    version: '3.0.0',
    disclaimer: '纯属虚构的神话主题页面，不提供任何实际服务。',
  }),
);

/** 页面导航与页脚结构 */
app.get('/api/site', (c) => c.json({ navLinks, footerColumns, ticker }));

/** 线路：仅神仙专线 */
app.get('/api/lines/premium', (c) => c.json({ items: premiumLines }));

/** 线路：标准节点 */
app.get('/api/lines/standard', (c) => c.json({ items: standardLines }));

/** 线路：全部 */
app.get('/api/lines', (c) => c.json({ items: allLines }));

/** 套餐 */
app.get('/api/plans', (c) => c.json({ items: plans }));

/** 功能 / 评价 / 常见问题 / 下载 */
app.get('/api/features', (c) => c.json({ items: features }));
app.get('/api/reviews', (c) => c.json({ items: reviews }));
app.get('/api/faq', (c) => c.json({ items: faq }));
app.get('/api/downloads', (c) => c.json({ items: downloads }));

/** 未命中的接口统一 404 JSON */
app.all('/api/*', (c) => c.json({ error: 'not_found', message: '这个接口还在蓬莱仙岛施工中。' }, 404));

/** 静态资源与 SPA 回退 */
app.use('/*', serveStatic({ root: './dist' }));
app.get('*', serveStatic({ path: './dist/index.html' }));

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`山海经云游令 · Hono 服务已启动：http://localhost:${info.port}`);
});
