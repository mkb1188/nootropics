"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { products, categories, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type Filter = Category | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All stacks" },
  ...categories,
];

export default function ShopPage() {
  const [active, setActive] = useState<Filter>("all");
  const visible =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="relative min-h-screen overflow-hidden pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="aurora-a absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-28">
        <SectionHeading
          index="01"
          eyebrow="The Arsenal"
          title="Shop the stacks."
          description="Four modes of mind, one formula each. Every dose disclosed, every batch third-party tested."
        />

        <FadeIn delay={0.15}>
          <div className="mt-10 inline-flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActive(filter.id)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                  active === filter.id
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {active === filter.id && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-violet-500 shadow-[0_0_24px_-6px_rgba(139,92,246,0.9)]"
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visible.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
          // Showing {visible.length} of {products.length} stacks
        </p>
      </div>
    </div>
  );
}
