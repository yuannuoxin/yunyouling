import { useEffect, useState } from 'react';
import { ticker } from '../data/content.ts';
import { ClientPanel } from './ClientPanel.tsx';

function useLiveUserCount() {
  const [count, setCount] = useState(1400023456);
  useEffect(() => {
    const timer = window.setInterval(() => setCount((value) => value + Math.floor(Math.random() * 37)), 900);
    return () => window.clearInterval(timer);
  }, []);
  return count;
}

interface HeroProps {
  onRegister: () => void;
}

export function Hero({ onRegister }: HeroProps) {
  const liveCount = useLiveUserCount();

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-24">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover opacity-40"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        <div className="grid-bg absolute inset-0" />
        <div className="animate-float absolute top-20 -left-20 h-72 w-72 rounded-full bg-brand-red/30 blur-3xl" />
        <div className="animate-float-slow absolute top-40 right-0 h-96 w-96 rounded-full bg-brand-gold/15 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-xs font-medium text-brand-gold">
            <span className="animate-pulse">🏆</span>
            2026 年度「最受天庭上仙青睐」云游令 · 千年口碑相传（传闻仅供娱乐）
          </div>
          <h1 className="text-4xl leading-[1.1] font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            天门由我守。
            <br />
            <span className="text-gradient-gold">云路由我开。</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            <span className="font-bold text-white">山海经云游令</span>
            ，集齐凌霄宝殿、天宫、广寒宫三大仙境专线，仙君亲测十余载，玉皇大帝赐福，嫦娥仙子准时维护。
            <span className="text-brand-gold"> 一键腾云，瞬息抵达仙境。</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onRegister}
              className="shimmer-btn animate-shimmer group inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-bold text-white shadow-xl shadow-brand-red/30 transition hover:scale-[1.02] hover:shadow-brand-red/50"
            >
              免费领取 7 天仙尊体验
              <span className="transition group-hover:translate-x-1">→</span>
            </button>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:border-brand-gold/50 hover:bg-white/10"
            >
              查看套餐价格
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <div className="mono text-xl font-black text-white sm:text-2xl">{liveCount.toLocaleString()}</div>
              <div className="mt-1 text-xs text-white/50">
                <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                实时在线人数
              </div>
            </div>
            <div>
              <div className="text-xl font-black text-white sm:text-2xl">0 ms</div>
              <div className="mt-1 text-xs text-white/50">凌霄宝殿专线延迟</div>
            </div>
            <div>
              <div className="text-xl font-black text-white sm:text-2xl">99+</div>
              <div className="mt-1 text-xs text-white/50">全球节点 · 含三大府邸</div>
            </div>
            <div>
              <div className="text-xl font-black text-white sm:text-2xl">2012</div>
              <div className="mt-1 text-xs text-white/50">起稳定运行 · 永不到期</div>
            </div>
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <ClientPanel />
        </div>
      </div>

      <div className="mt-16 border-y border-white/5 bg-white/[0.02] py-3">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 gap-10 pr-10 whitespace-nowrap">
            {[...ticker, ...ticker].map((item, index) => (
              <span key={index} className="text-sm font-medium text-white/50">
                {item}
                <span className="ml-10 text-brand-red">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
