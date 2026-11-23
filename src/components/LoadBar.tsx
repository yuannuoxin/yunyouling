import { cn } from '../lib/cn.ts';

export function LoadBar({ load }: { load: number }) {
  const color = load < 30 ? 'bg-emerald-400' : load < 70 ? 'bg-brand-gold' : 'bg-brand-red';

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
        <div className={cn('h-full rounded-full', color)} style={{ width: `${Math.max(load, 2)}%` }} />
      </div>
      <span className="mono text-[11px] text-white/50">{load}%</span>
    </div>
  );
}
