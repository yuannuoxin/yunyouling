# 山海经云游令 · YUNYOULING

对 `C:\Temp\003\003_B7E5A6A5E89D8EE68F84E788.html`（神话主题营销页成品包）的 **1:1 复刻**，重写为可维护的 Hono + React 工程。

页面主题为「纯属虚构的神话演绎」，与任何真实服务、机构、人物无关，不含任何真实交易行为。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 服务端 | Hono 4 + @hono/node-server（静态托管 + JSON API） |
| 前端 | React 19 + TypeScript + Vite 6 |
| 样式 | Tailwind CSS v4（`@tailwindcss/vite`）+ 少量自定义工具类 |
| 工具 | clsx + tailwind-merge（等价原站 `cn`）、tsx |

## 启动

```bash
npm install

# 开发：Vite(5173) + Hono(3000)，Vite 已把 /api 代理到 3000
npm run dev

# 只跑前端（无 API，页面照常渲染）
npm run dev:web

# 生产：构建后由 Hono 托管 dist
npm run build
npm start          # http://localhost:3000
```

## 预览

`preview/` 下有本次验收截图，均由 Chrome headless 直接抓取：

- `desktop-full.png` — 复刻版 1440×3400 整页
- `mobile.png` — 复刻版 390×844 首屏
- `original-full.png` — 原始成品包同参数截图（用于对照）

## 目录结构

```
yunyouling/
├─ index.html                 # 与成品包一致的 title / description
├─ vite.config.ts             # React + Tailwind 插件，/api 代理
├─ server/index.ts            # Hono：API + serveStatic + SPA 回退
└─ src/
   ├─ main.tsx                # ToastProvider > VpnProvider > App
   ├─ app.css                 # Tailwind v4 主题变量、自定义工具类、keyframes
   ├─ App.tsx                 # 页面骨架与登录态
   ├─ data/                   # 全站内容（线路 / 套餐 / 评价 / FAQ / 下载…）
   ├─ state/
   │  ├─ vpn.tsx              # 客户端状态机：未连接 → 连接中 → 已连接
   │  └─ toast.tsx            # 右下角通知（3.8s 自动消失）
   ├─ lib/                    # cn、时间格式化
   └─ components/             # 14 个区块组件，逐段对应原页面
```

## 已复刻的交互

1. **客户端面板**：电源键启停；连接按 11 条日志、每 260ms 逐行推进；连接成功后计时、按线路属性生成实时上下行速率；线路下拉分「神仙专线 / 标准节点」两组；断开后 Kill Switch 文案复位。
2. **专线卡片 / 节点表**：点击「连接」直接切换线路并回到顶部；当前线路显示绿色已连接态。
3. **在线测速**：Ping → 下载 → 上传三段缓动仪表盘（含刻度、渐变弧、抖动）；专线测速到 299,792 Mbps 后出现「物理学不服名单」彩蛋。
4. **套餐**：月付 / 年付（省 50%）切换，年付展示年付总价与原价；四档卡片、标签、包含/不包含特性。
5. **收银台**：按 `plan + 支付方式 + 计费周期` 生成稳定的伪随机二维码；切换支付方式即刷新；「我已完成支付」1.6s 后提示未检测到付款。
6. **登录 / 注册**：Tab 切换、注册多一个邀请码、Esc 关闭、提交 1.2s 后写入登录态并给出对应 toast。
7. **FAQ**：单开手风琴，`grid-rows-[0fr]/[1fr]` 过渡、加号旋转 45°。
8. **下载**：8 个平台卡片，点击给出「才怪」提示。
9. **全局**：滚动 24px 后导航栏变毛玻璃、移动端折叠菜单、跑马灯、每秒增长的在线人数、底部免责声明可关闭、Esc 关闭所有弹层并锁滚动。

## API

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/health` | 健康检查 |
| GET | `/api/site` | 导航、页脚、跑马灯文案 |
| GET | `/api/lines` | 全部线路 |
| GET | `/api/lines/premium` | 三大神仙专线 |
| GET | `/api/lines/standard` | 标准节点 |
| GET | `/api/plans` | 套餐 |
| GET | `/api/features` | 核心功能 |
| GET | `/api/reviews` | 用户评价 |
| GET | `/api/faq` | 常见问题 |
| GET | `/api/downloads` | 全平台下载 |

接口与前端共用 `src/data`（同一份数据源），因此 SSR 之外无需二次请求，首屏即为最终形态。

## 部署（Cloudflare Workers）

线上跑的是 Workers 版本，Node 版本仅用于本地/自建服务器：

| 文件 | 作用 |
| --- | --- |
| `worker/index.ts` | Workers 入口：`/api/*` 交给 `server/api.ts`，其余透传给 `env.ASSETS` |
| `server/api.ts` | 纯 JSON API 实例，Node 与 Workers 共用同一份 |
| `wrangler.jsonc` | `main: worker/index.ts`、`assets.directory: ./dist`、`not_found_handling: single-page-application` |
| `server/index.ts` | Node 入口：API + `serveStatic` + SPA 回退（`npm start`） |

```bash
npm run build        # 生成 dist
npm run deploy       # wrangler deploy
npm run cf:dev       # 本地起 Workers 运行时（workerd）预览，默认 8787
```

SPA 回退只对**文档请求**生效（`GET` + `Accept` 含 `text/html` + 路径无文件扩展名），其余一行 404 纯文本；未知 `/api/*` 返回 404 JSON。因此缺失的 `/images/hero-bg.jpg`、`/favicon.ico` 在 Node 端与 Workers 端都是 404，不会返回一份 HTML —— 与原始成品包行为一致。

## 复刻一致性说明

- 设计令牌与原站一致：`brand-red #e11d2e`、`brand-crimson #b8141f`、`brand-gold #f5c542`、`ink #07080d / ink-2 #0d0f17 / ink-3 #141726`，字体栈 `PingFang SC → Microsoft YaHei → Noto Sans SC`。
- 1440×1100 视口下整页高度 9770px，与原站完全一致；逐屏像素比对除动画相位（浮动光斑、跑马灯、在线人数、实时速率）外无差异。
- 原包中 `images/hero-bg.jpg` 本身缺失（`onError` 隐藏），此处保留同一行为，视觉上的主视觉由渐变 + 网格 + 光斑构成。
