"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Loader2,
  Lock,
  MapPin,
  Mail,
  ShoppingBag,
} from "lucide-react";
import { useCart, cartSubtotal } from "@/store/cart";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { Corners } from "@/components/Corners";

const FREE_SHIPPING_THRESHOLD = 80;
const SHIPPING_FLAT = 6.9;

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-violet-400/60";

function Field({
  id,
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400"
      >
        {label}
      </label>
      <input id={id} className={inputClass} {...props} />
    </div>
  );
}

function makeOrderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SYN-${id}`;
}

type Phase = "form" | "placing" | "done";

export function CheckoutContent() {
  const { lines, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [orderId, setOrderId] = useState("");

  useEffect(() => setMounted(true), []);

  const subtotal = cartSubtotal(lines);
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  const placeOrder = () => {
    setPhase("placing");
    const id = makeOrderId();
    // fake payment processing beat
    setTimeout(() => {
      setOrderId(id);
      setPhase("done");
      clear();
    }, 1400);
  };

  // Until the persisted cart rehydrates, render a stable shell
  if (!mounted) {
    return <div className="min-h-screen pt-32" aria-hidden />;
  }

  /* ===== Success ===== */
  if (phase === "done") {
    return (
      <div className="relative min-h-screen overflow-hidden pt-32">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
        <div
          aria-hidden
          className="aurora-a absolute left-1/2 top-1/4 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[130px]"
        />
        <div className="relative mx-auto max-w-2xl px-4 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="border-animated relative rounded-3xl p-10 text-center md:p-14"
          >
            <Corners />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 15,
                delay: 0.15,
              }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-violet-400/50 bg-violet-400/10 shadow-[0_0_50px_-8px_rgba(139,92,246,0.9)]"
            >
              <Check className="h-9 w-9 text-violet-300" />
            </motion.div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-violet-300">
              Order confirmed
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Stack inbound.
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-zinc-400">
              Order{" "}
              <span className="font-mono font-semibold text-white">
                {orderId}
              </span>{" "}
              is confirmed. A receipt is on its way to your inbox.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              // Demo order — nothing was charged or shipped
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,92,246,0.9)] transition-all hover:scale-[1.03] hover:bg-violet-400"
              >
                Keep browsing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-zinc-200 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
              >
                Back home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ===== Empty cart ===== */
  if (lines.length === 0) {
    return (
      <div className="relative min-h-screen overflow-hidden pt-32">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-2xl px-4 pb-28 text-center">
          <FadeIn>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/5">
              <ShoppingBag className="h-7 w-7 text-zinc-500" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white">
              Nothing to check out — yet.
            </h1>
            <p className="mt-3 text-zinc-400">
              Your stack is empty. Pick a mode of mind first.
            </p>
            <Link
              href="/shop"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,92,246,0.9)] transition-all hover:scale-[1.03] hover:bg-violet-400"
            >
              Shop the stacks
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </div>
    );
  }

  /* ===== Checkout form ===== */
  return (
    <div className="relative min-h-screen overflow-hidden pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="aurora-a absolute -top-32 right-[-8%] h-[480px] w-[480px] rounded-full bg-violet-600/12 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-28">
        <FadeIn>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Continue shopping
          </Link>
        </FadeIn>

        <div className="mt-6">
          <SectionHeading
            index="01"
            eyebrow="Checkout"
            title="Lock in your protocol."
            description="Demo checkout — any values work, nothing is charged, nothing ships."
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            placeOrder();
          }}
          className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-12"
        >
          {/* ===== Left: forms ===== */}
          <div className="space-y-8">
            <FadeIn>
              <fieldset className="glass rounded-3xl p-6 md:p-7">
                <legend className="sr-only">Contact</legend>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-violet-400/30 bg-violet-400/10">
                    <Mail className="h-4 w-4 text-violet-300" />
                  </span>
                  <h2 className="font-display text-base font-bold uppercase tracking-[0.15em] text-white">
                    Contact
                  </h2>
                </div>
                <div className="mt-5">
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    required
                    placeholder="you@university.edu"
                    autoComplete="email"
                  />
                </div>
              </fieldset>
            </FadeIn>

            <FadeIn delay={0.06}>
              <fieldset className="glass rounded-3xl p-6 md:p-7">
                <legend className="sr-only">Shipping</legend>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-violet-400/30 bg-violet-400/10">
                    <MapPin className="h-4 w-4 text-violet-300" />
                  </span>
                  <h2 className="font-display text-base font-bold uppercase tracking-[0.15em] text-white">
                    Shipping
                  </h2>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Full name"
                    required
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    className="sm:col-span-2"
                  />
                  <Field
                    id="address"
                    label="Address"
                    required
                    placeholder="1 Analytical Engine Way"
                    autoComplete="street-address"
                    className="sm:col-span-2"
                  />
                  <Field
                    id="city"
                    label="City"
                    required
                    placeholder="San Francisco"
                    autoComplete="address-level2"
                  />
                  <Field
                    id="zip"
                    label="ZIP / Postcode"
                    required
                    placeholder="94103"
                    autoComplete="postal-code"
                  />
                </div>
              </fieldset>
            </FadeIn>

            <FadeIn delay={0.12}>
              <fieldset className="glass rounded-3xl p-6 md:p-7">
                <legend className="sr-only">Payment</legend>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-violet-400/30 bg-violet-400/10">
                      <CreditCard className="h-4 w-4 text-violet-300" />
                    </span>
                    <h2 className="font-display text-base font-bold uppercase tracking-[0.15em] text-white">
                      Payment
                    </h2>
                  </div>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    <Lock className="h-3 w-3" />
                    Demo — not charged
                  </span>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field
                    id="card"
                    label="Card number"
                    required
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    autoComplete="cc-number"
                    className="sm:col-span-2"
                  />
                  <Field
                    id="expiry"
                    label="Expiry"
                    required
                    placeholder="MM / YY"
                    autoComplete="cc-exp"
                  />
                  <Field
                    id="cvc"
                    label="CVC"
                    required
                    inputMode="numeric"
                    placeholder="123"
                    autoComplete="cc-csc"
                  />
                </div>
              </fieldset>
            </FadeIn>
          </div>

          {/* ===== Right: order summary ===== */}
          <FadeIn delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-animated relative rounded-3xl p-6 md:p-7">
              <Corners />
              <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                Order manifest
              </h2>
              <div className="mt-4 divide-y divide-white/5">
                {lines.map((line) => {
                  const product = products.find((p) => p.id === line.id);
                  if (!product) return null;
                  return (
                    <div
                      key={line.id}
                      className="flex items-center gap-3.5 py-3.5"
                    >
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, ${product.accent}33, transparent 70%)`,
                        }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            background: product.accent,
                            boxShadow: `0 0 8px ${product.accent}`,
                          }}
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-bold text-white">
                          {product.name}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
                          {product.code} × {line.qty}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-zinc-200">
                        {formatPrice(product.price * line.qty)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 space-y-2.5 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-zinc-200">
                    {shipping === 0 ? (
                      <span className="text-violet-300">FREE ⚡</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
                  <span className="font-semibold text-white">Total</span>
                  <span className="font-display text-2xl font-bold text-white">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={phase === "form" ? { scale: 1.015 } : undefined}
                whileTap={phase === "form" ? { scale: 0.98 } : undefined}
                type="submit"
                disabled={phase !== "form"}
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-violet-500 py-3.5 font-semibold text-white shadow-[0_0_30px_-6px_rgba(139,92,246,0.9)] transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-80"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {phase === "placing" ? (
                    <motion.span
                      key="placing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2.5"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Encrypting transmission…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2.5"
                    >
                      <Lock className="h-4 w-4" />
                      Place order — {formatPrice(total)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                30-day guarantee · third-party tested · demo store
              </p>
            </div>
          </FadeIn>
        </form>
      </div>
    </div>
  );
}
