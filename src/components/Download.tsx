import { downloads } from '../data/content.ts';
import { useToast } from '../state/toast.tsx';
import { SectionHeading } from './SectionHeading.tsx';

interface DownloadProps {
  onRegister: () => void;
}

export function Download({ onRegister }: DownloadProps) {
  const { toast } = useToast();

  const notifyDownload = (name: string) => {
    toast(`${name} 版下载已开始（才怪）`, '这是神话主题网站，没有任何安装包。仙君建议你先入梦修行。', '📦');
  };

  return (
    <section id="download" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-red/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="全平台下载 · DOWNLOAD"
          title={
            <>
              有屏幕的地方，<span className="text-gradient-red">就有山海经云游令</span>
            </>
          }
          desc="支持所有主流平台，以及一些不太主流但本仙觉得有必要的平台。"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {downloads.map((item) => (
            <button
              key={item.name}
              onClick={() => notifyDownload(item.name)}
              className="glass group flex items-center gap-4 rounded-2xl p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:bg-white/[0.06]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/5 text-3xl ring-1 ring-white/10 transition group-hover:scale-110">
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold">{item.name}</div>
                <div className="truncate text-xs text-white/45">{item.meta}</div>
                <div className="mono mt-1 text-[11px] text-brand-gold">v3.0.0 · {item.size}</div>
              </div>
              <span className="text-white/30 transition group-hover:translate-y-0.5 group-hover:text-brand-gold">⬇</span>
            </button>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-brand-gold/30 bg-gradient-to-br from-brand-red/30 via-ink-2 to-brand-gold/20 p-10 text-center sm:p-14">
          <div className="star-pattern absolute inset-0 opacity-50" />
          <div className="animate-float absolute -top-16 left-10 h-48 w-48 rounded-full bg-brand-red/30 blur-3xl" />
          <div className="animate-float-slow absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />
          <div className="relative">
            <div className="text-5xl">👑</div>
            <h3 className="mt-4 text-3xl font-black sm:text-4xl">
              还在凡间观望？
              <br />
              <span className="text-gradient-gold">仙君已在蓬莱仙境等候多时。</span>
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/65 sm:text-base">
              现在注册，立即赠送 7 天仙尊体验，三大仙境专线随便连。不满意全额退款（流程参照天庭申诉殿）。
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={onRegister}
                className="rounded-2xl bg-white px-8 py-4 text-base font-bold text-ink shadow-xl transition hover:scale-[1.02] hover:bg-brand-gold"
              >
                免费开启云游 →
              </button>
              <a
                href="#pricing"
                className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                对比所有套餐
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
