'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
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
      className="relative bg-[#f1eeea] text-ink"
      style={{ height: reduce ? '100svh' : '300svh' }}
    >
      <div className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden">
        {/* кадр как на сайте LEONERO: модель целиком, по центру, стоит на нижнем крае */}
        <div className="absolute bottom-0 left-1/2 aspect-video h-[54svh] -translate-x-1/2 md:left-[72%] md:h-[90svh]">
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
                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out"
                style={{ opacity: i === look ? 1 : 0 }}
              />
            ))}
          </motion.div>
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(241,238,234,0.9)_0%,rgba(241,238,234,0)_30%)] md:bg-[linear-gradient(to_right,rgba(241,238,234,0.85)_0%,rgba(241,238,234,0)_38%)]"
        />

        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="wrap absolute inset-x-0 top-20 md:inset-y-0 md:flex md:flex-col md:justify-center"
        >
          <h1 className="display max-w-[13ch] text-[length:var(--step-5)]">
            Websites with a sense of occasion.
          </h1>
          <div className="mt-7 flex flex-col gap-7">
            <p className="max-w-[30rem] text-[length:var(--step-1)] leading-snug text-ink-2">
              Custom-coded, scroll-driven websites for UK businesses. Designed and built by Alex
              Fomenko, quoted up front, live in days.
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
            className="wrap absolute inset-x-0 top-20 md:inset-y-0 md:flex md:flex-col md:justify-center"
          >
            <p className="label text-ink-2">What you just scrolled through</p>
            <p className="display mt-3 max-w-[14ch] text-[length:var(--step-4)]">
              LEONERO, one of our builds.
            </p>
            <p className="mt-5 max-w-[28rem] text-ink-2">
              A fur label&apos;s storefront where each piece is tried on the model as you scroll.
              Hand-coded, with colour and size selection on every product.
            </p>
          </motion.div>
        )}

        {!reduce && (
          <p className="label absolute right-[var(--gutter)] top-24 hidden text-ink-2 md:block">
            {String(look + 1).padStart(2, '0')} / {String(LOOKS.length).padStart(2, '0')} ·{' '}
            {LOOKS[look].name}
          </p>
        )}
      </div>
    </section>
  );
}
