'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EMAIL, FORM_ENDPOINT } from '@/lib/site';

const GOALS = [
  'Get enquiries',
  'Take bookings',
  'Sell online',
  'Showcase my work',
  'Publish a blog or news',
  'Let me edit it myself',
];
const BUDGETS = ['Under £1.5k', '£1.5–4k', '£4–10k', '£10k+', 'Not sure yet'];
const TIMELINES = ['As soon as possible', 'In 1–2 months', 'I’m flexible'];

const WELCOME = `Thanks for getting in touch. This is your Fomenko welcome pack.

What happens next
1. I read your answers myself and reply within 24 hours on working days.
2. We have a short call to go through the details.
3. You get a fixed quote and timeline in writing. Nothing starts until you are happy with it.

Prices
- Landing page: £1,500, typically 1–2 weeks
- Business website: £3,500, typically 2–4 weeks
- Premium cinematic website: from £7,500, typically 4–8 weeks
- Hosting + care plan: £120/month
A 50% deposit books your slot and the balance is due at launch.

Recent work
- Copper Garden: https://aleksei1999.github.io/copper-garden/
- LEONERO: https://aleksei1999.github.io/leonero-en/

Speak soon,
Alex Fomenko
${EMAIL} · instagram.com/create.fomenko`;

type Answers = {
  business: string;
  website: string;
  goals: string[];
  budget: string;
  timeline: string;
  details: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
  honey: string;
};

const EMPTY: Answers = {
  business: '',
  website: '',
  goals: [],
  budget: '',
  timeline: '',
  details: '',
  name: '',
  email: '',
  phone: '',
  consent: false,
  honey: '',
};

const STEP_TITLES = [
  'Your business',
  'What must the site do?',
  'What budget do you have in mind?',
  'When do you need it?',
  'Tell me about the project',
  'Where should I reply?',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stepError(step: number, a: Answers): string | null {
  switch (step) {
    case 0:
      return a.business.trim() ? null : 'Please enter your business name.';
    case 1:
      return a.goals.length ? null : 'Pick at least one option.';
    case 2:
      return a.budget ? null : 'Pick a budget range, or choose “Not sure yet”.';
    case 3:
      return a.timeline ? null : 'Pick a timeline.';
    case 4:
      return a.details.trim().length >= 10 ? null : 'A sentence or two is enough.';
    case 5:
      if (!a.name.trim()) return 'Please enter your name.';
      if (!EMAIL_RE.test(a.email.trim())) return 'Please enter a valid email address.';
      if (!a.consent) return 'Please tick the box so I can reply to you.';
      return null;
    default:
      return null;
  }
}

function summary(a: Answers) {
  return [
    `Business: ${a.business}`,
    `Current website: ${a.website || '—'}`,
    `The site must: ${a.goals.join(', ')}`,
    `Budget: ${a.budget}`,
    `Timeline: ${a.timeline}`,
    `Project: ${a.details}`,
    `Name: ${a.name}`,
    `Email: ${a.email}`,
    `Phone: ${a.phone || '—'}`,
  ].join('\n');
}

const inputCls =
  'mt-2 block w-full rounded-[6px] border border-line bg-paper px-4 py-3.5 text-ink placeholder:text-ink-2/60 focus:border-ink focus:outline-none';

function Choice({
  type,
  name,
  label,
  checked,
  onChange,
}: {
  type: 'radio' | 'checkbox';
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-[6px] border px-4 py-3 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
        checked ? 'border-ink bg-ink text-on-night' : 'border-line bg-paper hover:border-ink-2'
      }`}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden
        className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
          type === 'radio' ? 'rounded-full' : 'rounded-[3px]'
        } ${checked ? 'border-on-night' : 'border-ink-2'}`}
      >
        {checked && (
          <span className={`h-2.5 w-2.5 bg-on-night ${type === 'radio' ? 'rounded-full' : 'rounded-[1px]'}`} />
        )}
      </span>
      <span>{label}</span>
    </label>
  );
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(EMPTY);
  const [showError, setShowError] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const touched = useRef(false);
  const total = STEP_TITLES.length;

  useEffect(() => {
    if (!touched.current) return;
    const el = headingRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const top = el.getBoundingClientRect().top;
    if (top < 120) window.scrollBy({ top: top - 160, behavior: 'smooth' });
  }, [step, status]);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => setA((p) => ({ ...p, [key]: value }));
  const toggleGoal = (g: string) =>
    set('goals', a.goals.includes(g) ? a.goals.filter((x) => x !== g) : [...a.goals, g]);

  const error = stepError(step, a);

  const submit = async () => {
    setStatus('sending');
    const payload = {
      _subject: `New website enquiry — ${a.business.trim()}`,
      _template: 'table',
      _replyto: a.email.trim(),
      _autoresponse: WELCOME,
      _honey: a.honey,
      business: a.business.trim(),
      website: a.website.trim() || '—',
      goals: a.goals.join(', '),
      budget: a.budget,
      timeline: a.timeline,
      details: a.details.trim(),
      name: a.name.trim(),
      email: a.email.trim(),
      phone: a.phone.trim() || '—',
      consent: 'Agreed to be contacted about this enquiry',
    };
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      // FormSubmit отвечает 200 и success:"false", пока адрес не активирован
      if (!res.ok || String(data.success) !== 'true') throw new Error('not delivered');
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  const next = (e?: React.FormEvent) => {
    e?.preventDefault();
    touched.current = true;
    if (error) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (step < total - 1) setStep(step + 1);
    else submit();
  };

  const back = () => {
    touched.current = true;
    setShowError(false);
    setStep((s) => Math.max(0, s - 1));
  };

  if (status === 'sent' || status === 'failed') {
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `New website enquiry — ${a.business.trim()}`,
    )}&body=${encodeURIComponent(summary(a))}`;
    return (
      <div className="rounded-[6px] border border-line bg-paper p-[clamp(1.5rem,4vw,3rem)]" aria-live="polite">
        {status === 'sent' ? (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="display text-[length:var(--step-3)] focus:outline-none">
              Thanks — your welcome pack is on its way.
            </h2>
            <p className="mt-5 text-[length:var(--step-1)] leading-snug text-ink-2">
              I&rsquo;ll reply within 24 hours. Keep an eye on {a.email.trim()}, and check spam if
              nothing arrives.
            </p>
            <Link href="/#work" className="link-arrow mt-8">
              Back to the work <span aria-hidden>→</span>
            </Link>
          </>
        ) : (
          <>
            <h2 ref={headingRef} tabIndex={-1} className="display text-[length:var(--step-3)] focus:outline-none">
              That didn&rsquo;t send, sorry.
            </h2>
            <p className="mt-5 text-[length:var(--step-1)] leading-snug text-ink-2">
              Your answers are safe. Press the button below and your email app will open with
              everything filled in, ready to send to {EMAIL}.
            </p>
            <a href={mailto} className="btn btn-primary mt-8">
              Send by email instead
            </a>
          </>
        )}
      </div>
    );
  }

  const pct = Math.round((step / total) * 100);

  return (
    <form onSubmit={next} noValidate className="rounded-[6px] border border-line bg-paper">
      <div className="border-b border-line p-[clamp(1.25rem,3vw,2rem)]">
        <div className="flex items-center justify-between text-[length:var(--step--1)] text-ink-2">
          <span>
            Step {step + 1} of {total}
          </span>
          <span>{pct}% done</span>
        </div>
        <div
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={step}
          className="mt-3 h-1 overflow-hidden rounded-full bg-paper-2"
        >
          <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${Math.max(pct, 3)}%` }} />
        </div>
      </div>

      <div className="p-[clamp(1.25rem,3vw,2rem)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.fieldset
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="min-w-0"
          >
            <legend className="contents">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="display text-[length:var(--step-2)] focus:outline-none"
              >
                {STEP_TITLES[step]}
              </h2>
            </legend>

            <div className="mt-6">
              {step === 0 && (
                <div className="flex flex-col gap-6">
                  <label className="block">
                    <span className="font-medium">Business name *</span>
                    <input
                      className={inputCls}
                      value={a.business}
                      onChange={(e) => set('business', e.target.value)}
                      placeholder="e.g. Oak Lane Joinery"
                      autoComplete="organization"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="font-medium">Current website</span>
                    <span className="ml-2 text-ink-2">optional</span>
                    <input
                      className={inputCls}
                      value={a.website}
                      onChange={(e) => set('website', e.target.value)}
                      placeholder="yourbusiness.co.uk"
                      inputMode="url"
                      autoComplete="url"
                    />
                  </label>
                </div>
              )}

              {step === 1 && (
                <>
                  <p className="-mt-2 mb-5 text-ink-2">Choose everything that applies.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {GOALS.map((g) => (
                      <Choice
                        key={g}
                        type="checkbox"
                        name="goals"
                        label={g}
                        checked={a.goals.includes(g)}
                        onChange={() => toggleGoal(g)}
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="-mt-2 mb-5 text-ink-2">
                    A rough range helps me suggest the right option. Landing pages start at £1,500.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {BUDGETS.map((b) => (
                      <Choice
                        key={b}
                        type="radio"
                        name="budget"
                        label={b}
                        checked={a.budget === b}
                        onChange={() => set('budget', b)}
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="grid gap-3">
                  {TIMELINES.map((t) => (
                    <Choice
                      key={t}
                      type="radio"
                      name="timeline"
                      label={t}
                      checked={a.timeline === t}
                      onChange={() => set('timeline', t)}
                    />
                  ))}
                </div>
              )}

              {step === 4 && (
                <label className="block">
                  <span className="text-ink-2">
                    What do you do, who are your customers, and what is not working with your current
                    site? Links to sites you like are very useful.
                  </span>
                  <textarea
                    className={`${inputCls} min-h-44 resize-y leading-relaxed`}
                    value={a.details}
                    onChange={(e) => set('details', e.target.value)}
                    placeholder="We’re a family-run kitchen fitter in Leeds. Our site is five years old, slow on phones and doesn’t show our best projects. We’d like more enquiries for full kitchen refits. I like the feel of…"
                  />
                </label>
              )}

              {step === 5 && (
                <div className="flex flex-col gap-6">
                  <label className="block">
                    <span className="font-medium">Your name *</span>
                    <input
                      className={inputCls}
                      value={a.name}
                      onChange={(e) => set('name', e.target.value)}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="font-medium">Email *</span>
                    <input
                      className={inputCls}
                      type="email"
                      value={a.email}
                      onChange={(e) => set('email', e.target.value)}
                      autoComplete="email"
                      inputMode="email"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="font-medium">Phone</span>
                    <span className="ml-2 text-ink-2">optional</span>
                    <input
                      className={inputCls}
                      type="tel"
                      value={a.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      autoComplete="tel"
                      placeholder="07…"
                    />
                  </label>
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="hidden"
                    value={a.honey}
                    onChange={(e) => set('honey', e.target.value)}
                  />
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={a.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-[var(--ink)]"
                    />
                    <span>
                      I agree to be contacted about my enquiry. See the{' '}
                      <Link href="/privacy/" className="underline underline-offset-4" target="_blank">
                        privacy notice
                      </Link>
                      .
                    </span>
                  </label>
                </div>
              )}
            </div>
          </motion.fieldset>
        </AnimatePresence>

        <p role="alert" className="mt-5 min-h-6 text-[length:var(--step--1)] text-accent">
          {showError && error ? error : ''}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line p-[clamp(1.25rem,3vw,2rem)]">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="btn btn-ghost disabled:pointer-events-none disabled:opacity-30"
        >
          Back
        </button>
        <button type="submit" disabled={status === 'sending'} className="btn btn-primary min-w-32 disabled:opacity-60">
          {step === total - 1 ? (status === 'sending' ? 'Sending…' : 'Send enquiry') : 'Next'}
        </button>
      </div>
    </form>
  );
}
