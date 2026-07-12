"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Package, ShoppingBag } from "lucide-react";
import { useOrders } from "@/store/orders";
import { formatPrice, formatDate } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { Corners } from "@/components/Corners";

export function OrdersContent() {
  const orders = useOrders((s) => s.orders);
  const [mounted, setMounted] = useState(false);

  // localStorage-backed store only has data after hydration; render a stable
  // shell first so server and client markup match.
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="min-h-screen pt-32" aria-hidden />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="aurora-a absolute -top-32 right-[-8%] h-[480px] w-[480px] rounded-full bg-violet-600/12 blur-[140px]"
      />

      <div className="relative mx-auto max-w-3xl px-4 pb-28">
        <SectionHeading
          index="01"
          eyebrow="Orders"
          title="Order history."
          description="Every stack you've placed, saved right here in this browser."
        />

        {orders.length === 0 ? (
          <FadeIn>
            <div className="mt-12 grid place-items-center rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <ShoppingBag className="h-7 w-7 text-zinc-500" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-white">
                No orders yet.
              </h2>
              <p className="mt-2 max-w-sm text-zinc-400">
                Once you place an order it&apos;ll show up here — stored locally
                on this device.
              </p>
              <Link
                href="/shop"
                className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,92,246,0.9)] transition-all hover:scale-[1.03] hover:bg-violet-400"
              >
                Shop the stacks
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        ) : (
          <div className="mt-12 space-y-5">
            {orders.map((order, i) => (
              <FadeIn key={order.id} delay={i * 0.05}>
                <div className="glass relative rounded-3xl p-6 md:p-7">
                  <Corners />
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                        Order
                      </p>
                      <p className="mt-1 font-mono text-lg font-bold text-white">
                        {order.id}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      <Check className="h-3 w-3" />
                      Confirmed
                    </span>
                  </div>

                  <div className="divide-y divide-white/5 py-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3.5 py-3"
                      >
                        <span
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10"
                          style={{
                            background: `radial-gradient(circle at 35% 30%, ${item.accent}33, transparent 70%)`,
                          }}
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{
                              background: item.accent,
                              boxShadow: `0 0 8px ${item.accent}`,
                            }}
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-display text-sm font-bold text-white">
                            {item.name}
                          </p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
                            {item.code} × {item.qty}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-zinc-200">
                          {formatPrice(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="flex items-center gap-2 text-xs text-zinc-500">
                      <Package className="h-3.5 w-3.5" />
                      Shipping to {order.city || "—"}
                    </span>
                    <span className="font-display text-lg font-bold text-white">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
