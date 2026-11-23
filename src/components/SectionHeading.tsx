import type { ReactNode } from 'react';
import { cn } from '../lib/cn.ts';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
  align?: 'center' | 'left';
}

export function SectionHeading({ eyebrow, title, desc, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-brand-red uppercase">
        <span className="h-px w-6 bg-brand-red" />
        {eyebrow}
        <span className="h-px w-6 bg-brand-red" />
      </div>
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {desc && <p className={cn('mt-4 text-base leading-relaxed text-white/55')}>{desc}</p>}
    </div>
  );
}
