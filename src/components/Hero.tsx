'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { asset } from '@/lib/site';

const LOOKS = [
  { slug: 'noir', name: 'Noir cape' },
  { slug: 'ivory', name: 'Ivory cape' },
  { slug: 'leopard', name: 'Leopard cape' },
  { slug: 'grey', name: 'Grey jacket' },
  { slug: 'brown', name: 'Brown jacket' },
  { slug: 'taupe', name: 'Taupe cape' },
  { slug: 'olive', name: 'Olive cape' },
  { slug: 'vest-black', name: 'Black vest' },
];
const lookSrc = (slug: string) => asset(`/hero-le/${slug}.webp`);

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [look, setLook] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const introOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const outroOpacity = useTransform(scrollYProgress, [0.6, 0.78, 1], [0, 1, 1]);
  const outroY = useTransform(scrollYProgress, [0.6, 0.78], [40, 0]);
  const modelScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reduce) return;
    // последние кадры держим на одной вещи, пока выезжает подпись
    const i = Math.min(LOOKS.length - 1, Math.floor((p / 0.85) * LOOKS.length));
    if (i !== look) setLook(i);
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-night text-on-night"
      style={{ height: reduce ? '100svh' : '300svh' }}
    >
      <div className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden">
        {/* мягкий свет за моделью, чтобы мех не терялся на тёмном фоне */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(55%_65%_at_50%_45%,#3a342c_0%,#1d1b17_55%,#12110e_100%)] md:bg-[radial-gradient(38%_70%_at_70%_50%,#3a342c_0%,#1d1b17_55%,#12110e_100%)]"
        />
        <motion.div
          style={{ scale: reduce ? 1 : modelScale }}
          className="absolute inset-0 origin-bottom"
        >
          {LOOKS.map((l, i) => (
            <img
              key={l.slug}
              src={lookSrc(l.slug)}
              alt={i === 0 ? 'Model in a LEONERO fur piece' : ''}
              aria-hidden={i !== 0}
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute left-1/2 top-[9svh] h-[64svh] w-auto max-w-none -translate-x-1/2 transition-opacity duration-500 ease-out [mask-image:linear-gradient(to_bottom,black_78%,transparent)] md:left-auto md:right-[-26%] md:top-auto md:bottom-0 md:h-[100svh] md:translate-x-0"
              style={{ opacity: i === look ? 1 : 0 }}
            />
          ))}
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,17,14,0.92)_0%,rgba(18,17,14,0.55)_35%,rgba(18,17,14,0)_65%)] md:bg-[linear-gradient(to_top,rgba(18,17,14,0.9)_0%,rgba(18,17,14,0)_22%),linear-gradient(to_right,rgba(18,17,14,0.85)_0%,rgba(18,17,14,0.4)_40%,rgba(18,17,14,0)_60%)]"
        />

        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="wrap absolute inset-x-0 bottom-0 pb-[max(2.5rem,7svh)]"
        >
          <h1 className="display max-w-[13ch] text-[length:var(--step-5)]">
            Websites with a sense of occasion.
          </h1>
          <div className="mt-7 flex flex-col gap-7">
            <p className="max-w-[30rem] text-[length:var(--step-1)] leading-snug text-on-night/85">
              Custom-coded, scroll-driven websites for UK businesses. Designed and built by Alex
              Fomenko, quoted up front, live in weeks.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/get-started/" className="btn btn-primary">
                Get a quote
              </Link>
              <Link href="/#work" className="btn btn-ghost">
                See the work
              </Link>
            </div>
          </div>
        </motion.div>

        {!reduce && (
          <motion.div
            style={{ opacity: outroOpacity, y: outroY }}
            className="wrap absolute inset-x-0 bottom-0 pb-[max(2.5rem,7svh)]"
          >
            <p className="label text-on-night/70">What you just scrolled through</p>
            <p className="display mt-3 max-w-[14ch] text-[length:var(--step-4)]">
              LEONERO, one of our builds.
            </p>
            <p className="mt-5 max-w-[28rem] text-on-night/80">
              A fur label&apos;s storefront where each piece is tried on the model as you scroll.
              Hand-coded, with colour and size selection on every product.
            </p>
          </motion.div>
        )}

        {!reduce && (
          <p className="label absolute right-[var(--gutter)] top-24 hidden text-on-night/60 md:block">
            {String(look + 1).padStart(2, '0')} / {String(LOOKS.length).padStart(2, '0')} ·{' '}
            {LOOKS[look].name}
          </p>
        )}
      </div>
    </section>
  );
}
