'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { asset } from '@/lib/site';

const FRAMES = 60;
const frameSrc = (i: number) => asset(`/hero/${String(i).padStart(2, '0')}.webp`);

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const current = useRef(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const introOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.32], [0, -60]);
  const outroOpacity = useTransform(scrollYProgress, [0.55, 0.72, 0.95, 1], [0, 1, 1, 1]);
  const outroY = useTransform(scrollYProgress, [0.55, 0.72], [40, 0]);
  const shade = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1, 0.35, 0.8, 0.8]);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let img: HTMLImageElement | null = null;
    for (let d = 0; d < FRAMES && !img; d++) {
      img = images.current[index - d] ?? images.current[index + d] ?? null;
      if (img && !img.complete) img = null;
    }
    if (!img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(current.current);
    };
    resize();
    window.addEventListener('resize', resize);

    let cancelled = false;
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (!cancelled) {
            images.current[i] = img;
            if (Math.abs(i - current.current) < 2) draw(current.current);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameSrc(i);
      });

    // первый кадр уже стоит картинкой, остальные догружаем после загрузки страницы
    const start = async () => {
      await load(0);
      for (let i = 1; i < FRAMES && !cancelled; i += 4) {
        await Promise.all([i, i + 1, i + 2, i + 3].filter((n) => n < FRAMES).map(load));
      }
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resize);
      window.removeEventListener('load', start);
    };
  }, [reduce]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reduce) return;
    const i = Math.min(FRAMES - 1, Math.round(p * (FRAMES - 1)));
    if (i === current.current) return;
    current.current = i;
    draw(i);
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-night text-on-night"
      style={{ height: reduce ? '100svh' : '260svh' }}
    >
      <div className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden">
        <img
          src={frameSrc(0)}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!reduce && <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />}
        <motion.div
          aria-hidden
          style={{ opacity: shade }}
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,17,14,0.92)_0%,rgba(18,17,14,0.55)_45%,rgba(18,17,14,0.15)_75%,rgba(18,17,14,0.35)_100%)]"
        />

        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="wrap absolute inset-x-0 bottom-0 pb-[max(2.5rem,7svh)]"
        >
          <h1 className="display max-w-[13ch] text-[length:var(--step-5)]">
            Websites with a sense of occasion.
          </h1>
          <div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[34rem] text-[length:var(--step-1)] leading-snug text-on-night/85">
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
            <p className="display mt-3 max-w-[16ch] text-[length:var(--step-4)]">
              Copper Garden, one of our builds.
            </p>
            <p className="mt-5 max-w-[30rem] text-on-night/80">
              A residential concept where the camera flies into an apartment as you scroll. Frame
              sequences on canvas, written by hand.
            </p>
          </motion.div>
        )}

        {!reduce && (
          <motion.p
            style={{ opacity: introOpacity }}
            className="label absolute right-[var(--gutter)] top-24 hidden text-on-night/60 md:block"
          >
            Scroll
          </motion.p>
        )}
      </div>
    </section>
  );
}
