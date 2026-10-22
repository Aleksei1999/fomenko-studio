'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/#work', label: 'Work' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Header({ overHero = false }: { overHero?: boolean }) {
  const [dark, setDark] = useState(overHero);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!overHero) return;
    const hero = document.getElementById('hero');
    const onScroll = () => {
      const bottom = hero ? hero.getBoundingClientRect().bottom : 0;
      setDark(bottom > 64);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overHero]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = !dark || open;
  const tone = dark && !open ? 'text-on-night' : 'text-ink';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${tone} ${
        solid ? 'border-b border-line bg-paper/95 backdrop-blur-sm' : 'border-b border-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-[1.6rem] leading-none tracking-tight display" onClick={() => setOpen(false)}>
          fomenko
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="opacity-80 transition-opacity hover:opacity-100">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/get-started/" className="btn btn-primary !min-h-10 !px-4 text-[0.95rem]">
            Get a quote
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform ${
                  open ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform ${
                  open ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="wrap border-t border-line pb-6 md:hidden">
          <ul>
            {NAV.map((n) => (
              <li key={n.href} className="border-b border-line">
                <Link
                  href={n.href}
                  className="block py-4 text-2xl display"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
