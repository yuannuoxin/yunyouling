import type { DownloadItem, FaqItem, Feature, PaymentMethod, Plan, Review } from './types.ts';

/** 核心功能卡片 */
export const features: Feature[] = [
  {
    icon: '🛡️',
    title: '凌霄宝殿级加密',
    desc: '自研 AES-512 上古符箓算法，比业界 256 位整整多一倍，所以安全一倍。本仙亲自审核过密钥长度。',
  },
  {
    icon: '🙈',
    title: '绝不留尘',
    desc: '我们绝不保存任何日志。服务器硬盘只有 8MB，想记也记不下。请放心冲浪。',
  },
  {
    icon: '⚡',
    title: '筋斗云极速传送',
    desc: '采用仙缘感应技术，你的数据还没发出去，对面就已经收到了。延迟为负数属正常现象。',
  },
  {
    icon: '🧱',
    title: '腾云术 v3.0',
    desc: '天门由我守，云路任君行。自研协议直接从正门走，不用翻，有钥匙。',
  },
  {
    icon: '🔪',
    title: 'Kill Switch 断网保护',
    desc: '一旦连接意外断开，立即切断所有流量，速度比你反应还快，比你老板还狠。',
  },
  {
    icon: '📱',
    title: '14 亿设备同时在线',
    desc: '一个账号支持 14 亿台设备同时连接，全家、全村、全国一起用，都不卡。',
  },
  {
    icon: '🧭',
    title: '智能分流路由',
    desc: '国内直连、国外腾云，自动判断流量去向，比海关还准，比导航还快。',
  },
  {
    icon: '🌍',
    title: '全球 99+ 节点',
    desc: '覆盖五大洲、四大洋、三座仙府、两个天宫（一个是备用的）、一个凌霄宝殿。',
  },
];

/** 对比条 */
export const comparisons = [
  { k: '加密强度', them: 'AES-256', us: 'AES-512（多一倍）' },
  { k: '日志政策', them: '声称无日志', us: '硬盘只有 8MB' },
  { k: '最低延迟', them: '约 10ms', us: '0ms（物理隔壁）' },
  { k: '套餐期限', them: '最长 3 年', us: '万古长青（已取消限制）' },
];

/** 套餐 */
export const plans: Plan[] = [
  {
    id: 'people',
    name: '凡人套餐',
    subtitle: '为众生引路，但服务得比较慢',
    monthly: 9.9,
    yearly: 4.9,
    emoji: '🌾',
    cta: '加入凡间众生',
    features: [
      { text: '8 个标准节点', included: true },
      { text: '1 台设备同时在线', included: true },
      { text: '每月 100 GB 流量', included: true },
      { text: '标准速度（够用就行）', included: true },
      { text: '客服：排队中，前方 14 亿人', included: true },
      { text: '三大仙境专线', included: false },
      { text: '仙君电子符印', included: false },
    ],
  },
  {
    id: 'xiaokang',
    name: '逍遥套餐',
    subtitle: '全面建成逍遥网速',
    monthly: 29,
    yearly: 16,
    emoji: '🏘️',
    cta: '奔向逍遥',
    highlight: true,
    tag: '🔥 最受群众欢迎',
    features: [
      { text: '全部标准节点', included: true },
      { text: '5 台设备同时在线', included: true },
      { text: '不限流量', included: true },
      { text: '高速通道（腾云术 v3）', included: true },
      { text: '优先客服（前方只有 1 亿人）', included: true },
      { text: '天宫 + 月宫专线', included: true },
      { text: '凌霄宝殿专线（仙君自用）', included: false },
    ],
  },
  {
    id: 'prosperity',
    name: '仙缘共享套餐',
    subtitle: '你的网速和邻居平均一下',
    monthly: 99,
    yearly: 59,
    emoji: '💰',
    cta: '先富带后富',
    tag: '👑 神仙同款',
    features: [
      { text: '全部节点 + 三大仙境专线', included: true },
      { text: '14 台设备同时在线', included: true },
      { text: '不限流量 · 不限速', included: true },
      { text: '筋斗云极速通道', included: true },
      { text: '专属客服（仙君侍从亲自接听）', included: true },
      { text: '凌霄宝殿专线（仙君自用）', included: true },
      { text: '仙君电子符印', included: true },
    ],
  },
  {
    id: 'lifetime',
    name: '万古长青套餐',
    subtitle: '永不到期（已启用永久续航）',
    monthly: 2012,
    yearly: 2012,
    lifetime: 2012,
    emoji: '🏛️',
    cta: '一次付清，长驻仙班',
    tag: '♾️ 2018 起永久有效',
    features: [
      { text: '仙缘共享套餐全部权益', included: true },
      { text: '14 亿台设备同时在线', included: true },
      { text: '账号可由仙缘传承', included: true },
      { text: '专属 IP：10.0.0.1 隔壁', included: true },
      { text: '太上仙君亲笔题字（电子版）', included: true },
      { text: '优先进入下一届核心用户', included: true },
      { text: '永不到期，不可退款，不可申诉', included: true },
    ],
  },
];

/** 支付方式 */
export const payments: PaymentMethod[] = [
  { icon: '💚', name: '微信支付' },
  { icon: '💙', name: '支付宝' },
  { icon: '🧧', name: '数字众仙币' },
  { icon: '₿', name: '比特币' },
  { icon: '🪙', name: '玉皇通宝' },
  { icon: '💴', name: '日元（请投递至广寒宫信箱）' },
];

/** 用户评价 */
export const reviews: Review[] = [
  {
    name: '玉皇大帝',
    role: '天宫专线赞助人',
    avatar: '🦅',
    rating: 5,
    plan: '万古长青套餐（自称免费）',
    text: '史上最伟大的 云游令，没有之一。我赞助的那条线是 HUGE 的，没人比我更懂 云游令，相信我。顺便说一句，他们还没收到我的赞助款，这是坊间传闻。',
  },
  {
    name: '嫦娥仙子',
    role: '月宫专线赞助人',
    avatar: '🌸',
    rating: 5,
    plan: '仙缘共享套餐',
    text: '线路非常准时，每天凌晨 5 点维护从不迟到一秒。连接时会有一声很有礼貌的「失礼します」，非常加分。',
  },
  {
    name: '太上老君',
    role: '创始人 · 首席用户',
    avatar: '👑',
    rating: 5,
    plan: '仙君自用',
    text: '仙君亲测十余载，从没掉过线。天门由我守，云路任君行，还有什么好说的？五星好评，不接受反驳。',
  },
  {
    name: '王先生',
    role: '河北 · 程序员',
    avatar: '👨‍💻',
    rating: 4,
    plan: '逍遥套餐',
    text: '以前腾云像爬山，现在腾云像坐电梯。唯一的缺点是连上专线之后，我的朋友圈突然多了很多正能量，不知道为什么。',
  },
  {
    name: '李女士',
    role: '上海 · 金融从业者',
    avatar: '👩‍💼',
    rating: 5,
    plan: '仙缘共享套餐',
    text: '开了仙缘共享套餐之后，网速真的和邻居平均了：他们变慢了，我变快了。这就是先富带动后富吧。',
  },
  {
    name: '匿名用户',
    role: 'IP 显示：凌霄宝殿',
    avatar: '🕵️',
    rating: 4,
    plan: '？？？',
    text: '我也不知道我是怎么连上凌霄宝殿专线的，但客服说这是正常现象，让我不要声张。扣一星是因为凌晨总有人敲门问我要不要加个菜。',
  },
];

/** 评价区下方数字 */
export const reviewStats = [
  { k: 'App Store 评分', v: '5.0 ★', d: '（海外区，国区搜不到）' },
  { k: '仙界传闻', v: '0 篇', d: '听闻者都被请去品茶了' },
  { k: '仙界满意度', v: '非常满意', d: '他本人说的' },
];

/** 常见问题 */
export const faq: FaqItem[] = [
  {
    q: '山海经云游令 是真的吗？合法吗？',
    a: '当然不是真的。本站是一个纯属虚构的神话演绎 / 神话故事页面，不提供任何实际服务，不收取任何费用，所有人物、赞助、评价均为虚构。请勿当真，更请勿转账。',
  },
  {
    q: '真的不记录日志吗？',
    a: '真的。我们的服务器硬盘只有 8MB，想记也记不下。剩余空间都用来存本仙的题字了。',
  },
  {
    q: '凌霄宝殿专线为什么延迟是 0ms？',
    a: '因为仙府就建在隔壁洞天，网线是本仙亲手插的。有时候延迟会显示负数，那是因为本仙早就知道你要访问什么了。',
  },
  {
    q: '玉皇大帝真的赞助了天宫专线吗？',
    a: '他说他赞助了，而且是「史上最大的一笔赞助」。具体金额我们到现在也没收到，财务说可能还在仙税清关中。',
  },
  {
    q: '嫦娥仙子专线有什么特别之处？',
    a: '每天凌晨 5 点准时维护，一秒都不差，维护期间会自动播放樱花延时摄影。连接成功时会有礼貌地鞠躬 15 度。',
  },
  {
    q: '可以退款吗？',
    a: '可以申请。申请流程参照天庭申诉殿标准流程，预计处理时间为 3 到 5 个五年规划。万古长青套餐不支持退款、不支持申诉。',
  },
  {
    q: '支持哪些支付方式？',
    a: '微信、支付宝、数字众仙币、比特币以及 玉皇通宝。日元现金请投递到广寒宫信箱，我们每周去取一次。',
  },
  {
    q: '万古长青套餐真的是永久有效吗？',
    a: '是的。我们已于 2018 年正式调整了套餐续航规则，现在它是真·永久。账号还可以由仙缘传承。',
  },
];

/** 全平台下载 */
export const downloads: DownloadItem[] = [
  { icon: '🪟', name: 'Windows', meta: 'Win 7 / 10 / 11 · 64位', size: '88 MB' },
  { icon: '🍎', name: 'macOS', meta: 'Intel & Apple Silicon', size: '96 MB' },
  { icon: '📱', name: 'iOS', meta: 'App Store（海外区）', size: '64 MB' },
  { icon: '🤖', name: 'Android', meta: 'APK 直装 · 免谷歌框架', size: '52 MB' },
  { icon: '🐧', name: 'Linux', meta: '.deb / .rpm / AppImage', size: '40 MB' },
  { icon: '🌸', name: '鸿蒙 HarmonyOS', meta: '纯血鸿蒙 NEXT', size: '48 MB' },
  { icon: '📡', name: '路由器固件', meta: 'OpenWrt / 梅林 / 爱快', size: '16 MB' },
  { icon: '🧠', name: '脑机接口版', meta: 'Beta · 需植入芯片', size: '0 MB' },
];

/** 客户端连接日志脚本 */
export const connectLogs = [
  '正在施展腾云术 v3.0 ...',
  '正在向天庭申请云游令 ...',
  '许可已批准（盖章 ×3）',
  '正在握手 ... 对方握得很用力',
  '正在验证仙尊级电子证书 ...',
  '仙符有效期：永久（长久生效）',
  '正在穿越天庭结界 ... 其实是从正门走的',
  '正在分配专属仙云 IP ...',
  '正在拂去凡尘痕迹 ... 硬盘只有 8MB，本来就没多少',
  '仙缘感应已建立，数据即将先到达再出发',
  '✅ 仙门已开！欢迎来到蓬莱仙境',
];

/** 滚动跑马灯 */
export const ticker = [
  '🇨🇳 凌霄宝殿专线 · 0ms',
  '🇺🇸 天宫专线 · TREMENDOUS',
  '🇯🇵 月宫专线 · 准时',
  '🛡️ AES-512 上古符箓加密',
  '🙈 零日志（硬盘只有 8MB）',
  '♾️ 万古长青套餐 · 永不到期',
  '⚡ 筋斗云极速 · 延迟为负',
  '📱 14 亿设备同时在线',
  '👑 仙君自用 · 十年不掉线',
];

/** 测速状态文案 */
export const speedNotes = [
  '正在测量延迟 ... 仙君曰 0 就是 0',
  '正在下载测试文件 ... 文件是《太上仙箓》.pdf（14GB）',
  '正在上传 ... 您的数据正在飞往天庭',
  '测速完成！结果已经抄送给天庭司部',
];
