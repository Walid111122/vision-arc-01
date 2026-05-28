export interface PricingPackage {
  name: string;
  price: string;
  priceNum: number;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

export interface PricingFAQ {
  question: string;
  answer: string;
}

export interface CalculatorItem {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  category: "design" | "web" | "marketing";
}

export const pricingPackages: PricingPackage[] = [
  {
    name: "Startup",
    price: "EGP 15,000",
    priceNum: 15000,
    description: "Launch your business with a stunning, high-performance landing page and basic brand essence.",
    features: [
      "Bespoke Next.js Landing Page",
      "Essential Brand Logo & Typography",
      "Responsive Mobile-First Architecture",
      "Crucial On-Page SEO Foundations",
      "Domain & Deployment Setup",
      "14-Day Delivery Guarantee",
      "Standard Email Support"
    ],
    ctaText: "Choose Startup"
  },
  {
    name: "Growth",
    price: "EGP 30,000",
    priceNum: 30000,
    description: "Scale your reach with a multi-page interactive web application and ad campaign setup.",
    features: [
      "Custom Next.js Website (Up to 5 Pages)",
      "Premium Motion Design & Transitions",
      "Complete Visual Guidelines Package",
      "Headless CMS Integration",
      "Meta & Google Ads Campaign Setup",
      "30-Day Delivery Guarantee",
      "Priority Slack & Email Support"
    ],
    highlighted: true,
    ctaText: "Go for Growth"
  },
  {
    name: "Custom / Bespoke",
    price: "EGP 45,000+",
    priceNum: 45000,
    description: "Uncapped scaling with immersive graphics, deep branding strategy, and ongoing performance marketing.",
    features: [
      "Bespoke Interactive Micro-apps",
      "WebGL / Three.js Immersive Visuals",
      "Full Brand Strategy & Guidelines",
      "Tailored CMS & E-Commerce Infrastructure",
      "Ad Spend & Conversion Optimization",
      "Dedicated Project Manager",
      "24/7 Slack Support & Bi-weekly Syncs"
    ],
    ctaText: "Inquire Custom"
  }
];

export const calculatorOptions: CalculatorItem[] = [
  // Brand / Design Category
  {
    id: "logo_branding",
    name: "Brand Logo & Style Sheet",
    description: "Tailored logo, color palettes, and typography tokens.",
    baseCost: 5000,
    category: "design"
  },
  {
    id: "full_identity",
    name: "Complete Brand Identity Guide",
    description: "Comprehensive corporate guidelines, stationery assets, and strategy guide.",
    baseCost: 10000,
    category: "design"
  },
  
  // Web Category
  {
    id: "single_landing",
    name: "High-Performance Landing Page",
    description: "Bespoke Next.js interactive single-page layout.",
    baseCost: 10000,
    category: "web"
  },
  {
    id: "multi_pages",
    name: "Multi-Page Next.js Site (Up to 5 pages)",
    description: "Standard subpages (About, Services list, Case studies, Contact, etc.).",
    baseCost: 20000,
    category: "web"
  },
  {
    id: "cms_integration",
    name: "CMS / Content Management System",
    description: "Allows editing website content easily using a headless CMS panel (e.g. Sanity).",
    baseCost: 6000,
    category: "web"
  },
  {
    id: "webgl_motion",
    name: "Immersive WebGL & Motion Artistry",
    description: "Nuanced WebGL shader backdrops, Three.js 3D animations, and complex spring animations.",
    baseCost: 12000,
    category: "web"
  },

  // Marketing Category
  {
    id: "seo_optimizations",
    name: "Extended SEO & Speed Auditing",
    description: "Schema markups, technical audit, custom speed tune-ups, and copy advice.",
    baseCost: 4000,
    category: "marketing"
  },
  {
    id: "ads_setup",
    name: "Media Buying Setup (Meta/Google Ads)",
    description: "Initial target audience research, ad creatives setup, pixels, and launching first campaign.",
    baseCost: 5000,
    category: "marketing"
  },
  {
    id: "ads_management",
    name: "1-Month Active Campaign Management",
    description: "A/B testing ad groups, conversion audits, and scaling ROI.",
    baseCost: 8000,
    category: "marketing"
  }
];

export const pricingFAQs: PricingFAQ[] = [
  {
    question: "Do you invoice in Egyptian Pounds (EGP)?",
    answer: "Yes, for Egypt-based startups and companies, we issue formal invoices and accept payments in Egyptian Pounds (EGP) via bank transfer, InstaPay, or corporate card. For international clients, we invoice in USD or EUR."
  },
  {
    question: "What are your standard payment terms and milestones?",
    answer: "We typically split project costs into transparent milestones: 40% upfront deposit to initiate kickoff and branding/design phases, 40% upon approval of visual UI/UX layout, and the final 20% once development is finished, tested, and ready to go live."
  },
  {
    question: "Are there any hidden or recurring fees?",
    answer: "None. We work on a fixed-bid project basis. The price you approve is the price you pay. Recurring costs like domain registration and hosting (Vercel/Netlify, typically free/low cost for most applications) are registered directly in your name so you retain complete ownership."
  },
  {
    question: "Can we mix and match items or pay monthly?",
    answer: "Absolutely. You can use our interactive budget calculator above to construct a bespoke stack. We also offer retainer arrangements for long-term design, development, and active ad campaign management packages."
  },
  {
    question: "How long does a typical project take?",
    answer: "Startup landing pages are delivered in 10-14 days. Growth projects (multi-page sites and campaigns) take around 3 to 4 weeks. Custom bespoke packages with custom animations or complex systems are planned and scheduled individually."
  }
];

export interface SocialMediaPackage {
  name: string;
  priceEGP: string;
  priceUSD: string;
  targetAudience: string;
  deliverables: string[];
  excluded?: string[];
  highlighted?: boolean;
  ctaText: string;
}

export const socialMediaPackages: SocialMediaPackage[] = [
  {
    name: "Starter Growth",
    priceEGP: "EGP 20,000",
    priceUSD: "$400",
    targetAudience: "Ideal for local startups and small businesses aiming to build a professional baseline presence.",
    deliverables: [
      "Platforms: Facebook & Instagram",
      "Content Volume: 8 - 12 Custom Posts / Month",
      "Copywriting: Single Language (Egyptian Arabic or English)",
      "Graphic Design: High-quality brand-aligned statics & GIFs",
      "Ads Management: Basic Campaign Setup & Boosting",
      "Reporting: Monthly basic reach & growth summary"
    ],
    excluded: [
      "Daily DM & Comment Community Management",
      "Short-Form Video Production (Reels / TikTok)"
    ],
    ctaText: "Choose Starter Growth"
  },
  {
    name: "Brand Scaler",
    priceEGP: "EGP 45,000",
    priceUSD: "$900",
    targetAudience: "Designed for scaling local brands needing aggressive customer acquisition, video, and active moderation.",
    deliverables: [
      "Platforms: FB, IG, and choice of TikTok or LinkedIn",
      "Content Volume: 15 - 20 Posts (Includes 4-6 Reels/TikToks)",
      "Copywriting: Bilingual Copy (Creative Arabic + English)",
      "Community Management: Up to 12 hrs/day Inbox & Comment replies",
      "Ads Optimization: Full Funnels (Leads, Messaging, or Conversions)",
      "Audience Targeting: Custom, Lookalike, & A/B Split Testing",
      "Reporting: Detailed Performance Dashboards (CPL / ROAS)"
    ],
    excluded: [
      "Advanced Conversions API (CAPI) Tracking"
    ],
    highlighted: true,
    ctaText: "Choose Brand Scaler"
  },
  {
    name: "Corporate / E-Com Elite",
    priceEGP: "EGP 85,000",
    priceUSD: "$1,700",
    targetAudience: "Built for established enterprises, real estate firms, and e-commerce stores maximizing market share.",
    deliverables: [
      "Platforms: Full Cross-Channel (Meta, TikTok, Google Ads, LinkedIn)",
      "Content Volume: Omnichannel Content (Includes Monthly Content Day/Shoots)",
      "Community Management: Premium 18-24 hour fast response coverage",
      "Advanced Advertising: Dynamic Retargeting, Pixel Setup & CAPI",
      "Paid Search: Search, Display & Performance Max Campaigns",
      "Competitor Analysis: Quarterly deep market audit",
      "Reporting: Bi-weekly deep dives & strategy consulting calls",
      "Priority Support: Dedicated Slack channel / Account Manager"
    ],
    ctaText: "Choose E-Com Elite"
  }
];
