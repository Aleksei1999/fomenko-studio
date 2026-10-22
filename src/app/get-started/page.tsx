import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Quiz from '@/components/Quiz';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Get a quote',
  description:
    'Six short questions about your project. Get a welcome pack with prices and process, and a personal reply within 24 hours.',
  alternates: { canonical: `${SITE_URL}/get-started/` },
};

const NEXT = [
  'I read your answers myself and reply within 24 hours on working days.',
  'A short call to go through the details.',
  'A fixed quote and timeline in writing. Nothing starts until you agree.',
];

export default function GetStarted() {
  return (
    <>
      <Header />
      <main id="main" className="pb-[clamp(4rem,8vw,7rem)] pt-[clamp(7rem,12vw,10rem)]">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="display text-[length:var(--step-4)]">Let&rsquo;s talk about your website.</h1>
            <p className="mt-6 max-w-[30rem] text-[length:var(--step-1)] leading-snug text-ink-2">
              Answer six quick questions and a welcome pack with prices and process lands in your
              inbox straight away. It takes about two minutes.
            </p>
            <div className="mt-10 hidden border-t border-line pt-8 lg:block">
              <h2 className="label text-ink-2">What happens next</h2>
              <ol className="mt-5 flex flex-col gap-4">
                {NEXT.map((n, i) => (
                  <li key={n} className="flex gap-4">
                    <span className="display w-6 shrink-0 text-[length:var(--step-1)]">{i + 1}</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Quiz />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
