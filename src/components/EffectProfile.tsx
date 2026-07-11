"use client";

import { motion } from "framer-motion";
import type { Product } from "@/data/products";

const AXES: { key: keyof Product["profile"]; label: string }[] = [
  { key: "focus", label: "Focus" },
  { key: "memory", label: "Memory" },
  { key: "energy", label: "Energy" },
  { key: "calm", label: "Calm" },
];

/** Animated intensity bars visualizing a stack's effect profile (0–5) */
export function EffectProfile({
  profile,
  accent,
}: {
  profile: Product["profile"];
  accent: string;
}) {
  return (
    <div className="space-y-4">
      {AXES.map((axis, i) => {
        const value = profile[axis.key];
        return (
          <div key={axis.key}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {axis.label}
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                {value}/5
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(value / 5) * 100}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${accent}55, ${accent})`,
                  boxShadow: `0 0 12px ${accent}aa`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
