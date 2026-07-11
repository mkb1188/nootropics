"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  FlaskConical,
  GitMerge,
  ShieldCheck,
} from "lucide-react";
import { scienceIngredients, doseComparisons } from "@/data/science";
import { products, DISCLAIMER } from "@/data/products";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { Corners } from "@/components/Corners";
import { Marquee } from "@/components/fx/Marquee";
import { cn } from "@/lib/utils";

const process = [
  {
    icon: BookOpenText,
    step: "01",
    title: "Literature sweep",
    body: "We start from human trials — not marketing decks. Ingredients with real randomized, placebo-controlled research make the shortlist.",
  },
  {
    icon: FlaskConical,
    step: "02",
    title: "Dose calibration",
    body: "Each ingredient is set at or near the doses the studies actually used. If a clinical dose won't fit the capsule, it doesn't go in at all.",
  },
  {
    icon: GitMerge,
    step: "03",
    title: "Interaction check",
    body: "Stacks are composed so ingredients complement rather than compete — like theanine smoothing caffeine's edge in the classic 2:1 ratio.",
  },
  {
    icon: ShieldCheck,
    step: "04",
    title: "Batch verification",
    body: "Every production run is verified by an independent ISO-accredited lab before it ships. No pass, no release.",
  },
];

const MAX_DOSE = 650; // bar scale ceiling (mg)

export function ScienceContent() {
  const [selected, setSelected] = useState(scienceIngredients[0]);

  return (
    <div className="relative min-h-screen overflow-hidden pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="aurora-a absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-violet-600/12 blur-[140px]"
      />
      <div
        aria-hidden
        className="aurora-b absolute left-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.07] blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-28">
        {/* ===== Header ===== */}
        <SectionHeading
          index="01"
          eyebrow="Methodology"
          title={
            <>
              We read the studies,{" "}
              <span className="text-gradient">so you don&apos;t have to.</span>
            </>
          }
          description="Every Synaptiq formula begins in the literature and ends in an independent lab. Here's the full pipeline — and every molecule we use."
        />

        {/* ===== Process ===== */}
        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent md:block"
          />
          {process.map((item, i) => (
            <FadeIn key={item.step} delay={i * 0.1}>
              <div className="glass relative h-full rounded-3xl p-6 transition-all duration-300 hover:border-violet-400/40 hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.5)]">
                <div className="relative z-10 grid h-11 w-11 place-items-center rounded-2xl border border-violet-400/30 bg-zinc-950">
                  <item.icon className="h-5 w-5 text-violet-300" />
                </div>
                <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-zinc-600">
                  PHASE {item.step}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <Marquee
        items={[
          "Human trials first",
          "Clinical-range doses",
          "No proprietary blends",
          "Interaction-checked",
          "Independently verified",
        ]}
        reverse
      />

      {/* ===== Ingredient explorer ===== */}
      <div className="relative mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          index="02"
          eyebrow="The Molecules"
          title="Every ingredient, on the record."
          description="Select a molecule to see what it is, how it's thought to work, and the exact dose we run."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {scienceIngredients.map((ing) => (
                <button
                  key={ing.id}
                  onClick={() => setSelected(ing)}
                  className={cn(
                    "rounded-full border px-4 py-2 font-mono text-xs transition-all",
                    selected.id === ing.id
                      ? "border-violet-400/60 bg-violet-400/15 text-violet-200 shadow-[0_0_20px_-6px_rgba(139,92,246,0.8)]"
                      : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white"
                  )}
                >
                  {ing.name}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm"
              >
                <Corners />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                      {selected.class}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-white">
                      {selected.name}
                    </h3>
                  </div>
                  <span className="rounded-xl border border-violet-400/40 bg-violet-400/10 px-4 py-2 font-mono text-sm font-semibold text-violet-300">
                    {selected.dose}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  {selected.summary}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    Mechanism //{" "}
                  </span>
                  {selected.mechanism}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/5 pt-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    Deployed in:
                  </span>
                  {selected.foundIn.map((slug) => {
                    const product = products.find((p) => p.slug === slug);
                    if (!product) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/product/${slug}`}
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition-all hover:border-white/30 hover:text-white"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: product.accent,
                            boxShadow: `0 0 8px ${product.accent}`,
                          }}
                        />
                        {product.name}
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>

      {/* ===== Dose philosophy ===== */}
      <div className="relative mx-auto max-w-6xl px-4 pb-24">
        <SectionHeading
          index="03"
          eyebrow="Dosing"
          title="The dose makes the difference."
          description="A lot of the market sprinkles famous names at token doses. We size every ingredient against the ranges used in human research. Illustrative comparison below."
        />

        <div className="mt-12 space-y-10">
          {doseComparisons.map((row, i) => (
            <FadeIn key={row.ingredient} delay={i * 0.08}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-white">
                    {row.ingredient}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    Clinical range: {row.clinicalLow}–{row.clinicalHigh}{" "}
                    {row.unit}
                  </span>
                </div>
                <div className="mt-5 space-y-3.5">
                  {[
                    {
                      label: "Typical market dose",
                      value: row.market,
                      className: "bg-zinc-600",
                      glow: "none",
                    },
                    {
                      label: "SYNAPTIQ dose",
                      value: row.ours,
                      className: "bg-gradient-to-r from-violet-500 to-fuchsia-400",
                      glow: "0 0 14px rgba(139,92,246,0.8)",
                    },
                  ].map((bar) => (
                    <div key={bar.label} className="grid grid-cols-[140px_1fr_64px] items-center gap-4 sm:grid-cols-[180px_1fr_72px]">
                      <span className="text-xs text-zinc-400">{bar.label}</span>
                      <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
                        {/* clinical range band */}
                        <div
                          aria-hidden
                          className="absolute inset-y-0 rounded-full bg-white/[0.07]"
                          style={{
                            left: `${(row.clinicalLow / MAX_DOSE) * 100}%`,
                            width: `${((row.clinicalHigh - row.clinicalLow) / MAX_DOSE) * 100}%`,
                          }}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(bar.value / MAX_DOSE) * 100}%`,
                          }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.2,
                          }}
                          className={cn("relative h-full rounded-full", bar.className)}
                          style={{ boxShadow: bar.glow }}
                        />
                      </div>
                      <span className="text-right font-mono text-xs text-zinc-400">
                        {bar.value} {row.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <p className="mt-8 max-w-3xl text-xs italic leading-relaxed text-zinc-600">
            {DISCLAIMER}
          </p>
        </FadeIn>

        {/* ===== Cross-links ===== */}
        <FadeIn delay={0.15}>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Link
              href="/testing"
              className="border-animated group relative overflow-hidden rounded-3xl p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet-300">
                Next // Verification
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">
                See how every batch is verified
              </h3>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 group-hover:text-violet-200">
                Third-party testing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/shop"
              className="glass group relative overflow-hidden rounded-3xl p-8 transition-all hover:border-violet-400/40"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                Or // Deploy
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">
                Put the research to work
              </h3>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 group-hover:text-violet-200">
                Shop the stacks
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
