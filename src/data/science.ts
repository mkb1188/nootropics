export type ScienceIngredient = {
  id: string;
  name: string;
  class: string;
  dose: string;
  summary: string;
  mechanism: string;
  /** Product slugs that contain this ingredient */
  foundIn: string[];
};

export const scienceIngredients: ScienceIngredient[] = [
  {
    id: "caffeine",
    name: "Caffeine",
    class: "Methylxanthine stimulant",
    dose: "100 mg",
    summary:
      "The most-studied cognitive stimulant on earth, dosed at roughly one strong coffee.",
    mechanism:
      "Blocks adenosine receptors, which may reduce perceived fatigue and support alertness and reaction time.",
    foundIn: ["deepwork"],
  },
  {
    id: "l-theanine",
    name: "L-Theanine",
    class: "Amino acid",
    dose: "200 mg",
    summary:
      "An amino acid from green tea, studied alongside caffeine for attention and alone for calm.",
    mechanism:
      "May promote alpha-wave brain activity associated with relaxed alertness; often paired 2:1 with caffeine.",
    foundIn: ["deepwork", "stillwave"],
  },
  {
    id: "citicoline",
    name: "Citicoline (CDP-Choline)",
    class: "Choline donor",
    dose: "250 mg",
    summary:
      "A choline compound studied for attention and cognitive performance in healthy adults.",
    mechanism:
      "Supplies choline and cytidine — precursors for acetylcholine and the phospholipids neurons are built from.",
    foundIn: ["deepwork"],
  },
  {
    id: "bacopa",
    name: "Bacopa Monnieri",
    class: "Botanical (50% bacosides)",
    dose: "300 mg",
    summary:
      "An Ayurvedic herb with multiple randomized trials on memory in healthy adults.",
    mechanism:
      "Bacosides are thought to modulate synaptic signaling; in studies, effects typically emerge over 8–12 weeks of daily use.",
    foundIn: ["engram"],
  },
  {
    id: "alpha-gpc",
    name: "Alpha-GPC",
    class: "Choline donor",
    dose: "300 mg",
    summary:
      "One of the most bioavailable forms of supplemental choline.",
    mechanism:
      "Crosses the blood–brain barrier efficiently to supply choline for acetylcholine synthesis — the neurotransmitter of learning.",
    foundIn: ["engram"],
  },
  {
    id: "lions-mane",
    name: "Lion's Mane",
    class: "Functional mushroom (8:1 extract)",
    dose: "500 mg",
    summary:
      "A culinary-medicinal mushroom studied for long-run cognitive support.",
    mechanism:
      "Its hericenones and erinacines are being studied for their possible role in nerve growth factor pathways.",
    foundIn: ["engram"],
  },
  {
    id: "alcar",
    name: "Acetyl-L-Carnitine",
    class: "Amino acid derivative",
    dose: "500 mg",
    summary:
      "An acetylated form of carnitine central to cellular energy production.",
    mechanism:
      "Shuttles fatty acids into mitochondria for oxidation; may support energy metabolism without stimulation.",
    foundIn: ["voltaic"],
  },
  {
    id: "rhodiola",
    name: "Rhodiola Rosea",
    class: "Adaptogen (3% rosavins)",
    dose: "200 mg",
    summary:
      "An arctic root studied for occasional mental fatigue under demanding conditions.",
    mechanism:
      "Rosavins and salidroside are thought to modulate the stress response and perceived exertion.",
    foundIn: ["voltaic"],
  },
  {
    id: "b12",
    name: "Methylcobalamin (B12)",
    class: "Vitamin",
    dose: "500 mcg",
    summary: "The active, pre-methylated form of vitamin B12.",
    mechanism:
      "A required cofactor in normal energy-yielding metabolism and red blood cell formation.",
    foundIn: ["voltaic"],
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha (KSM-66)",
    class: "Adaptogen (root extract)",
    dose: "300 mg",
    summary:
      "A root extract with randomized trials on stress and mood in healthy adults.",
    mechanism:
      "Withanolides are thought to support a normal cortisol response during sustained pressure.",
    foundIn: ["stillwave"],
  },
  {
    id: "magnesium",
    name: "Magnesium Bisglycinate",
    class: "Chelated mineral",
    dose: "200 mg",
    summary: "A gentle, well-absorbed chelated form of magnesium.",
    mechanism:
      "Magnesium participates in hundreds of enzymatic reactions, including normal nervous-system function.",
    foundIn: ["stillwave"],
  },
];

export type DoseComparison = {
  ingredient: string;
  /** mg values for bar scaling */
  market: number;
  clinicalLow: number;
  clinicalHigh: number;
  ours: number;
  unit: string;
};

export const doseComparisons: DoseComparison[] = [
  {
    ingredient: "Bacopa Monnieri",
    market: 100,
    clinicalLow: 300,
    clinicalHigh: 600,
    ours: 300,
    unit: "mg",
  },
  {
    ingredient: "L-Theanine",
    market: 75,
    clinicalLow: 100,
    clinicalHigh: 400,
    ours: 200,
    unit: "mg",
  },
  {
    ingredient: "Ashwagandha",
    market: 125,
    clinicalLow: 250,
    clinicalHigh: 600,
    ours: 300,
    unit: "mg",
  },
];
