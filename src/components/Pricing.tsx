import { useEffect, useState } from 'react';
import { payments, plans } from '../data/content.ts';
import type { Plan } from '../data/types.ts';
import { cn } from '../lib/cn.ts';
import { useToast } from '../state/toast.tsx';
import { QrCode } from './QrCode.tsx';
import { SectionHeading } from './SectionHeading.tsx';

export function Pricing() {
  const { toast } = useToast();
  const [yearly, setYearly] = useState(true);
  const [selected, setSelected] = useState<Plan | null>(null);
  const [method, setMethod] = useState(payments[0].name);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selected]);

  const displayPrice = (plan: Plan) => (plan.lifetime ? plan.lifetime : yearly ? plan.yearly : plan.monthly);

  const completePayment = () => {
    setPaying(true);
    window.setTimeout(() => {
      setPaying(false);
      setSelected(null);
      toast(
        '未检测到付款 😔',
        `仙君略感遗憾，但也在意料之中。（这是神话主题网站，请不要真的付钱。${
          method === '玉皇通宝' ? '另外 玉皇通宝刚刚又跌了。' : ''
        }）`,
        '👑',
      );
    }, 1600);
  };

  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-gold/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="套餐价格 · PRICING"
          title={
            <>
              从初入仙门到<span className="text-gradient-gold">万古长青</span>，总有一款适合你
            </>
          }
          desc="所有价格均为众仙币。年付立省 50%，万古长青一次付清、永不到期、不可退款、不可申诉。"
        />

        <div className="mt-10 flex items-center justify-center gap-4">
          <span className={cn('text-sm font-medium', yearly ? 'text-white/40' : 'text-white')}>月付</span>
          <button
            onClick={() => setYearly((value) => !value)}
            className={cn(
              'relative h-8 w-16 rounded-full transition',
              yearly ? 'bg-gradient-to-r from-brand-red to-brand-gold' : 'bg-white/15',
            )}
            aria-label="切换计费周期"
          >
            <span
              className={cn(
                'absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all',
                yearly ? 'left-9' : 'left-1',
              )}
            />
          </button>
          <span className={cn('text-sm font-medium', yearly ? 'text-white' : 'text-white/40')}>
            年付
            <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-300">
              省 50%
            </span>
          </span>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col rounded-3xl border p-7 transition duration-300 hover:-translate-y-2',
                plan.highlight
                  ? 'border-brand-red/60 bg-gradient-to-b from-brand-red/15 to-ink-2 shadow-[0_0_60px_rgba(225,29,46,0.2)]'
                  : plan.id === 'lifetime'
                    ? 'border-brand-gold/50 bg-gradient-to-b from-brand-gold/10 to-ink-2 shadow-[0_0_60px_rgba(245,197,66,0.12)]'
                    : 'glass',
              )}
            >
              {plan.tag && (
                <span
                  className={cn(
                    'absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap shadow-lg',
                    plan.id === 'lifetime'
                      ? 'bg-brand-gold text-ink'
                      : plan.highlight
                        ? 'bg-brand-red text-white'
                        : 'bg-white text-ink',
                  )}
                >
                  {plan.tag}
                </span>
              )}

              <div className="text-3xl">{plan.emoji}</div>
              <h3 className="mt-3 text-xl font-black">{plan.name}</h3>
              <p className="mt-1 text-xs text-white/50">{plan.subtitle}</p>

              <div className="mt-5 flex items-end gap-1">
                <span className="text-sm text-white/60">¥</span>
                <span className="mono text-4xl font-black tracking-tight">{displayPrice(plan)}</span>
                <span className="mb-1 text-sm text-white/50">{plan.lifetime ? '/ 永久' : '/ 月'}</span>
              </div>
              <div className="mt-1 h-4 text-xs text-white/40">
                {plan.lifetime
                  ? '一次性付清 · 寓意「2012 起」'
                  : yearly
                    ? `按年支付 ¥${Math.round(plan.yearly * 12)} · 原价 ¥${Math.round(plan.monthly * 12)}`
                    : '按月支付 · 随时取消（理论上）'}
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className={cn(
                      'flex items-start gap-2 text-sm',
                      feature.included ? 'text-white/80' : 'text-white/30 line-through',
                    )}
                  >
                    <span className={cn('mt-0.5 text-xs', feature.included ? 'text-emerald-400' : 'text-white/20')}>
                      {feature.included ? '✔' : '✖'}
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelected(plan)}
                className={cn(
                  'mt-7 w-full rounded-xl py-3 text-sm font-bold transition',
                  plan.highlight
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30 hover:bg-brand-crimson'
                    : plan.id === 'lifetime'
                      ? 'bg-brand-gold text-ink hover:brightness-110'
                      : 'bg-white/10 text-white hover:bg-white hover:text-ink',
                )}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/45">
          <span className="font-semibold text-white/60">支持支付方式：</span>
          {payments.map((item) => (
            <span key={item.name} className="flex items-center gap-1.5">
              <span>{item.icon}</span>
              {item.name}
            </span>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-ink-2 shadow-2xl">
            <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />
            <div className="relative p-7">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-brand-gold uppercase">收银台 · 纯属虚构</div>
                  <h3 className="mt-1 text-2xl font-black">
                    {selected.emoji} {selected.name}
                  </h3>
                  <p className="text-xs text-white/50">{selected.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:bg-white/10"
                  aria-label="关闭"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr]">
                <div className="flex flex-col items-center gap-2">
                  <QrCode seed={selected.id + method + (yearly ? 'y' : 'm')} />
                  <div className="text-[11px] text-white/40">扫码支付（扫了也没用）</div>
                </div>
                <div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-white/60">应付金额</span>
                      <span className="mono text-2xl font-black text-brand-gold">
                        ¥
                        {selected.lifetime
                          ? selected.lifetime
                          : yearly
                            ? Math.round(selected.yearly * 12)
                            : selected.monthly}
                      </span>
                    </div>
                    <div className="mt-1 text-right text-xs text-white/40">
                      {selected.lifetime ? '永久 · 一次付清' : yearly ? '年付 · 12 个月' : '月付 · 1 个月'}
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-medium text-white/60">选择支付方式</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {payments.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setMethod(item.name)}
                        className={cn(
                          'flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition',
                          method === item.name
                            ? 'border-brand-gold bg-brand-gold/10 text-white'
                            : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30',
                        )}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="truncate">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={completePayment}
                disabled={paying}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-brand-red to-brand-gold py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-red/30 transition hover:brightness-110 disabled:opacity-70"
              >
                {paying ? '正在向财务部核实 ...' : '我已完成支付'}
              </button>

              <p className="mt-3 text-center text-[11px] text-white/40">
                本页面为神话主题虚构展示，不会发生任何真实交易。请勿向任何人转账。
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
