export interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
  colSpan: string;
  height: string;
  client: string;
  year: string;
  role: string;
  challenge: string;
  solution: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "lumina",
    title: "Lumina eCommerce",
    category: "Web Development",
    image: "/images/work_ecommerce.png",
    colSpan: "md:col-span-2",
    height: "min-h-[500px]",
    client: "Lumina Fashion",
    year: "2026",
    role: "Full-Stack Development",
    challenge: "Lumina needed an eCommerce platform that felt less like a store and more like a high-end digital runway. Their previous Shopify site was slow and restricted their ability to showcase large, cinematic video assets.",
    solution: "We built a custom headless Next.js architecture hooked into a robust CMS. By utilizing Framer Motion and WebGL, we created seamless page transitions and scroll-linked video playback, dropping bounce rates by 40% and increasing luxury conversions.",
    gallery: ["/images/work_ecommerce.png", "/images/studio_desk.png"],
  },
  {
    slug: "aero",
    title: "Aero Acoustics",
    category: "Identity & 3D Render",
    image: "/images/work_hardware.png",
    colSpan: "md:col-span-1",
    height: "min-h-[500px]",
    client: "Aero Audio Inc.",
    year: "2025",
    role: "Brand Identity & 3D Web",
    challenge: "Aero's new flagship headphones needed a launch campaign that felt visceral and tangible, despite being a purely digital experience.",
    solution: "We developed a completely new visual identity centered around the physics of sound. The landing page features a real-time, interactive 3D model of the headphones rendered in Three.js, allowing users to physically explore the hardware before buying.",
    gallery: ["/images/work_hardware.png"],
  },
  {
    slug: "monolith",
    title: "Monolith Architecture",
    category: "Branding",
    image: "/images/work_branding.png",
    colSpan: "md:col-span-3",
    height: "min-h-[600px]",
    client: "Monolith Group",
    year: "2025",
    role: "Rebranding & Strategy",
    challenge: "Monolith Architecture creates some of the most striking brutalist structures in Europe, but their brand felt dated and corporate, failing to reflect the bold nature of their physical work.",
    solution: "We designed a monolithic, typography-driven brand system. By relying on stark contrast, extreme grid structures, and tactical foil print collateral, we aligned their digital and physical presence to reflect pure, unadulterated confidence.",
    gallery: ["/images/work_branding.png"],
  },
];
