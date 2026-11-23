import { useEffect, useRef, useState } from 'react';
import { speedNotes } from '../data/content.ts';
import { cn } from '../lib/cn.ts';
import { useVpn } from '../state/vpn.tsx';
import { SectionHeading } from './SectionHeading.tsx';

type Phase = 'idle' | 'ping' | 'down' | 'up' | 'done';

const GAUGE_CIRCUMFERENCE = Math.PI * 90;

export function SpeedTest() {
  const { status, server } = useVpn();
  const [phase, setPhase] = useState<Phase>('idle');
  const [pingValue, setPingValue] = useState(0);
  const [downValue, setDownValue] = useState(0);
  const [upValue, setUpValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  const connected = status === 'connected';
  const isPremium = connected && server.premium;

  const targetPing = connected ? server.ping : 268;
  const targetDown = isPremium ? 299792 : connected ? 3200 : 2.5;
  const targetUp = isPremium ? 198000 : connected ? 1800 : 0.6;

  const runStep = (target: number, setter: (value: number) => void, duration: number) =>
    new Promise<void>((resolve) => {
      const start = performance.now();
      const tick = (now: number) => {
        const ratio = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - ratio, 3);
        const jitter = ratio < 1 ? (Math.random() - 0.5) * target * 0.08 : 0;
        setter(Math.max(0, target * eased + jitter));
        setProgress(ratio * 100);
        if (ratio < 1) frame.current = requestAnimationFrame(tick);
        else resolve();
      };
      frame.current = requestAnimationFrame(tick);
    });

  const startTest = async () => {
    if (phase === 'ping' || phase === 'down' || phase === 'up') return;
    setPingValue(0);
    setDownValue(0);
    setUpValue(0);
    setPhase('ping');
    await runStep(targetPing, setPingValue, 900);
    setPhase('down');
    await runStep(targetDown, setDownValue, 2400);
    setPhase('up');
    await runStep(targetUp, setUpValue, 1800);
    setProgress(100);
    setPhase('done');
  };

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const testing = phase === 'ping' || phase === 'down' || phase === 'up';
  const note =
    phase === 'ping'
      ? speedNotes[0]
      : phase === 'down'
        ? speedNotes[1]
        : phase === 'up'
          ? speedNotes[2]
          : phase === 'done'
            ? speedNotes[3]
            : '';

  const dash = (progress / 100) * GAUGE_CIRCUMFERENCE;

  return (
    <section id="speed" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="在线测速 · SPEED TEST"
              title={
                <>
                  快到<span className="text-gradient-gold">物理学不允许</span>
                </>
              }
              desc="连接神仙专线后，下载速度将达到光速 299,792 Mbps。再快一点就违反相对论了，本仙也得讲基本法。"
            />

            <div className="mt-8 space-y-3">
              {[
                { t: '未连接', d: '蓬莱仙岛云游驿站 3 号机 · 268ms · 2.5 Mbps', c: 'text-white/40' },
                { t: '标准节点', d: '约 12–210ms · 最高 3,200 Mbps', c: 'text-white/70' },
                { t: '神仙专线', d: '0–45ms · 299,792 Mbps（光速）', c: 'text-brand-gold' },
              ].map((row) => (
                <div
                  key={row.t}
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
                >
                  <span className={cn('w-20 shrink-0 text-sm font-bold', row.c)}>{row.t}</span>
                  <span className="mono text-sm text-white/60">{row.d}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-white/45">
              提示：当前{connected ? `已连接 ${server.flag} ${server.name}` : '未连接任何线路'}
              {!connected && '，先去上方连接一条专线，测速结果会好看很多。'}
            </p>
          </div>

          <div className="glass relative overflow-hidden rounded-[2rem] p-8">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
            <div className="relative mx-auto w-full max-w-sm">
              <svg viewBox="0 0 220 130" className="w-full">
                <defs>
                  <linearGradient id="gaugeGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#e11d2e" />
                    <stop offset="60%" stopColor="#f5c542" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 110 A 90 90 0 0 1 200 110"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 110 A 90 90 0 0 1 200 110"
                  fill="none"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${GAUGE_CIRCUMFERENCE}`}
                  style={{ transition: testing ? 'none' : 'stroke-dasharray 0.6s ease' }}
                />
                {Array.from({ length: 11 }).map((_, index) => {
                  const angle = Math.PI + (index / 10) * Math.PI;
                  const x1 = 110 + Math.cos(angle) * 70;
                  const y1 = 110 + Math.sin(angle) * 70;
                  const x2 = 110 + Math.cos(angle) * 76;
                  const y2 = 110 + Math.sin(angle) * 76;
                  return (
                    <line
                      key={index}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
              <div className="-mt-20 text-center">
                <div className="mono text-4xl font-black tracking-tight sm:text-5xl">
                  {phase === 'ping'
                    ? Math.round(pingValue)
                    : phase === 'up'
                      ? Math.round(upValue).toLocaleString()
                      : Math.round(downValue).toLocaleString()}
                </div>
                <div className="mt-1 text-xs tracking-widest text-white/40 uppercase">
                  {phase === 'ping' ? 'ms · 延迟' : phase === 'up' ? 'Mbps · 上传' : 'Mbps · 下载'}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/5 p-3">
                <div className="text-[10px] tracking-wider text-white/40 uppercase">Ping</div>
                <div className="mono mt-1 text-lg font-bold text-brand-gold">{Math.round(pingValue)} ms</div>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <div className="text-[10px] tracking-wider text-white/40 uppercase">下载</div>
                <div className="mono mt-1 text-lg font-bold text-emerald-300">
                  {Math.round(downValue).toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <div className="text-[10px] tracking-wider text-white/40 uppercase">上传</div>
                <div className="mono mt-1 text-lg font-bold text-sky-300">{Math.round(upValue).toLocaleString()}</div>
              </div>
            </div>

            <button
              onClick={startTest}
              disabled={testing}
              className={cn(
                'mt-6 w-full rounded-2xl py-4 text-base font-bold transition',
                testing
                  ? 'cursor-wait bg-white/10 text-white/50'
                  : 'bg-gradient-to-r from-brand-red to-brand-gold text-white shadow-lg shadow-brand-red/30 hover:brightness-110',
              )}
            >
              {testing ? '测速中 ...' : phase === 'done' ? '再测一次' : '开始测速'}
            </button>

            <div className="mono mt-3 h-5 text-center text-xs text-white/50">{note}</div>

            {phase === 'done' && isPremium && (
              <div className="animate-fade-up mt-3 rounded-xl border border-brand-gold/30 bg-brand-gold/10 p-3 text-center text-xs text-brand-gold">
                🏆 恭喜达到光速！您已被列入「物理学不服名单」。
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
