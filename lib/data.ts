export type NavSection = {
  id: string;
  label: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix: string;
  description: string;
};

export type SkillGroup = "Core" | "Frameworks" | "Styling" | "Progressive";
export type SkillIcon = "atom" | "braces" | "code" | "component" | "layers" | "layout" | "rocket" | "smartphone" | "terminal" | "wind";

export type Skill = {
  name: string;
  group: SkillGroup;
  description: string;
  projects: number;
  color: string;
  icon: SkillIcon;
  focus: string[];
  span: "standard" | "wide" | "tall";
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  website?: string;
  stack?: string[];
  summary: string;
  current?: boolean;
};

export type Project = {
  title: string;
  category: string;
  period: string;
  description: string;
  stack: string[];
  links: {
    label: string;
    href: string;
  }[];
  live?: boolean;
  visual: "commerce" | "consulting" | "university" | "teaching";
  accent: string;
  metrics: string[];
};

export const profile = {
  name: "Pouya Rouzbeh Tehrani",
  role: "Frontend Developer - React & Next.js Specialist",
  tagline:
    "I build polished, fast, and maintainable interfaces for SaaS products, education systems, and international business websites.",
  location: "Gorgan, Iran",
  github: "https://github.com/pouyarouzbeh",
  linkedin: "https://www.linkedin.com/in/pouya-rouzbeh-tehrani/",
  avatar: "https://github.com/pouyarouzbeh.png?size=320",
  siteUrl: "https://puyaro.ir"
};

export const navSections: NavSection[] = [
  { id: "home", label: "Home" },
  { id: "stats", label: "Stats" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

export const heroCodeLines = [
  "import { Portfolio } from '@/studio/pouya';",
  "",
  "export default function Build() {",
  "  return (",
  "    <Portfolio",
  "      developer='Pouya Rouzbeh Tehrani'",
  "      focus={['React', 'Next.js', 'TypeScript']}",
  "      aesthetic='glass / terminal / motion'",
  "      availableFor='frontend products and teaching'",
  "    />",
  "  );",
  "}"
];

export const stats: Stat[] = [
  {
    label: "Years",
    value: 3,
    suffix: "+",
    description: "building and teaching web interfaces"
  },
  {
    label: "Projects",
    value: 10,
    suffix: "+",
    description: "from SaaS dashboards to public SPAs"
  },
  {
    label: "Technologies",
    value: 5,
    suffix: "+",
    description: "React, Next.js, TypeScript, Tailwind, MUI"
  },
  {
    label: "Countries",
    value: 2,
    suffix: "",
    description: "Iran and Australia client collaboration"
  }
];

export const skills: Skill[] = [
  {
    name: "HTML5",
    group: "Core",
    description: "Semantic, accessible markup",
    projects: 10,
    color: "#f97316",
    icon: "code",
    focus: ["Semantic structure", "SEO markup", "Accessible flows"],
    span: "standard"
  },
  {
    name: "CSS3",
    group: "Core",
    description: "Animations, Grid, Flexbox",
    projects: 10,
    color: "#38bdf8",
    icon: "layers",
    focus: ["Responsive layouts", "Motion systems", "Visual polish"],
    span: "wide"
  },
  {
    name: "JavaScript",
    group: "Core",
    description: "ES6+, async/await, DOM API",
    projects: 9,
    color: "#facc15",
    icon: "terminal",
    focus: ["Async flows", "State logic", "Browser APIs"],
    span: "standard"
  },
  {
    name: "React.js",
    group: "Frameworks",
    description: "Hooks, Context, performance optimization",
    projects: 8,
    color: "#00d4ff",
    icon: "atom",
    focus: ["Reusable UI", "Hooks", "Performance"],
    span: "tall"
  },
  {
    name: "Next.js",
    group: "Frameworks",
    description: "SSR, SSG, App Router, SEO",
    projects: 4,
    color: "#ffffff",
    icon: "rocket",
    focus: ["App Router", "SEO", "Deployment"],
    span: "wide"
  },
  {
    name: "TypeScript",
    group: "Frameworks",
    description: "Type-safe, scalable codebases",
    projects: 5,
    color: "#60a5fa",
    icon: "braces",
    focus: ["Typed models", "Safer refactors", "API contracts"],
    span: "standard"
  },
  {
    name: "Tailwind CSS",
    group: "Styling",
    description: "Utility-first, rapid UI",
    projects: 7,
    color: "#22d3ee",
    icon: "wind",
    focus: ["Design tokens", "Fast iteration", "Adaptive UI"],
    span: "wide"
  },
  {
    name: "Bootstrap",
    group: "Styling",
    description: "Responsive grid systems",
    projects: 6,
    color: "#a78bfa",
    icon: "layout",
    focus: ["Grid systems", "Rapid prototypes", "Legacy UI"],
    span: "standard"
  },
  {
    name: "MUI",
    group: "Styling",
    description: "Material Design components",
    projects: 3,
    color: "#38bdf8",
    icon: "component",
    focus: ["Admin panels", "Theme setup", "Form UI"],
    span: "standard"
  },
  {
    name: "PWA",
    group: "Progressive",
    description: "Offline-first, installable apps",
    projects: 2,
    color: "#34d399",
    icon: "smartphone",
    focus: ["App-like UX", "Offline states", "Mobile polish"],
    span: "standard"
  }
];

export const experiences: Experience[] = [
  {
    company: "Roshdify",
    role: "E-Commerce Platform Builder",
    location: "Gorgan, Iran",
    period: "Jul 2025 - Jan 2026",
    website: "https://roshdify.ir",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    summary:
      "Built a Shopify-like SaaS with product management, cart workflows, payments, and an admin dashboard for store operations."
  },
  {
    company: "CivEng Consulting",
    role: "Corporate SPA",
    location: "Sunshine Coast, Australia",
    period: "Feb 2026",
    website: "https://civengconsulting.com.au",
    stack: ["React", "Tailwind CSS", "SEO optimization"],
    summary:
      "Delivered a high-performance international SPA for an Australian engineering firm with remote collaboration and SEO-focused delivery."
  },
  {
    company: "Shahid Rajaee University",
    role: "Amoozeshyar System",
    location: "Tehran, Iran",
    period: "Jul 2024 - Feb 2025",
    stack: ["React", "MUI", "JavaScript"],
    summary:
      "Created a multi-step pre-registration system with an admin panel for faculty workflows and student management."
  },
  {
    company: "Vocational School",
    role: "Computer Programming Teacher",
    location: "Gorgan, Iran",
    period: "Oct 2025 - Present",
    summary:
      "Teaching web development and programming through practical lessons that connect computer science concepts to real front-end projects.",
    current: true
  },
  {
    company: "Sepehrtek / Jahanara / Noafarin",
    role: "Frontend Instructor",
    location: "Gorgan, Iran",
    period: "Jul 2025 - Present",
    stack: ["React", "JavaScript", "CSS"],
    summary:
      "Teaching React, JavaScript, and CSS to adult learners with project-based curricula and mentorship.",
    current: true
  }
];

export const projects: Project[] = [
  {
    title: "Roshdify Commerce Platform",
    category: "SaaS Dashboard",
    period: "2025 - 2026",
    description:
      "A storefront management experience with product CRUD, cart logic, payment flow, and a practical admin surface for business users.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: [{ label: "Open", href: "https://roshdify.ir" }],
    live: true,
    visual: "commerce",
    accent: "#00d4ff",
    metrics: ["Products", "Orders", "Payments"]
  },
  {
    title: "CivEng Consulting SPA",
    category: "International Corporate Site",
    period: "2026",
    description:
      "A fast single-page company website focused on clarity, trust, service discovery, and search-friendly content structure.",
    stack: ["React", "Tailwind CSS", "SEO"],
    links: [{ label: "Open", href: "https://civengconsulting.com.au" }],
    live: true,
    visual: "consulting",
    accent: "#7c3aed",
    metrics: ["SEO", "Performance", "Remote"]
  },
  {
    title: "Shahid Rajaee Pre-Registration",
    category: "University Workflow App",
    period: "2024 - 2025",
    description:
      "A multi-step registration product with administrative controls for faculty and student record management.",
    stack: ["React", "MUI", "JavaScript"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/pouyarouzbeh/shahidRajaeeUni_pre-registeration"
      }
    ],
    visual: "university",
    accent: "#34d399",
    metrics: ["Forms", "Admin", "Students"]
  },
  {
    title: "Frontend Teaching Systems",
    category: "Education and Mentorship",
    period: "2025 - Present",
    description:
      "Structured learning experiences for students and adult learners covering HTML, CSS, JavaScript, React, and modern UI thinking.",
    stack: ["React", "JavaScript", "CSS", "Curriculum"],
    links: [{ label: "LinkedIn", href: profile.linkedin }],
    visual: "teaching",
    accent: "#facc15",
    metrics: ["Lessons", "Mentoring", "Projects"]
  }
];

export const socialLinks = [
  {
    label: "GitHub",
    href: profile.github,
    icon: "github"
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: "linkedin"
  }
] as const;
