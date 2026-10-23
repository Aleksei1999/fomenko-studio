import { PROJECTS } from '@/lib/content';
import { asset } from '@/lib/site';
import Reveal from './Reveal';

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-[clamp(5rem,10vw,9rem)]">
      <div className="wrap">
        <Reveal className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
          <h2 id="work-title" className="display text-[length:var(--step-4)]">
            Selected work
          </h2>
          <p className="max-w-[26rem] text-ink-2">
            Live sites you can open and scroll right now. Each one was designed and coded from a
            blank file.
          </p>
        </Reveal>

        <div className="mt-[clamp(3rem,6vw,5rem)] flex flex-col gap-[clamp(4.5rem,9vw,8rem)]">
          {PROJECTS.map((p, idx) => (
            <article key={p.slug} className="grid gap-8 md:grid-cols-12 md:gap-10">
              <Reveal className={`md:col-span-8 ${idx % 2 ? 'md:order-2' : ''}`}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  className="group block overflow-hidden rounded-[6px] bg-night"
                  aria-label={`${p.title}: open the live site in a new tab`}
                >
                  <img
                    src={asset(p.images[0].src)}
                    alt={p.images[0].alt}
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </a>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {p.images.slice(1).map((im) => (
                    <img
                      key={im.src}
                      src={asset(im.src)}
                      alt={im.alt}
                      width={960}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full rounded-[6px] bg-night object-cover"
                    />
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1} className={`md:col-span-4 ${idx % 2 ? 'md:order-1' : ''}`}>
                <div className="md:sticky md:top-28">
                  <p className="label text-ink-2">{p.category}</p>
                  <h3 className="display mt-3 text-[length:var(--step-3)]">{p.title}</h3>
                  <p className="mt-4 text-[length:var(--step-1)] leading-snug">{p.summary}</p>
                  <p className="mt-4 text-ink-2">{p.did}</p>
                  <dl className="mt-6 border-t border-line pt-4 text-[length:var(--step--1)]">
                    <dt className="label text-ink-2">Stack</dt>
                    <dd className="mt-1">{p.stack.join(' · ')}</dd>
                  </dl>
                  <a href={p.url} target="_blank" rel="noopener" className="link-arrow mt-7">
                    View live site <span aria-hidden>→</span>
                  </a>
                </div>
              </Reveal>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
