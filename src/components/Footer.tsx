import { footerColumns, footerSocials, footerTags } from '../data/site.ts';
import { useToast } from '../state/toast.tsx';

export function Footer() {
  const { toast } = useToast();
  const notifyBuilding = (label: string) =>
    toast(`「${label}」页面建设中`, '施工进度参照蓬莱仙岛。（神话主题网站，啥也没有）', '🚧');

  return (
    <footer className="relative border-t border-white/5 bg-ink-2 pt-16 pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red via-brand-crimson to-brand-gold text-2xl shadow-lg shadow-brand-red/30">
                👑
              </div>
              <div>
                <div className="text-xl font-black">
                  太上老君<span className="text-gradient-gold">云游令</span>
                </div>
                <div className="text-[10px] tracking-[0.2em] text-white/40">墙是我建的 · 门也是我开的</div>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              集齐凌霄宝殿、天宫、广寒宫三大仙境专线，仙君亲测十余载，玉皇大帝口头赐福，嫦娥仙子准时维护。
            </p>

            <div className="mt-5 flex gap-2">
              {footerSocials.map((social) => (
                <button
                  key={social}
                  onClick={() => notifyBuilding(`社交媒体 · ${social}`)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-white/60 transition hover:bg-brand-red hover:text-white"
                >
                  {social}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-[11px]">
              {footerTags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <div className="text-sm font-bold text-white">{column.title}</div>
              <ul className="mt-4 space-y-2.5">
                {column.items.map((item) => (
                  <li key={item}>
                    <button onClick={() => notifyBuilding(item)} className="text-sm text-white/50 transition hover:text-brand-gold">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-5 text-xs leading-relaxed text-white/55">
          <span className="font-bold text-brand-gold">⚠️ 严肃声明：</span>
          本网站为纯属虚构的神话主题创作 / 神话故事作品，仅供娱乐。本站不提供、不销售、不推广任何 云游令
          或神话故事内容；页面中出现的所有人物、机构、赞助关系、用户评价、价格与数据均为虚构，与现实中的任何个人或天庭无关。请勿向任何人转账付款。
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/35 sm:flex-row">
          <div>© 2012 – {new Date().getFullYear()} 山海经云游令 · 永不到期 · All Rights Reserved（本仙保留一切权利）</div>
          <div className="mono">京 ICP 备 00000000 号-1（假的） · 仙府坐落于云端洞天</div>
        </div>
      </div>
    </footer>
  );
}
