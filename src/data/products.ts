export type Ingredient = {
  name: string;
  dose: string;
  role: string;
};

export type Category = "focus" | "memory" | "energy" | "calm";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  categoryLabel: string;
  tagline: string;
  description: string;
  price: number;
  servings: string;
  /** Hex accent used for the 3D bottle, glows and highlights */
  accent: string;
  /** HUD-style SKU code shown on cards and product pages */
  code: string;
  /** 0–5 effect intensity, rendered as animated bars on the PDP */
  profile: { focus: number; memory: number; energy: number; calm: number };
  /** Slug of the complementary stack for the cross-sell panel */
  pairsWith: string;
  ingredients: Ingredient[];
  benefits: string[];
  protocol: string;
};

export const categories: { id: Category; label: string }[] = [
  { id: "focus", label: "Focus" },
  { id: "memory", label: "Memory" },
  { id: "energy", label: "Energy" },
  { id: "calm", label: "Calm" },
];

export const products: Product[] = [
  {
    id: "deepwork",
    slug: "deepwork",
    name: "DEEPWORK",
    category: "focus",
    categoryLabel: "Focus / Attention",
    tagline: "The flagship focus stack for long, uninterrupted deep-work blocks.",
    description:
      "Deepwork pairs caffeine with L-theanine at the 2:1 theanine-to-caffeine ratio used in attention research, then adds citicoline to support the choline system your focus runs on. The result may feel like calm, directional alertness — without the jitter or the 3pm cliff.",
    price: 49,
    servings: "30 servings",
    accent: "#a78bfa",
    code: "SYN-01",
    profile: { focus: 5, memory: 2, energy: 3, calm: 2 },
    pairsWith: "engram",
    ingredients: [
      {
        name: "Caffeine Anhydrous",
        dose: "100 mg",
        role: "Clean, fast-acting stimulation — about one strong coffee's worth.",
      },
      {
        name: "L-Theanine",
        dose: "200 mg",
        role: "May smooth caffeine's edge; the studied 2:1 theanine-to-caffeine ratio.",
      },
      {
        name: "Citicoline (CDP-Choline)",
        dose: "250 mg",
        role: "May support attention and healthy acetylcholine levels.",
      },
    ],
    benefits: [
      "May support sustained attention during long work blocks",
      "Smooth alertness — designed to avoid jitters and crash",
      "Clinical-range doses, fully disclosed — no proprietary blend",
    ],
    protocol:
      "Take 1 serving 30–45 minutes before your first deep-work block. Avoid within 8 hours of sleep. Maximum 2 servings per day.",
  },
  {
    id: "engram",
    slug: "engram",
    name: "ENGRAM",
    category: "memory",
    categoryLabel: "Memory / Learning",
    tagline: "A memory-and-learning stack built for exam season and skill acquisition.",
    description:
      "Engram is built around Bacopa monnieri — one of the most-studied botanicals for memory — plus Alpha-GPC for bioavailable choline and Lion's Mane for long-run cognitive support. It's a patience stack: bacopa research typically shows effects after 8–12 weeks of consistent daily use.",
    price: 54,
    servings: "30 servings",
    accent: "#22d3ee",
    code: "SYN-02",
    profile: { focus: 3, memory: 5, energy: 1, calm: 2 },
    pairsWith: "deepwork",
    ingredients: [
      {
        name: "Bacopa Monnieri extract (50% bacosides)",
        dose: "300 mg",
        role: "May support memory consolidation with consistent daily use.",
      },
      {
        name: "Alpha-GPC",
        dose: "300 mg",
        role: "Highly bioavailable choline; may support learning and recall.",
      },
      {
        name: "Lion's Mane (fruiting body, 8:1 extract)",
        dose: "500 mg",
        role: "Traditional mushroom studied for cognitive support.",
      },
    ],
    benefits: [
      "May support memory formation and recall over 8–12 weeks",
      "Choline support for learning throughput",
      "Caffeine-free — stacks cleanly with Deepwork",
    ],
    protocol:
      "Take 1 serving daily with a meal containing fat. Consistency beats intensity: in studies, bacopa's effects emerge over 8–12 weeks.",
  },
  {
    id: "voltaic",
    slug: "voltaic",
    name: "VOLTAIC",
    category: "energy",
    categoryLabel: "Clean Energy",
    tagline: "Caffeine-free mental energy for output that doesn't flicker.",
    description:
      "Voltaic skips stimulants entirely. Acetyl-L-carnitine and methylcobalamin support cellular energy metabolism, while rhodiola — an adaptogen studied for occasional mental fatigue — may help you hold output steady through long days.",
    price: 44,
    servings: "30 servings",
    accent: "#fbbf24",
    code: "SYN-03",
    profile: { focus: 3, memory: 2, energy: 5, calm: 1 },
    pairsWith: "stillwave",
    ingredients: [
      {
        name: "Acetyl-L-Carnitine (ALCAR)",
        dose: "500 mg",
        role: "May support mitochondrial energy metabolism.",
      },
      {
        name: "Rhodiola Rosea (3% rosavins, 1% salidroside)",
        dose: "200 mg",
        role: "Adaptogen studied for occasional mental fatigue.",
      },
      {
        name: "Vitamin B12 (Methylcobalamin)",
        dose: "500 mcg",
        role: "Supports normal energy-yielding metabolism.",
      },
    ],
    benefits: [
      "May support steady, stim-free mental energy",
      "Studied doses of rhodiola for occasional fatigue",
      "Zero caffeine — no tolerance build-up, no crash",
    ],
    protocol:
      "Take 1 serving with breakfast. Rhodiola responds well to cycling: 5 days on, 2 days off.",
  },
  {
    id: "stillwave",
    slug: "stillwave",
    name: "STILLWAVE",
    category: "calm",
    categoryLabel: "Calm / Resilience",
    tagline: "Calm that doesn't cost you your edge.",
    description:
      "Stillwave combines KSM-66 ashwagandha — studied for supporting a normal stress response — with L-theanine and magnesium bisglycinate. It's designed for high-pressure weeks: a settled baseline, not sedation.",
    price: 47,
    servings: "30 servings",
    accent: "#34d399",
    code: "SYN-04",
    profile: { focus: 2, memory: 1, energy: 1, calm: 5 },
    pairsWith: "voltaic",
    ingredients: [
      {
        name: "Ashwagandha root extract (KSM-66)",
        dose: "300 mg",
        role: "Studied for supporting a healthy stress response.",
      },
      {
        name: "L-Theanine",
        dose: "200 mg",
        role: "May promote calm focus without drowsiness.",
      },
      {
        name: "Magnesium Bisglycinate",
        dose: "200 mg",
        role: "Gentle, well-absorbed form; supports normal nervous-system function.",
      },
    ],
    benefits: [
      "May support calm and stress resilience under pressure",
      "Non-drowsy by design — clarity stays intact",
      "Evening-friendly; may support wind-down before sleep",
    ],
    protocol:
      "Take 1 serving in the late afternoon or evening, or 60 minutes before a high-stakes event.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const DISCLAIMER =
  "*These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Individual results vary. Not for use by individuals under 18, or those who are pregnant or nursing. Consult a licensed healthcare professional before use, especially if you take medication or have a medical condition.";
