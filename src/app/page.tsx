import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Work from '@/components/Work';
import Footer from '@/components/Footer';
import { Faq, FinalCta, Founder, Intro, Pricing, Process } from '@/components/Sections';

export default function Home() {
  return (
    <>
      <Header overHero />
      <main id="main">
        <Hero />
        <Intro />
        <Work />
        <Process />
        <Pricing />
        <Founder />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
