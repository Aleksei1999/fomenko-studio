import Link from 'next/link';
import { CARE, FAQ, STEPS, TIERS } from '@/lib/content';
import { asset, EMAIL, FOUNDER_PHOTO, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/site';
import Reveal from './Reveal';

const FACTS = [
  { title: 'Custom code, no builders', text: 'No Wix, Webflow or Framer. Every page is written for your business.' },
  { title: 'Lighthouse 90+ target', text: 'Speed is part of the brief, checked before launch.' },
  { title: 'Fixed quote', text: 'One price in writing before we start. 50% deposit, balance at launch.' },
  { title: 'UK time zone friendly', text: 'Calls in UK hours and a reply within 24 hours on working days.' },
];

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="border-b border-line py-[clamp(5rem,10vw,9rem)]">
      <div className="wrap grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <h2 id="intro-title" className="display text-[length:var(--step-3)] leading-[1.08]">
            Most small business websites look like the template they came from. Yours should look
            like your business.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-4 md:pt-3">
          <p className="text-ink-2">
            Fomenko is a one-person web studio. I design and hand-code websites on my own code
            system, with AI doing the slow parts, so a bespoke site takes weeks rather than months.
          </p>
        </Reveal>
        <ul className="grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 md:col-span-12 lg:grid-cols-4">
          {FACTS.map((f) => (
            <li key={f.title} className="bg-paper p-6">
              <p className="font-medium">{f.title}</p>
              <p className="mt-2 text-[length:var(--step--1)] text-ink-2">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="bg-night py-[clamp(5rem,10vw,9rem)] text-on-night"
    >
      <div className="wrap">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="process-title" className="display text-[length:var(--step-4)]">
            How it works
          </h2>
          <p className="max-w-[26rem] text-on-night-2">
            Four stages, one person the whole way through. You always know what happens next and
            what it costs.
          </p>
        </Reveal>
        <ol className="mt-[clamp(3rem,6vw,5rem)] grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.08} className="border-t border-line-night pt-6">
                <p className="label text-on-night-2">{s.when}</p>
                <h3 className="display mt-4 text-[length:var(--step-2)]">{s.title}</h3>
                <p className="mt-4 text-on-night-2">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Tick() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="mt-[0.35em] h-3.5 w-3.5 shrink-0">
      <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-[clamp(5rem,10vw,9rem)]">
      <div className="wrap">
        <Reveal className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
          <h2 id="pricing-title" className="display text-[length:var(--step-4)]">
            Pricing
          </h2>
          <p className="max-w-[28rem] text-ink-2">
            Real numbers, so you can plan. Every project gets a fixed quote before we start, and a
            50% deposit books your slot.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <article
                className={`flex h-full flex-col rounded-[6px] border p-[clamp(1.5rem,2.5vw,2.25rem)] ${
                  t.featured ? 'border-ink bg-ink text-on-night' : 'border-line bg-paper'
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[length:var(--step-1)] font-medium">{t.name}</h3>
                  {t.featured && <p className="label text-on-night-2">Recommended</p>}
                </div>
                <p className={`mt-2 ${t.featured ? 'text-on-night-2' : 'text-ink-2'}`}>{t.blurb}</p>
                <p className="display mt-8 text-[length:var(--step-4)]">
                  {t.from && (
                    <span className="mr-2 align-middle font-sans text-[length:var(--step-0)] tracking-normal">
                      from
                    </span>
                  )}
                  {t.price}
                </p>
                <p className={`mt-3 ${t.featured ? 'text-on-night-2' : 'text-ink-2'}`}>
                  Typically {t.timeline}
                </p>
                <p className={`label mt-8 border-t pt-6 ${t.featured ? 'border-line-night text-on-night-2' : 'border-line text-ink-2'}`}>
                  What&rsquo;s included
                </p>
                <ul className="mt-4 flex flex-1 flex-col gap-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Tick />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/get-started/"
                  className={`btn mt-9 w-full ${t.featured ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Get a quote
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4">
          <article className="grid gap-6 rounded-[6px] bg-paper-2 p-[clamp(1.5rem,2.5vw,2.25rem)] md:grid-cols-12 md:items-center">
            <div className="md:col-span-4">
              <h3 className="text-[length:var(--step-1)] font-medium">{CARE.name}</h3>
              <p className="display mt-3 text-[length:var(--step-3)]">
                {CARE.price}
                <span className="ml-1 font-sans text-[length:var(--step-0)] tracking-normal">
                  {CARE.per}
                </span>
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 md:col-span-8">
              {CARE.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <Tick />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <p className="mt-8 max-w-[44rem] text-ink-2">
          <strong className="font-medium text-ink">Fixed quote before we start.</strong> The price
          you agree is the price you pay. If you ask for something outside the agreed scope, you
          get a separate quote first.
        </p>
      </div>
    </section>
  );
}

export function Founder() {
  return (
    <section aria-labelledby="founder-title" className="border-t border-line py-[clamp(5rem,10vw,9rem)]">
      <div className="wrap grid gap-10 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-5">
          {FOUNDER_PHOTO ? (
            <img
              src={asset(FOUNDER_PHOTO)}
              alt="Alex Fomenko"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[6px] object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="flex aspect-[4/5] w-full items-center justify-center rounded-[6px] bg-paper-2"
            >
              <span className="display text-[clamp(5rem,14vw,11rem)] text-ink/80">AF</span>
            </div>
          )}
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <h2 id="founder-title" className="display text-[length:var(--step-4)]">
            Work directly with Alex
          </h2>
          <div className="mt-8 flex flex-col gap-5 text-[length:var(--step-1)] leading-snug">
            <p>
              The person who quotes your project designs it, writes the code and answers your
              emails. No account managers and no hand-offs.
            </p>
            <p className="text-ink-2">
              I build on my own code system and use AI for the repetitive parts. That is how a
              site like Copper Garden gets made by one person, and why your project is not waiting
              in an agency queue.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="link-arrow">
              Instagram {INSTAGRAM_HANDLE} <span aria-hidden>→</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="link-arrow">
              {EMAIL}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-[clamp(5rem,10vw,9rem)]">
      <div className="wrap grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <h2 id="faq-title" className="display text-[length:var(--step-4)]">
            Questions
          </h2>
          <p className="mt-6 max-w-[22rem] text-ink-2">
            Anything else, email{' '}
            <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
              {EMAIL}
            </a>
            .
          </p>
        </Reveal>
        <div className="md:col-span-8">
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b border-line first:border-t">
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-[length:var(--step-1)] leading-snug">
                <span>{f.q}</span>
                <svg aria-hidden viewBox="0 0 20 20" className="faq-icon mt-1 h-5 w-5 shrink-0">
                  <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </summary>
              <p className="max-w-[44rem] pb-7 pr-10 text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-night py-[clamp(5rem,12vw,10rem)] text-on-night">
      <div className="wrap">
        <Reveal>
          <h2 id="cta-title" className="display max-w-[14ch] text-[length:var(--step-5)]">
            Tell me about your project.
          </h2>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[30rem] text-[length:var(--step-1)] leading-snug text-on-night-2">
              Six short questions, about two minutes. You get a welcome pack straight away and a
              personal reply within 24 hours.
            </p>
            <Link href="/get-started/" className="btn btn-primary self-start md:self-auto">
              Start your quote <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
