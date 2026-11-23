import { useState } from 'react';
import { faq } from '../data/content.ts';
import { cn } from '../lib/cn.ts';
import { SectionHeading } from './SectionHeading.tsx';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="常见问题 · FAQ"
          title={
            <>
              你想问的，<span className="text-gradient-gold">本仙都知道</span>
            </>
          }
          desc="以下问题由客服部（仙君侍从）整理。没找到答案？那就是你不该问。"
        />

        <div className="mt-12 space-y-3">
          {faq.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.q}
                className={cn(
                  'glass overflow-hidden rounded-2xl transition',
                  open && 'border-brand-gold/30 bg-white/[0.06]',
                )}
              >
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  <span className="mono text-xs text-brand-red">Q{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-base font-semibold">{item.q}</span>
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-lg transition-transform duration-300',
                      open && 'rotate-45 bg-brand-red text-white',
                    )}
                  >
                    +
                  </span>
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pl-16 text-sm leading-relaxed text-white/65">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
