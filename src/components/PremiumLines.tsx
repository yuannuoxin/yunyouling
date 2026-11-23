import { premiumLines, standardLines } from '../data/lines.ts';
import type { Line } from '../data/types.ts';
import { cn } from '../lib/cn.ts';
import { useVpn } from '../state/vpn.tsx';
import { LoadBar } from './LoadBar.tsx';
import { SectionHeading } from './SectionHeading.tsx';

export function PremiumLines() {
  const { connect, server, status } = useVpn();

  const connectTo = (id: string) => {
    connect(id);
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="servers" className="relative py-20 sm:py-28">
      <div className="star-pattern pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="神仙专线 · PREMIUM LINES"
          title={
            <>
              三大<span className="text-gradient-red">神仙专线</span>，全球独家
            </>
          }
          desc="别人家的 云游令 节点在洞府，我们的节点在仙山。三位上古仙神亲自坐镇（或赐福），线路质量有人格担保。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {premiumLines.map((line, index) => {
            const active = server.id === line.id && status === 'connected';
            return (
              <div
                key={line.id}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-3xl border bg-ink-2 p-[1px] transition duration-500 hover:-translate-y-2',
                  active
                    ? 'border-emerald-400/60 shadow-[0_0_50px_rgba(52,211,153,0.25)]'
                    : 'border-white/10',
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 blur-2xl transition duration-700 group-hover:opacity-30',
                    line.accent,
                  )}
                />
                <div className="relative flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-ink-2/90 p-7">
                  <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', line.accent)} />

                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-4xl shadow-lg',
                        line.accent,
                      )}
                    >
                      {line.flag}
                    </div>
                    <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-semibold text-brand-gold">
                      {line.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-black">{line.name}</h3>
                  <div className="mt-1 text-sm font-semibold text-brand-gold">（{line.sponsor}）</div>
                  <p className="mt-1 text-xs text-white/40">{line.location}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">{line.description}</p>

                  <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-white/5 p-3 text-center">
                    <div>
                      <div className="mono text-lg font-bold text-emerald-300">{line.ping}ms</div>
                      <div className="text-[10px] text-white/40">延迟</div>
                    </div>
                    <div>
                      <div className="mono text-lg font-bold">{line.bandwidth}</div>
                      <div className="text-[10px] text-white/40">带宽</div>
                    </div>
                    <div>
                      <div className="mono text-lg font-bold">{line.load}%</div>
                      <div className="text-[10px] text-white/40">负载</div>
                    </div>
                  </div>

                  <ul className="mt-5 flex-1 space-y-2">
                    {line.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-white/75">
                        <span className="mt-0.5 text-brand-gold">✦</span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => connectTo(line.id)}
                    className={cn(
                      'mt-6 w-full rounded-xl py-3 text-sm font-bold transition',
                      active
                        ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/50'
                        : 'bg-white text-ink hover:bg-brand-gold',
                    )}
                  >
                    {active ? '✓ 已连接此专线' : `立即连接 ${line.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">标准节点</h3>
              <p className="mt-1 text-sm text-white/50">没有大人物坐镇，但也勉强能用。</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> 空闲
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-gold" /> 一般
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-red" /> 拥挤
              </span>
            </div>
          </div>

          <div className="glass overflow-hidden rounded-2xl">
            <div className="hidden grid-cols-12 gap-4 border-b border-white/5 px-5 py-3 text-[11px] font-medium tracking-wider text-white/40 uppercase md:grid">
              <div className="col-span-4">节点</div>
              <div className="col-span-3">特色</div>
              <div className="col-span-1">延迟</div>
              <div className="col-span-2">带宽</div>
              <div className="col-span-1">负载</div>
              <div className="col-span-1 text-right">操作</div>
            </div>

            {standardLines.map((line: Line) => {
              const active = server.id === line.id && status === 'connected';
              return (
                <div
                  key={line.id}
                  className="grid grid-cols-2 items-center gap-3 border-b border-white/5 px-5 py-4 transition last:border-0 hover:bg-white/[0.03] md:grid-cols-12 md:gap-4"
                >
                  <div className="col-span-2 flex items-center gap-3 md:col-span-4">
                    <span className="text-2xl">{line.flag}</span>
                    <div>
                      <div className="font-semibold">{line.name}</div>
                      <div className="text-xs text-white/40">{line.location}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-white/60 md:col-span-3">{line.tagline}</div>
                  <div className="mono text-sm md:col-span-1">
                    <span className="text-white/40 md:hidden">延迟 </span>
                    <span
                      className={
                        line.ping > 500
                          ? 'text-brand-red'
                          : line.ping > 150
                            ? 'text-brand-gold'
                            : 'text-emerald-300'
                      }
                    >
                      {line.ping}ms
                    </span>
                  </div>
                  <div className="mono text-sm md:col-span-2">
                    <span className="text-white/40 md:hidden">带宽 </span>
                    {line.bandwidth}
                  </div>
                  <div className="md:col-span-1">
                    <LoadBar load={line.load} />
                  </div>
                  <div className="text-right md:col-span-1">
                    <button
                      onClick={() => connectTo(line.id)}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                        active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white hover:bg-brand-red',
                      )}
                    >
                      {active ? '已连接' : '连接'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
