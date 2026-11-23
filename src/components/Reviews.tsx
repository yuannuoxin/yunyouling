import { reviews, reviewStats } from '../data/content.ts';
import { SectionHeading } from './SectionHeading.tsx';

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 text-sm">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < value ? 'text-brand-gold' : 'text-white/15'}>
          ★
        </span>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="用户评价 · REVIEWS"
          title={
            <>
              14 亿用户，<span className="text-gradient-red">好评率 100%</span>
            </>
          }
          desc="以下评价均为真实用户自愿发表（差评已被自愿删除）。"
        />

        <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="glass mb-6 break-inside-avoid rounded-3xl p-6 transition duration-300 hover:border-brand-gold/30"
            >
              <div className="flex items-center justify-between">
                <Stars value={review.rating} />
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-white/50">{review.plan}</span>
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-white/80">“{review.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-red/40 to-brand-gold/40 text-2xl ring-1 ring-white/10">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-bold">{review.name}</div>
                  <div className="text-xs text-white/50">{review.role}</div>
                </div>
                <span className="ml-auto text-[10px] text-emerald-300">✓ 已认证</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {reviewStats.map((stat) => (
            <div key={stat.k} className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-center">
              <div className="text-xs text-white/40">{stat.k}</div>
              <div className="mt-1 text-2xl font-black text-brand-gold">{stat.v}</div>
              <div className="mt-1 text-xs text-white/40">{stat.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
