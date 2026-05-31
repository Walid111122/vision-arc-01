import { Globe, Diamond, BarChart3, Film } from "lucide-react";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  iconName: "Globe" | "Diamond" | "BarChart3" | "Film";
  heroImage: string;
  stats: { label: string; value: string }[];
  process: ProcessStep[];
  deliverables: string[];
  tools: { name: string; category: string }[];
  pricingTiers: PricingTier[];
  faq: FAQ[];
  caseStudySlugs: string[];
}

export const iconMap = {
  Globe,
  Diamond,
  BarChart3,
  Film,
};

export const services: Service[] = [
  {
    slug: "web",
    title: "Bespoke Web Development",
    subtitle: "Engineered to be felt, not just seen.",
    description:
      "We build fast, tactile digital experiences. No templates, no bloat. Just custom Next.js architecture paired with nuanced motion design that respects your user's time and attention.",
    longDescription:
      "Every pixel we ship is written by hand. We reject page builders, generic WordPress themes, and cookie-cutter Shopify skins. Instead, we architect performant, server-rendered Next.js applications with meticulous attention to interaction design — smooth spring-physics animations, scroll-linked storytelling, and micro-interactions that make your product feel alive. The result is a website that doesn't just look premium — it performs like one, with lighthouse scores above 95 and load times under 2 seconds on 3G.",
    iconName: "Globe",
    heroImage: "/images/studio_desk.png",
    stats: [
      { label: "Average Lighthouse Score", value: "97+" },
      { label: "Avg. Load Time", value: "<1.8s" },
      { label: "Projects Delivered", value: "40+" },
      { label: "Client Retention", value: "92%" },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Audit",
        description:
          "We dissect your existing digital presence, audit competitors, interview stakeholders, and map user journeys to identify the highest-impact opportunities.",
      },
      {
        step: "02",
        title: "Architecture & Wireframes",
        description:
          "Information architecture, content hierarchy, and low-fidelity wireframes define the structural foundation before a single pixel is designed.",
      },
      {
        step: "03",
        title: "Design & Prototyping",
        description:
          "High-fidelity designs in Figma with interactive prototypes. Every animation, every transition, every hover state is designed and approved before development begins.",
      },
      {
        step: "04",
        title: "Development & Launch",
        description:
          "Custom Next.js development with CI/CD pipelines, performance optimization, accessibility audits, and a smooth deployment to your production environment.",
      },
    ],
    deliverables: [
      "Custom Next.js Application",
      "Responsive Design (Mobile-First)",
      "WebGL / Three.js Experiences",
      "Framer Motion Animations",
      "Headless CMS Integration",
      "SEO & Performance Optimization",
      "Analytics & Tracking Setup",
      "6-Month Post-Launch Support",
      "Mobile App Development",
      "UI/UX Design",
      "E-commerce Solutions",
      "Custom Software Development",
      "Cloud Computing and Hosting",
      "Software Testing and Quality Assurance",
      "User Support and Maintenance",
    ],
    tools: [
      { name: "Next.js", category: "Framework" },
      { name: "React", category: "Library" },
      { name: "TypeScript", category: "Language" },
      { name: "Framer Motion", category: "Animation" },
      { name: "Three.js", category: "3D / WebGL" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Figma", category: "Design" },
      { name: "Vercel", category: "Hosting" },
      { name: "Sanity", category: "CMS" },
      { name: "Prisma", category: "Database" },
    ],
    pricingTiers: [
      {
        name: "Starter",
        price: "$8,000",
        description: "For startups and small businesses needing a polished online presence.",
        features: [
          "Up to 5 pages",
          "Responsive design",
          "Basic animations",
          "Contact form integration",
          "SEO fundamentals",
          "1-month support",
        ],
      },
      {
        name: "Growth",
        price: "$18,000",
        description: "For growing brands that need custom interactions and CMS integration.",
        features: [
          "Up to 12 pages",
          "Custom animations & transitions",
          "Headless CMS (Sanity/Strapi)",
          "Blog & dynamic content",
          "Advanced SEO & analytics",
          "3-month support",
          "Performance optimization",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Full-scale digital platforms with 3D, eCommerce, and complex integrations.",
        features: [
          "Unlimited pages",
          "WebGL / Three.js experiences",
          "eCommerce integration",
          "Multi-language support",
          "Custom API development",
          "6-month priority support",
          "Dedicated project manager",
          "CI/CD & DevOps setup",
        ],
      },
    ],
    faq: [
      {
        question: "How long does a typical web project take?",
        answer:
          "A Starter project takes 4–6 weeks. Growth projects run 8–12 weeks. Enterprise builds vary but typically 3–5 months depending on complexity.",
      },
      {
        question: "Do you work with existing designs?",
        answer:
          "Absolutely. If you have Figma or Sketch files ready, we can jump straight to development. We also offer design-only or development-only engagements.",
      },
      {
        question: "What CMS do you recommend?",
        answer:
          "We primarily work with Sanity CMS for its flexibility and developer experience, but we also have deep expertise in Strapi, Contentful, and Prismic.",
      },
      {
        question: "Do you handle hosting and deployment?",
        answer:
          "Yes. We deploy on Vercel for most projects (optimized for Next.js), but we also work with AWS, Netlify, and custom infrastructure.",
      },
    ],
    caseStudySlugs: ["lumina", "monolith"],
  },
  {
    slug: "brand",
    title: "Identity & Branding",
    subtitle: "Iconic systems built to last decades.",
    description:
      "Visual systems that speak louder than words. We create iconic, minimalist identities rooted in timeless design principles.",
    longDescription:
      "A brand is not a logo — it's a living system. We build comprehensive visual identities that feel unmistakable across every touchpoint: from the favicon to the billboard. Our process is rooted in deep strategic thinking — we don't start drawing until we understand your audience's psychology, your competitive landscape, and the cultural context your brand lives in. The result is an identity that doesn't follow trends; it sets them.",
    iconName: "Diamond",
    heroImage: "/images/work_branding.png",
    stats: [
      { label: "Brands Created", value: "65+" },
      { label: "Brand Guidelines Delivered", value: "50+" },
      { label: "Avg. Brand Longevity", value: "8+ yrs" },
      { label: "Industry Awards", value: "12" },
    ],
    process: [
      {
        step: "01",
        title: "Brand Immersion",
        description:
          "Deep-dive workshops to uncover your brand's core values, audience personas, competitive positioning, and the emotional territory you want to own.",
      },
      {
        step: "02",
        title: "Strategic Foundation",
        description:
          "Brand positioning statement, messaging framework, voice & tone guidelines, and a creative brief that becomes the north star for all design work.",
      },
      {
        step: "03",
        title: "Visual Exploration",
        description:
          "Multiple creative directions exploring typography, color, iconography, and visual metaphor. We present mood boards and initial concepts for collaborative refinement.",
      },
      {
        step: "04",
        title: "System Design & Delivery",
        description:
          "The final identity is built into a comprehensive brand guidelines document with all assets, usage rules, templates, and a component library for consistent application.",
      },
    ],
    deliverables: [
      "Brand Strategy Document",
      "Logo System (Primary, Secondary, Icon)",
      "Custom Typography Selection",
      "Color System & Palette",
      "Brand Guidelines (60+ pages)",
      "Social Media Templates",
      "Business Card & Stationery",
      "Brand Asset Library",
      "Brand Strategy Development",
      "Brand Identity Design",
      "Brand Naming and Tagline Development",
      "Brand Messaging and Voice",
      "Brand Positioning and Differentiation",
      "Brand Storytelling",
      "Brand Collateral Design",
      "Brand Guidelines and Visual Identity Systems",
      "Brand Experience Design",
      "Rebranding and Brand Refresh",
      "Brand Audits and Assessments",
      "Brand Communications Strategy",
      "Brand Launches and Campaigns",
    ],
    tools: [
      { name: "Figma", category: "Design" },
      { name: "Adobe Illustrator", category: "Vector" },
      { name: "Adobe Photoshop", category: "Raster" },
      { name: "After Effects", category: "Motion" },
      { name: "Blender", category: "3D Mockups" },
      { name: "Notion", category: "Strategy" },
    ],
    pricingTiers: [
      {
        name: "Essential",
        price: "$5,000",
        description: "Core identity for early-stage startups and personal brands.",
        features: [
          "Logo design (3 concepts)",
          "Color palette",
          "Typography selection",
          "Basic brand guidelines",
          "Business card design",
          "Social media profile assets",
        ],
      },
      {
        name: "Professional",
        price: "$12,000",
        description: "Complete brand system for established businesses ready to level up.",
        features: [
          "Brand strategy workshop",
          "Logo system (primary + variants)",
          "Extended color system",
          "Custom typography pairing",
          "Comprehensive guidelines (40+ pages)",
          "Stationery suite",
          "Social media template kit",
          "Presentation template",
        ],
        highlighted: true,
      },
      {
        name: "Premium",
        price: "$25,000+",
        description: "End-to-end rebrand with motion, 3D, and environmental design.",
        features: [
          "Full brand strategy & positioning",
          "Complete visual identity system",
          "Motion identity (animated logo)",
          "3D brand mockups",
          "Environmental / signage design",
          "Brand video direction",
          "Extended guidelines (80+ pages)",
          "1-year brand guardian support",
        ],
      },
    ],
    faq: [
      {
        question: "How many logo concepts do you present?",
        answer:
          "We present 3 distinct creative directions, each rooted in different strategic angles. After selection, we refine the chosen direction through 2–3 rounds of revisions.",
      },
      {
        question: "Do you do naming and taglines?",
        answer:
          "Yes, brand naming and tagline development can be added to any package. It typically adds 2–3 weeks and $2,000–$5,000 depending on scope.",
      },
      {
        question: "What file formats do I receive?",
        answer:
          "All assets are delivered in SVG, PNG (multiple sizes), PDF, and EPS formats. Figma source files are included in Professional and Premium tiers.",
      },
      {
        question: "Can you help with brand implementation?",
        answer:
          "Absolutely. We offer a Brand Guardian retainer where we oversee the application of your brand across all touchpoints for the first year.",
      },
    ],
    caseStudySlugs: ["monolith", "aero"],
  },
  {
    slug: "media",
    title: "Media Buying & Strategy",
    subtitle: "Performance marketing that actually performs.",
    description:
      "We don't just design; we distribute. Our performance team scales your brand through highly targeted, high-converting ad campaigns across Meta and Google.",
    longDescription:
      "Beautiful creative is useless if nobody sees it. Our media team bridges the gap between brand and performance — combining stunning ad creative with ruthless data-driven optimization. We manage full-funnel campaigns across Meta (Facebook & Instagram), Google (Search, Display, YouTube), and TikTok. Every dollar is tracked, every creative is tested, and every decision is backed by real-time data. We don't believe in vanity metrics — we optimize for revenue.",
    iconName: "BarChart3",
    heroImage: "/images/media_buying.png",
    stats: [
      { label: "Ad Spend Managed", value: "$4M+" },
      { label: "Average ROAS", value: "5.2x" },
      { label: "Campaigns Launched", value: "200+" },
      { label: "Creative Tests / Month", value: "50+" },
    ],
    process: [
      {
        step: "01",
        title: "Audit & Strategy",
        description:
          "We audit your existing ad accounts, analyze your customer acquisition funnel, and build a media strategy aligned with your revenue goals and unit economics.",
      },
      {
        step: "02",
        title: "Creative Production",
        description:
          "Our creative team produces scroll-stopping ad assets — static, carousel, and video — designed specifically for the platform and funnel stage.",
      },
      {
        step: "03",
        title: "Launch & Test",
        description:
          "Campaigns go live with structured A/B testing frameworks. We test audiences, creatives, copy, and placements systematically to find winning combinations.",
      },
      {
        step: "04",
        title: "Scale & Optimize",
        description:
          "Once we identify winners, we scale aggressively while maintaining ROAS targets. Weekly reporting keeps you informed, monthly strategy calls keep us aligned.",
      },
    ],
    deliverables: [
      "Media Strategy & Plan",
      "Ad Account Setup & Structure",
      "Custom Audience Building",
      "Ad Creative Production (15+/mo)",
      "A/B Testing Framework",
      "Weekly Performance Reports",
      "Monthly Strategy Sessions",
      "Conversion Tracking & Attribution",
      "Search Engine Optimization (SEO)",
      "Social Media Marketing",
      "Email Marketing",
      "Content Marketing",
      "Graphic Design",
      "Influencer Marketing",
      "E-commerce Solutions",
      "Analytics and Reporting",
      "Print Advertising",
      "Television Advertising",
      "Outdoor Advertising",
      "Event Marketing",
      "Public Relations (PR)",
    ],
    tools: [
      { name: "Meta Ads Manager", category: "Ads" },
      { name: "Google Ads", category: "Ads" },
      { name: "TikTok Ads", category: "Ads" },
      { name: "Google Analytics 4", category: "Analytics" },
      { name: "Hotjar", category: "UX Analytics" },
      { name: "Triple Whale", category: "Attribution" },
      { name: "Figma", category: "Creative" },
      { name: "CapCut", category: "Video" },
    ],
    pricingTiers: [
      {
        name: "Launch",
        price: "$3,000/mo",
        description: "For brands spending $5K–$15K/mo in ad spend ready to get serious.",
        features: [
          "1 platform (Meta OR Google)",
          "Campaign setup & management",
          "10 ad creatives / month",
          "Bi-weekly reporting",
          "Basic A/B testing",
          "Monthly strategy call",
        ],
      },
      {
        name: "Scale",
        price: "$6,000/mo",
        description: "For brands spending $15K–$50K/mo ready for aggressive growth.",
        features: [
          "2 platforms (Meta + Google)",
          "Full-funnel campaign management",
          "20+ ad creatives / month",
          "Weekly reporting dashboard",
          "Advanced A/B testing framework",
          "Bi-weekly strategy calls",
          "Landing page recommendations",
          "Conversion rate optimization",
        ],
        highlighted: true,
      },
      {
        name: "Dominate",
        price: "$12,000/mo",
        description: "For brands spending $50K+ ready to dominate their market.",
        features: [
          "All platforms (Meta + Google + TikTok)",
          "Dedicated media buyer",
          "Unlimited ad creatives",
          "Real-time reporting dashboard",
          "Full CRO & landing page builds",
          "Weekly strategy calls",
          "Influencer/UGC coordination",
          "Custom attribution modeling",
        ],
      },
    ],
    faq: [
      {
        question: "What's the minimum ad spend you recommend?",
        answer:
          "We recommend a minimum of $5,000/month in ad spend to gather meaningful data. Most of our clients invest $15K–$100K+/month.",
      },
      {
        question: "Do you produce the ad creative too?",
        answer:
          "Yes. Our in-house creative team handles all ad creative production — static graphics, carousels, short-form video, and UGC-style content.",
      },
      {
        question: "How quickly can I expect results?",
        answer:
          "Most clients see meaningful data within 2–3 weeks and predictable, scalable results within 60–90 days. We optimize aggressively from day one.",
      },
      {
        question: "What's your contract length?",
        answer:
          "We work on a 3-month minimum to allow proper testing and optimization. After that, it's month-to-month. Most clients stay for 12+ months.",
      },
    ],
    caseStudySlugs: ["lumina"],
  },
  {
    slug: "production",
    title: "Exceptional Media Production",
    subtitle: "Bringing visual stories to life.",
    description:
      "High-impact visual production tailored for modern platforms. From photo and video shoots to set design and post-production, we deliver stunning visual assets that command attention.",
    longDescription:
      "We bring your brand's story to life through high-end production services. We handle everything from creative concepting, scriptwriting, and location scouting to photography, cinematography, event production, set construction, and advanced post-production. Whether it's a commercial campaign, product shoot, animation, or physical event space, our production team crafts visually striking assets that elevate your brand's presence and engage your audience.",
    iconName: "Film",
    heroImage: "/images/media_buying.png",
    stats: [
      { label: "Projects Produced", value: "120+" },
      { label: "High-End Commercials", value: "35+" },
      { label: "Client Satisfaction", value: "98%" },
      { label: "Team Members", value: "15+" },
    ],
    process: [
      {
        step: "01",
        title: "Pre-Production & Concepting",
        description:
          "We define the creative direction, script, storyboard, budget, and logistical timeline. We handle casting, location scouting, and styling.",
      },
      {
        step: "02",
        title: "Production & Shooting",
        description:
          "Our experienced crew shoots on location or in-studio using state-of-the-art camera, lighting, and audio equipment to capture beautiful visuals.",
      },
      {
        step: "03",
        title: "Post-Production",
        description:
          "We edit, color grade, design sound/audio, and add visual effects (VFX) or animation to turn raw footage into a polished masterpiece.",
      },
      {
        step: "04",
        title: "Delivery & Campaign Launch",
        description:
          "We deliver final assets formatted for specific channels (social media, TV, print) and support the campaign launch to ensure maximum engagement.",
      },
    ],
    deliverables: [
      "Video Production",
      "Commercial Production",
      "Animation and Motion Graphics",
      "Photography",
      "Print Production",
      "Audio Production",
      "Event Production",
      "Set Design and Construction",
      "Post-Production Services",
      "Production Management",
      "Visual Effects (VFX)",
    ],
    tools: [
      { name: "RED / ARRI Cameras", category: "Cinematography" },
      { name: "Adobe Premiere Pro", category: "Video Editing" },
      { name: "DaVinci Resolve", category: "Color Grading" },
      { name: "Adobe After Effects", category: "VFX & Motion" },
      { name: "Blender", category: "3D & Animation" },
      { name: "Adobe Photoshop", category: "Photo Editing" },
      { name: "Pro Tools", category: "Audio Engineering" },
    ],
    pricingTiers: [
      {
        name: "Social Content",
        price: "$4,000",
        description: "Perfect for brands needing high-quality social media photography and short-form video content.",
        features: [
          "1-day shoot",
          "Short-form videos (TikTok/Reels)",
          "Professional photography session",
          "Basic editing and color grading",
          "1 round of revisions",
          "Delivery in 10 business days",
        ],
      },
      {
        name: "Commercial Campaign",
        price: "$10,000",
        description: "Full production campaign for hero commercials, brand videos, and product launches.",
        features: [
          "2-day shoot",
          "1 main commercial video (60s)",
          "3 cutdowns for social ads (15s)",
          "Full-scale pre-production & concepting",
          "Advanced color grading & sound design",
          "Professional styling & lighting crew",
          "2 rounds of revisions",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise Production",
        price: "Custom",
        description: "Bespoke high-end productions, CGI/VFX animation, set construction, or large-scale events.",
        features: [
          "Multi-day/multi-location shoots",
          "Advanced CGI, VFX & 3D animation",
          "Custom set design and physical construction",
          "Large-scale event coverage and management",
          "Full post-production pipeline",
          "Unlimited revisions on concepts",
          "Dedicated production director",
        ],
      },
    ],
    faq: [
      {
        question: "Do you handle location scouting and casting?",
        answer:
          "Yes, we handle all aspects of pre-production, including scouting suitable locations, securing permits, and casting actors or models based on the creative brief.",
      },
      {
        question: "Can we shoot in different countries or locations?",
        answer:
          "Absolutely. Our production team is equipped to travel and handle logistics for shoots across regions, coordinating local permits and local crew support where needed.",
      },
      {
        question: "What is the typical turnaround time for post-production?",
        answer:
          "For social content, it typically takes 5–10 business days. Commercial campaigns run 3–5 weeks depending on the complexity of CGI, VFX, color grading, and approvals.",
      },
      {
        question: "Do we own the full copyright to the produced media?",
        answer:
          "Yes. Once the project is fully paid and delivered, you receive full commercial usage rights for all final videos, photography, and audio assets.",
      },
    ],
    caseStudySlugs: [],
  },
];
