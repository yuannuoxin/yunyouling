import { Hono } from 'hono';
import { premiumLines, standardLines, allLines } from '../src/data/lines.ts';
import { faq, features, plans, reviews, downloads, ticker } from '../src/data/content.ts';
import { footerColumns, navLinks } from '../src/data/site.ts';

/**
 * 纯 JSON API，不含任何 Node 专属能力，
 * 因此同一份实例可以同时挂到 Node（server/index.ts）与 Cloudflare Workers（worker/index.ts）。
 * 调用方以 app.route('/api', api) 挂载。
 */
export const api = new Hono();

/** 健康检查 */
api.get('/health', (c) =>
  c.json({
    status: 'ok',
    app: '山海经云游令',
    version: '3.0.0',
    disclaimer: '纯属虚构的神话主题页面，不提供任何实际服务。',
  }),
);

/** 页面导航与页脚结构 */
api.get('/site', (c) => c.json({ navLinks, footerColumns, ticker }));

/** 线路：仅神仙专线 */
api.get('/lines/premium', (c) => c.json({ items: premiumLines }));

/** 线路：标准节点 */
api.get('/lines/standard', (c) => c.json({ items: standardLines }));

/** 线路：全部 */
api.get('/lines', (c) => c.json({ items: allLines }));

/** 套餐 */
api.get('/plans', (c) => c.json({ items: plans }));

/** 功能 / 评价 / 常见问题 / 下载 */
api.get('/features', (c) => c.json({ items: features }));
api.get('/reviews', (c) => c.json({ items: reviews }));
api.get('/faq', (c) => c.json({ items: faq }));
api.get('/downloads', (c) => c.json({ items: downloads }));

/** 未命中的接口统一 404 JSON */
api.all('*', (c) => c.json({ error: 'not_found', message: '这个接口还在蓬莱仙岛施工中。' }, 404));
