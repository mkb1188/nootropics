"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Zap } from "lucide-react";
import { products, DISCLAIMER } from "@/data/products";

const companyLinks = [
  { label: "The Science", href: "/science" },
  { label: "Third-Party Testing", href: "/testing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-zinc-950">
      <div className="relative mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-bold tracking-[0.2em] text-white"
            >
              <Zap className="h-5 w-5 text-violet-400" aria-hidden />
              SYNAPTIQ
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Precision nootropic stacks for people who think for a living.
              Clinical-range doses, zero proprietary blends.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/90">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              All systems nominal
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Stacks
            </h3>
            <ul className="mt-4 space-y-2.5">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.slug}`}
                    className="group flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    <span
                      className="h-1 w-1 rounded-full opacity-60 transition-opacity group-hover:opacity-100"
                      style={{ background: p.accent }}
                    />
                    {p.name} — {p.categoryLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Neural Dispatch
            </h3>
            <p className="mt-4 text-sm text-zinc-500">
              Protocols, research digests, early drops. No noise.
            </p>
            {subscribed ? (
              <p className="mt-3 flex items-center gap-2 text-sm text-violet-300">
                <Check className="h-4 w-4" /> You&apos;re on the list.
              </p>
            ) : (
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-violet-400/60"
                />
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  type="submit"
                  aria-label="Subscribe"
                  className="grid shrink-0 place-items-center rounded-xl bg-violet-500 px-3.5 text-white shadow-[0_0_20px_-6px_rgba(139,92,246,0.8)] transition-colors hover:bg-violet-400"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs leading-relaxed text-zinc-500">{DISCLAIMER}</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-zinc-600 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Synaptiq Labs. Demo storefront — not a
            real store.
          </span>
          <span className="font-mono tracking-[0.25em]">
            DESIGNED FOR DEEP WORK
          </span>
        </div>
      </div>

      {/* giant watermark wordmark */}
      <div
        aria-hidden
        className="pointer-events-none -mb-[5vw] select-none text-center font-display text-[19vw] font-bold leading-none tracking-tight"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.055), rgba(255,255,255,0))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        SYNAPTIQ
      </div>
    </footer>
  );
}
