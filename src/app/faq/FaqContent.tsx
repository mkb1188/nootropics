"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do I choose my first stack?",
    a: "Start from the job you need done. Long focused work sessions → DEEPWORK. Studying and retention → ENGRAM. All-day output without caffeine → VOLTAIC. High-pressure weeks or wind-down → STILLWAVE. If you're torn, DEEPWORK is the flagship for a reason.",
  },
  {
    q: "Can I combine stacks?",
    a: "DEEPWORK + ENGRAM is the most common pairing (mornings + daily), and VOLTAIC + STILLWAVE bookends a day nicely. If you combine formulas that share an ingredient — both DEEPWORK and STILLWAVE contain 200 mg L-theanine — tally your totals, and run new combinations past a healthcare professional first.",
  },
  {
    q: "How long until I notice anything?",
    a: "It depends on the ingredient class. Caffeine + L-theanine is same-hour. Adaptogens like rhodiola and ashwagandha are typically evaluated over one to several weeks. Bacopa is the marathon: studies generally show memory effects after 8–12 weeks of consistent daily use. We print realistic timelines on every product page.",
  },
  {
    q: "Is this safe? What about medication interactions?",
    a: "Every ingredient is used at doses within the ranges studied in healthy adults, but 'generally well tolerated in studies' is not personal medical advice. If you take any medication, have a medical condition, or are pregnant or nursing — talk to a licensed professional before starting anything, including this.",
  },
  {
    q: "Will I build tolerance?",
    a: "Caffeine tolerance is real, which is why DEEPWORK holds it to 100 mg and we suggest keeping caffeine-free days. VOLTAIC is stimulant-free by design. For rhodiola we suggest cycling (5 days on, 2 off). Bacopa and ashwagandha aren't generally associated with tolerance in the research.",
  },
  {
    q: "How do I know what's actually in the bottle?",
    a: "Every batch is tested by an independent ISO/IEC 17025 lab for identity, potency, heavy metals, and microbiology — and every bottle carries a batch code you can look up on our Testing page to see its certificate of analysis.",
  },
  {
    q: "Are the capsules vegan? Any allergens?",
    a: "Capsules are plant-cellulose (HPMC). The formulas contain no gluten, dairy, soy, or animal-derived ingredients, and are produced in a cGMP facility. As always, check the full label if you have severe allergies.",
  },
  {
    q: "What's your shipping and returns policy?",
    a: "Free shipping on orders over $80, flat $6.90 below that, and an unconditional 30-day money-back guarantee — even on empty bottles. Every order you place is saved to your order history.",
  },
  {
    q: "Do you offer subscriptions?",
    a: "On the roadmap: 15% off, pause or cancel anytime, and batch COAs emailed with every shipment. For now, reorder any stack in a couple of clicks from the shop.",
  },
];

export function FaqContent() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen overflow-hidden pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="aurora-a absolute -top-40 right-[-8%] h-[500px] w-[500px] rounded-full bg-violet-600/12 blur-[140px]"
      />

      <div className="relative mx-auto max-w-3xl px-4 pb-28">
        <SectionHeading
          index="01"
          eyebrow="FAQ"
          title="Questions, answered."
          description="Everything people ask before their first order — stacking logic, timelines, safety, and what's actually in the bottle."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={faq.q} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300",
                    isOpen
                      ? "border-violet-400/40 bg-white/[0.04] shadow-[0_0_36px_-12px_rgba(139,92,246,0.5)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-zinc-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base font-bold text-white">
                        {faq.q}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-lg border transition-colors",
                        isOpen
                          ? "border-violet-400/50 text-violet-300"
                          : "border-white/10 text-zinc-400"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-6 pl-[4.25rem] text-sm leading-relaxed text-zinc-400">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.1}>
          <div className="border-animated mt-14 rounded-3xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-white">
              Still holding a question?
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Open a channel — a human replies within 24 hours.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,92,246,0.9)] transition-all hover:scale-[1.03] hover:bg-violet-400"
            >
              Contact us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
