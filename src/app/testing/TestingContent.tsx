"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Atom,
  BadgeCheck,
  Fingerprint,
  Gauge,
  Microscope,
  Search,
} from "lucide-react";
import { products } from "@/data/products";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { Corners } from "@/components/Corners";

const pipeline = [
  {
    icon: Fingerprint,
    title: "Identity",
    method: "HPLC / FTIR",
    body: "Confirms every raw material is the exact compound and extract ratio on the label — not a cheaper cousin.",
  },
  {
    icon: Gauge,
    title: "Potency",
    method: "HPLC-UV",
    body: "Verifies each active sits within 98–102% of its label claim at the time of manufacture.",
  },
  {
    icon: Atom,
    title: "Heavy metals",
    method: "ICP-MS",
    body: "Screens lead, arsenic, cadmium and mercury against USP <2232> limits — parts-per-billion resolution.",
  },
  {
    icon: Microscope,
    title: "Microbiology",
    method: "USP <2021> / <2022>",
    body: "Rules out yeast, mold, E. coli, Salmonella and total aerobic counts beyond pharmacopeial limits.",
  },
];

type BatchRecord = {
  productId: string;
  mfg: string;
  lab: string;
  tests: { name: string; result: string }[];
};

const BATCHES: Record<string, BatchRecord> = {
  "SYN01-A2507": {
    productId: "deepwork",
    mfg: "2026-05-14",
    lab: "Veritas Analytical — ISO/IEC 17025",
    tests: [
      { name: "Identity (all actives)", result: "CONFIRMED" },
      { name: "Caffeine potency", result: "100.8% of claim" },
      { name: "L-Theanine potency", result: "99.4% of claim" },
      { name: "Citicoline potency", result: "101.1% of claim" },
      { name: "Heavy metals (Pb, As, Cd, Hg)", result: "< USP limits" },
      { name: "Microbiology panel", result: "WITHIN LIMITS" },
    ],
  },
  "SYN02-A2507": {
    productId: "engram",
    mfg: "2026-05-21",
    lab: "Veritas Analytical — ISO/IEC 17025",
    tests: [
      { name: "Identity (all actives)", result: "CONFIRMED" },
      { name: "Bacosides content", result: "50.6% (spec ≥ 50%)" },
      { name: "Alpha-GPC potency", result: "99.8% of claim" },
      { name: "Lion's Mane extract ratio", result: "8.2 : 1" },
      { name: "Heavy metals (Pb, As, Cd, Hg)", result: "< USP limits" },
      { name: "Microbiology panel", result: "WITHIN LIMITS" },
    ],
  },
  "SYN03-B2506": {
    productId: "voltaic",
    mfg: "2026-04-30",
    lab: "Veritas Analytical — ISO/IEC 17025",
    tests: [
      { name: "Identity (all actives)", result: "CONFIRMED" },
      { name: "ALCAR potency", result: "100.2% of claim" },
      { name: "Rosavins / salidroside", result: "3.1% / 1.0%" },
      { name: "B12 potency", result: "102.0% of claim" },
      { name: "Heavy metals (Pb, As, Cd, Hg)", result: "< USP limits" },
      { name: "Microbiology panel", result: "WITHIN LIMITS" },
    ],
  },
  "SYN04-B2506": {
    productId: "stillwave",
    mfg: "2026-05-02",
    lab: "Veritas Analytical — ISO/IEC 17025",
    tests: [
      { name: "Identity (all actives)", result: "CONFIRMED" },
      { name: "Withanolides content", result: "5.1% (spec ≥ 5%)" },
      { name: "L-Theanine potency", result: "100.5% of claim" },
      { name: "Elemental magnesium", result: "99.1% of claim" },
      { name: "Heavy metals (Pb, As, Cd, Hg)", result: "< USP limits" },
      { name: "Microbiology panel", result: "WITHIN LIMITS" },
    ],
  },
};

const standards = [
  "cGMP facility",
  "ISO/IEC 17025 labs",
  "COA on every batch",
  "USP screening limits",
];

export function TestingContent() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<
    { code: string; record: BatchRecord } | "notfound" | null
  >(null);
  const [attempt, setAttempt] = useState(0);

  const lookup = (raw: string) => {
    const code = raw.trim().toUpperCase();
    if (!code) return;
    const record = BATCHES[code];
    setAttempt((n) => n + 1);
    setResult(record ? { code, record } : "notfound");
  };

  const resultProduct =
    result && result !== "notfound"
      ? products.find((p) => p.id === result.record.productId)
      : undefined;

  return (
    <div className="relative min-h-screen overflow-hidden pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="aurora-a absolute -top-40 left-[-8%] h-[520px] w-[520px] rounded-full bg-emerald-500/[0.08] blur-[140px]"
      />
      <div
        aria-hidden
        className="aurora-b absolute right-[-10%] top-1/3 h-[460px] w-[460px] rounded-full bg-violet-600/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-28">
        <SectionHeading
          index="01"
          eyebrow="Verification"
          title={
            <>
              Trust, but verify.{" "}
              <span className="text-gradient">Then verify again.</span>
            </>
          }
          description="Every production batch runs a four-stage gauntlet at an independent ISO-accredited lab before release. No pass, no ship."
        />

        {/* ===== Pipeline ===== */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map((stage, i) => (
            <FadeIn key={stage.title} delay={i * 0.08}>
              <div className="glass group relative h-full rounded-3xl p-6 transition-all duration-300 hover:border-emerald-400/40 hover:shadow-[0_0_40px_-12px_rgba(52,211,153,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
                    <stage.icon className="h-5 w-5 text-emerald-300" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {stage.title}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/80">
                  {stage.method}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {stage.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ===== Batch lookup ===== */}
        <div className="mt-24">
          <SectionHeading
            index="02"
            eyebrow="Batch Lookup"
            title="Pull the certificate yourself."
            description="Enter the batch code printed on the base of your bottle to pull its certificate of analysis. Try one of the sample codes below."
          />

          <FadeIn delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                lookup(query);
              }}
              className="mt-8 flex max-w-xl gap-3"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SYN01-A2507"
                  spellCheck={false}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 font-mono text-sm uppercase tracking-[0.15em] text-white placeholder-zinc-600 outline-none transition-colors focus:border-emerald-400/60"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="rounded-xl bg-emerald-500 px-6 font-semibold text-zinc-950 shadow-[0_0_28px_-8px_rgba(52,211,153,0.9)] transition-colors hover:bg-emerald-400"
              >
                Verify
              </motion.button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Sample codes:
              </span>
              {Object.keys(BATCHES).map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setQuery(code);
                    lookup(code);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-zinc-400 transition-all hover:border-emerald-400/40 hover:text-emerald-300"
                >
                  {code}
                </button>
              ))}
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            {result === "notfound" && (
              <motion.div
                key={`nf-${attempt}`}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="mt-8 max-w-xl rounded-2xl border border-red-400/30 bg-red-400/[0.06] p-5"
              >
                <p className="font-mono text-sm text-red-300">
                  BATCH NOT FOUND
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  No certificate matches that code. Try one of the sample codes
                  listed above.
                </p>
              </motion.div>
            )}

            {result && result !== "notfound" && resultProduct && (
              <motion.div
                key={result.code}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="border-animated relative mt-8 max-w-3xl overflow-hidden rounded-3xl p-7 md:p-9"
              >
                <Corners />
                {/* VERIFIED stamp */}
                <motion.div
                  initial={{ scale: 2.4, opacity: 0, rotate: -24 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                    delay: 0.35,
                  }}
                  className="pointer-events-none absolute right-6 top-6 rounded-lg border-2 px-4 py-1.5 font-mono text-sm font-bold tracking-[0.25em]"
                  style={{
                    color: "#34d399",
                    borderColor: "#34d399aa",
                    textShadow: "0 0 18px rgba(52,211,153,0.8)",
                    boxShadow:
                      "0 0 24px -6px rgba(52,211,153,0.6), inset 0 0 18px -8px rgba(52,211,153,0.5)",
                  }}
                >
                  VERIFIED
                </motion.div>

                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  Certificate of analysis // {result.code}
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-3xl font-bold text-white">
                    {resultProduct.name}
                  </h3>
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.2em]"
                    style={{ color: resultProduct.accent }}
                  >
                    {resultProduct.categoryLabel}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-zinc-500">
                  MFG {result.record.mfg} · {result.record.lab}
                </p>

                <div className="mt-6 divide-y divide-white/5 border-t border-white/10">
                  {result.record.tests.map((test, i) => (
                    <motion.div
                      key={test.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <span className="text-sm text-zinc-300">{test.name}</span>
                      <span className="flex items-center gap-2 font-mono text-xs text-emerald-300">
                        {test.result}
                        <BadgeCheck className="h-4 w-4" />
                      </span>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  // Demo data for illustration
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== Standards ===== */}
        <FadeIn delay={0.1}>
          <div className="mt-20 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-4">
            {standards.map((standard) => (
              <div
                key={standard}
                className="flex items-center gap-3 rounded-2xl px-2 py-3"
              >
                <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-300" />
                <span className="text-sm font-semibold text-zinc-300">
                  {standard}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
