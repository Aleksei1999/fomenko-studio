import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EMAIL, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: 'How Fomenko uses the information you send through this website.',
  alternates: { canonical: `${SITE_URL}/privacy/` },
};

export default function Privacy() {
  return (
    <>
      <Header />
      <main id="main" className="pb-[clamp(4rem,8vw,7rem)] pt-[clamp(7rem,12vw,10rem)]">
        <article className="wrap max-w-[52rem] [&_h2]:mt-12 [&_h2]:text-[length:var(--step-1)] [&_h2]:font-medium [&_li]:mt-2 [&_p]:mt-4 [&_p]:text-ink-2 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-ink-2">
          <h1 className="display text-[length:var(--step-4)]">Privacy notice</h1>
          <p>Last updated: October 2026</p>

          <h2>Who is responsible for your data</h2>
          <p>
            The data controller is Alex Fomenko, trading as Fomenko. You can contact me about
            anything in this notice at <a className="underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>

          <h2>What I collect</h2>
          <p>When you fill in the quote form, I receive:</p>
          <ul>
            <li>your name, email address and, if you give it, your phone number;</li>
            <li>your business name and current website;</li>
            <li>your answers about the project, budget and timeline.</li>
          </ul>
          <p>
            This website does not use advertising or tracking cookies. If you email me directly, I
            receive whatever you include in your email.
          </p>

          <h2>Why I use it and the legal basis</h2>
          <p>
            I use your details only to reply to your enquiry, send you the welcome pack, prepare a
            quote and, if you go ahead, deliver your project. The legal basis is your consent, which
            you give by ticking the box on the form, and steps taken at your request before
            entering into a contract (UK GDPR Article 6(1)(a) and (b)).
          </p>
          <p>I will never sell your data or add you to a mailing list without asking.</p>

          <h2>Who else handles it</h2>
          <p>
            Form submissions are delivered to my inbox by FormSubmit (formsubmit.co), and email is
            handled by Google (Gmail). These services process the data on my behalf and may store it
            outside the UK, under safeguards such as standard contractual clauses.
          </p>

          <h2>How long I keep it</h2>
          <p>
            If you do not become a client, I delete your enquiry within 12 months. If you do,
            project and invoicing records are kept for six years to meet UK tax rules.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete the data I hold about you, object to how I use it,
            or withdraw your consent at any time by emailing {EMAIL}. I will respond within one
            month.
          </p>
          <p>
            If you are unhappy with how your data has been handled, you can complain to the
            Information Commissioner&rsquo;s Office at ico.org.uk or on 0303 123 1113.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
