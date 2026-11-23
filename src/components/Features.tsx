import { comparisons, features } from '../data/content.ts';
import { SectionHeading } from './SectionHeading.tsx';

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-red/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="核心功能 · FEATURES"
          title={
            <>
              别人有的我们都有，
              <br className="hidden sm:block" />
              别人没有的<span className="text-gradient-gold">我们也敢写</span>
            </>
          }
          desc="每一项功能都经过仙君亲自点化。拍板的时候很用力，所以可信度很高。"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass group relative overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-gold/30"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-brand-red/0 blur-2xl transition duration-500 group-hover:bg-brand-red/20" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 text-3xl shadow-inner ring-1 ring-white/10 transition group-hover:scale-110 group-hover:rotate-6">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass mt-14 overflow-hidden rounded-3xl">
          <div className="grid divide-y divide-white/5 md:grid-cols-4 md:divide-x md:divide-y-0">
            {comparisons.map((row) => (
              <div key={row.k} className="p-6">
                <div className="text-xs font-semibold tracking-wider text-white/40 uppercase">{row.k}</div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-white/40">其他 云游令</span>
                  <span className="text-white/60 line-through">{row.them}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-brand-gold">山海经云游令</span>
                  <span className="font-bold text-white">{row.us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
