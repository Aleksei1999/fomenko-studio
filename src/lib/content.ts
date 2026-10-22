export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  did: string;
  stack: string[];
  url: string;
  images: { src: string; alt: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'copper-garden',
    title: 'Copper Garden',
    category: 'Real estate',
    summary: 'Residential development concept with a cinematic scroll.',
    did: 'The camera flies from the riverbank into an apartment as you scroll, then stops on the furniture with product callouts and a macro of the upholstery fabric.',
    stack: ['Next.js', 'Canvas frame sequences', 'Framer Motion'],
    url: 'https://aleksei1999.github.io/copper-garden/',
    images: [
      { src: '/work/copper-garden-1.webp', alt: 'Copper Garden home screen: copper towers on a riverbank at dusk' },
      { src: '/work/copper-garden-2.webp', alt: 'Copper Garden: inside the apartment with the headline Welcome home' },
      { src: '/work/copper-garden-3.webp', alt: 'Copper Garden: macro shot of bouclé chair upholstery with fabric details' },
    ],
  },
  {
    slug: 'leonero',
    title: 'LEONERO',
    category: 'Fashion / e-commerce',
    summary: 'Store front for a fur fashion brand.',
    did: 'A quiet, editorial shop: pieces swap on the model as you scroll through the collection, with colour and size selection on every product.',
    stack: ['Next.js', 'Framer Motion', 'Lenis smooth scroll'],
    url: 'https://aleksei1999.github.io/leonero-en/',
    images: [
      { src: '/work/leonero-1.webp', alt: 'LEONERO home screen: The Fur Collection with a model wearing a grey fur cape' },
      { src: '/work/leonero-2.webp', alt: 'LEONERO: grid of customer photos in fur jackets' },
      { src: '/work/leonero-3.webp', alt: 'LEONERO product page: grey jacket with colour and size options' },
    ],
  },
];

export const STEPS = [
  {
    title: 'Quote',
    when: 'Day 1–2',
    text: 'You answer six questions, we have a short call, and you get a fixed price and timeline in writing. Nothing starts until you are happy with it.',
  },
  {
    title: 'Design',
    when: 'Week 1–2',
    text: 'A designed homepage first, so you see the direction on real content before the rest is built. Two rounds of changes are included.',
  },
  {
    title: 'Build',
    when: 'Week 2–6',
    text: 'Hand-written code on my own component system. You get a private preview link and can watch it come together page by page.',
  },
  {
    title: 'Launch & care',
    when: 'Then ongoing',
    text: 'Domain, analytics, speed and SEO checks, then launch. Stay on the care plan for hosting and small edits, or take the code and go.',
  },
];

export type Tier = {
  name: string;
  price: string;
  from?: boolean;
  timeline: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const TIERS: Tier[] = [
  {
    name: 'Landing page',
    price: '£1,500',
    timeline: '1–2 weeks',
    blurb: 'One sharp page for a launch, a service or a campaign.',
    features: [
      'Single scrolling page, custom design',
      'Copy tidied and laid out for you',
      'Enquiry form straight to your inbox',
      'Mobile-first and fast',
      'Basic SEO and analytics set up',
      'Domain connection and launch',
    ],
  },
  {
    name: 'Business website',
    price: '£3,500',
    timeline: '2–4 weeks',
    blurb: 'A complete site that explains what you do and brings in work.',
    featured: true,
    features: [
      'Up to 6 pages, designed from scratch',
      'Enquiries or bookings wired up',
      'Editable sections for news or projects if you need them',
      'SEO foundations: metadata, sitemap, structured data',
      'Google Business Profile and analytics linked',
      'Two rounds of revisions at each stage',
    ],
  },
  {
    name: 'Premium cinematic',
    price: '£7,500',
    from: true,
    timeline: '4–8 weeks',
    blurb: 'A site people remember, like Copper Garden.',
    features: [
      'Everything in Business website',
      'Scroll-driven storytelling and animation',
      '3D or video frame sequences',
      'Art direction for imagery and footage',
      'Performance budget so it still loads fast',
    ],
  },
];

export const CARE = {
  name: 'Hosting + care plan',
  price: '£120',
  per: '/month',
  features: ['Hosting and SSL', 'Updates and security fixes', 'Small edits: text, images, prices', 'Uptime monitoring'],
};

export const FAQ = [
  {
    q: 'How long does a website take?',
    a: 'A landing page usually takes 1–2 weeks, a business website 2–4 weeks and a premium cinematic site 4–8 weeks. The exact timeline goes into your quote, and the biggest variable is how quickly content and feedback come back.',
  },
  {
    q: 'How do payments work?',
    a: 'You get a fixed quote before anything starts. A 50% deposit books your slot and the balance is due at launch. Prices are in pounds sterling and invoices are sent by email.',
  },
  {
    q: 'What if I want changes?',
    a: 'Two rounds of revisions are included at the design stage and again before launch. Small tweaks along the way are fine. If the scope grows, for example extra pages, I will tell you the cost before doing the work.',
  },
  {
    q: 'Why not just use Wix, Squarespace or Webflow?',
    a: 'Builders are fine for a simple page you set up yourself. They get slow, look like a template and make custom motion hard. A hand-coded site loads faster, can do things a builder cannot, and you are not tied to a monthly platform subscription.',
  },
  {
    q: 'Can I edit the site myself?',
    a: 'Yes, where it makes sense. Sections you will change often, such as news, projects or prices, can be made editable. For everything else, small edits are included in the care plan, so you can just send an email.',
  },
  {
    q: 'Who owns the website and the code?',
    a: 'You do. Once the final invoice is paid, the code, design files and domain are yours. You can host it with me on the care plan or move it anywhere you like.',
  },
  {
    q: 'Do you work with businesses across the UK?',
    a: 'Yes. Everything happens remotely, by email, video call and a shared preview link, and I keep to UK working hours. You will get a reply within 24 hours on working days.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Your logo if you have one, any photos, and a rough idea of what each page should say. If copy or imagery is missing, we sort it out together during the design stage.',
  },
];
