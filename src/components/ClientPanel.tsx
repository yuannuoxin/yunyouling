import { useEffect, useRef } from 'react';
import { allLines } from '../data/lines.ts';
import { cn } from '../lib/cn.ts';
import { formatClock } from '../lib/format.ts';
import { useVpn } from '../state/vpn.tsx';

export function ClientPanel() {
  const { status, server, logs, elapsed, down, up, selectServer, toggle } = useVpn();
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [logs]);

  const connected = status === 'connected';
  const connecting = status === 'connecting';

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className={cn(
          'absolute -inset-6 rounded-[2.5rem] blur-3xl transition-all duration-1000',
          connected ? 'bg-emerald-500/20' : connecting ? 'bg-brand-gold/20' : 'bg-brand-red/15',
        )}
      />

      <div className="glass animate-glow relative overflow-hidden rounded-[2rem] border-white/10 p-6 shadow-2xl shadow-black/60">
        {connecting && (
          <div className="animate-scan pointer-events-none absolute left-0 h-16 w-full bg-gradient-to-b from-transparent via-brand-gold/15 to-transparent" />
        )}

        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 text-xs font-medium text-white/50">山海经云游令 客户端 v3.0.0 · 仙尊版</span>
          </div>
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold',
              connected
                ? 'bg-emerald-500/15 text-emerald-300'
                : connecting
                  ? 'bg-brand-gold/15 text-brand-gold'
                  : 'bg-white/5 text-white/50',
            )}
          >
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                connected ? 'bg-emerald-400' : connecting ? 'animate-pulse bg-brand-gold' : 'bg-white/40',
              )}
            />
            {connected ? '仙气护体中' : connecting ? '连接中' : '尚未护体'}
          </div>
        </div>

        <div className="flex flex-col items-center py-2">
          <div className="relative">
            {connected && (
              <>
                <span className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-emerald-400/60" />
                <span
                  className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-emerald-400/40"
                  style={{ animationDelay: '0.7s' }}
                />
              </>
            )}
            <button
              onClick={toggle}
              disabled={connecting}
              className={cn(
                'relative flex h-36 w-36 items-center justify-center rounded-full border-4 transition-all duration-500 focus:outline-none',
                connected
                  ? 'border-emerald-400 bg-gradient-to-br from-emerald-500/30 to-emerald-900/40 shadow-[0_0_60px_rgba(52,211,153,0.45)]'
                  : connecting
                    ? 'border-brand-gold bg-gradient-to-br from-brand-gold/20 to-brand-red/20 shadow-[0_0_50px_rgba(245,197,66,0.35)]'
                    : 'border-brand-red/70 bg-gradient-to-br from-brand-red/20 to-ink-3 shadow-[0_0_40px_rgba(225,29,46,0.25)] hover:scale-105 hover:border-brand-red',
              )}
              aria-label={connected ? '断开连接' : '连接'}
            >
              {connecting ? (
                <svg className="h-14 w-14 animate-spin text-brand-gold" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={3} />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
                </svg>
              ) : (
                <svg
                  className={cn('h-14 w-14 transition', connected ? 'text-emerald-300' : 'text-brand-red')}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                >
                  <path d="M12 3v9" />
                  <path d="M6.3 6.3a8 8 0 1 0 11.4 0" />
                </svg>
              )}
            </button>
          </div>

          <div className="mt-4 text-center">
            <div className="text-lg font-bold">
              {connected ? '连接成功 · 欢迎来到蓬莱仙境' : connecting ? '正在腾云 ...' : '点击一键腾云'}
            </div>
            <div className="mono mt-1 text-xs text-white/50">
              {connected
                ? `仙气护体 ${formatClock(elapsed)}`
                : connecting
                  ? '请稍候，仙君正在开启天门'
                  : '你尚在凡间，请稍候'}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-1.5 block text-[11px] font-medium tracking-wider text-white/40 uppercase">
            选择线路
          </label>
          <div className="relative">
            <select
              value={server.id}
              onChange={(event) => selectServer(event.target.value)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-3 pr-10 pl-4 text-sm font-medium outline-none transition focus:border-brand-gold/60"
            >
              <optgroup label="👑 神仙专线" className="bg-ink-2">
                {allLines
                  .filter((line) => line.premium)
                  .map((line) => (
                    <option key={line.id} value={line.id} className="bg-ink-2">
                      {line.flag} {line.name}（{line.sponsor}） · {line.ping}ms
                    </option>
                  ))}
              </optgroup>
              <optgroup label="🌐 标准节点" className="bg-ink-2">
                {allLines
                  .filter((line) => !line.premium)
                  .map((line) => (
                    <option key={line.id} value={line.id} className="bg-ink-2">
                      {line.flag} {line.name} · {line.ping}ms
                    </option>
                  ))}
              </optgroup>
            </select>
            <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-white/40">▾</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-[10px] tracking-wider text-white/40 uppercase">您的 IP</div>
            <div className="mono mt-1 truncate text-sm font-semibold">
              {connected ? server.ipAfter : '118.26.xx.xx'}
            </div>
            <div className="mt-0.5 truncate text-[11px] text-white/50">
              {connected ? server.ipLocation : '九州仙域 · 河北 · 云游驿站 3 号机'}
            </div>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-[10px] tracking-wider text-white/40 uppercase">实时速率</div>
            <div className="mono mt-1 flex items-baseline gap-1 text-sm font-semibold">
              <span className="text-emerald-300">↓</span>
              {connected ? down.toLocaleString() : '0'}
              <span className="text-[10px] text-white/40">Mbps</span>
            </div>
            <div className="mono flex items-baseline gap-1 text-[11px] text-white/60">
              <span className="text-brand-gold">↑</span>
              {connected ? up.toLocaleString() : '0'}
              <span className="text-[10px] text-white/40">Mbps</span>
            </div>
          </div>
        </div>

        <div
          ref={logRef}
          className="mono mt-4 h-28 overflow-y-auto rounded-xl border border-white/5 bg-black/40 p-3 text-[11px] leading-relaxed text-emerald-300/80"
        >
          {logs.map((line, index) => (
            <div key={index} className="animate-fade-up">
              <span className="text-white/30">[{String(index).padStart(2, '0')}]</span> {line}
            </div>
          ))}
          <span className="animate-blink inline-block h-3 w-1.5 bg-emerald-300/70 align-middle" />
        </div>
      </div>
    </div>
  );
}
