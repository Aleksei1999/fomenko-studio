import Link from 'next/link';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-night text-on-night">
      <div className="wrap border-t border-line-night py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="display text-[clamp(3.5rem,12vw,9rem)] leading-[0.85]">fomenko</p>
          <ul className="flex flex-col gap-3 md:items-end">
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="hover:text-on-night-2">
                Instagram {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-on-night-2">
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line-night pt-6 text-[length:var(--step--1)] text-on-night-2 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Fomenko. Websites by Alex Fomenko.</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/#work" className="hover:text-on-night">Work</Link>
            <Link href="/#pricing" className="hover:text-on-night">Pricing</Link>
            <Link href="/get-started/" className="hover:text-on-night">Get a quote</Link>
            <Link href="/privacy/" className="hover:text-on-night">Privacy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
