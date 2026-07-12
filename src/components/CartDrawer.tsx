"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart, cartSubtotal, cartCount } from "@/store/cart";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 80;

export function CartDrawer() {
  const { lines, isOpen, close, setQty, remove } = useCart();
  const subtotal = cartSubtotal(lines);
  const count = cartCount(lines);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const progress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-zinc-950/90 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-display text-lg font-bold tracking-wide text-white">
                Your Stack{" "}
                {count > 0 && (
                  <span className="ml-1 text-sm font-normal text-zinc-400">
                    ({count} {count === 1 ? "item" : "items"})
                  </span>
                )}
              </h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={close}
                aria-label="Close cart"
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/5">
                  <ShoppingBag className="h-7 w-7 text-zinc-500" />
                </div>
                <p className="text-zinc-400">Your stack is empty.</p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.8)] transition-transform hover:scale-[1.03]"
                >
                  Browse the stacks
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-white/10 px-6 py-4">
                  <p className="text-xs text-zinc-400">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-violet-300">
                        You&apos;ve unlocked free shipping ⚡
                      </span>
                    ) : (
                      <>
                        {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} away
                        from free shipping
                      </>
                    )}
                  </p>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ type: "spring", damping: 25 }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => {
                      const product = products.find((p) => p.id === line.id);
                      if (!product) return null;
                      return (
                        <motion.div
                          key={line.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          className="mb-3 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                        >
                          <div
                            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10"
                            style={{
                              background: `radial-gradient(circle at 35% 30%, ${product.accent}33, transparent 70%)`,
                            }}
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                background: product.accent,
                                boxShadow: `0 0 10px ${product.accent}`,
                              }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <Link
                              href={`/product/${product.slug}`}
                              onClick={close}
                              className="font-display text-sm font-bold text-white hover:text-violet-300"
                            >
                              {product.name}
                            </Link>
                            <p className="text-xs text-zinc-500">
                              {product.categoryLabel}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                onClick={() => setQty(line.id, line.qty - 1)}
                                aria-label="Decrease quantity"
                                className="grid h-6 w-6 place-items-center rounded-md border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:text-white"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold text-white">
                                {line.qty}
                              </span>
                              <button
                                onClick={() => setQty(line.id, line.qty + 1)}
                                aria-label="Increase quantity"
                                className="grid h-6 w-6 place-items-center rounded-md border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:text-white"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-sm font-semibold text-white">
                              {formatPrice(product.price * line.qty)}
                            </span>
                            <button
                              onClick={() => remove(line.id)}
                              aria-label={`Remove ${product.name}`}
                              className="text-zinc-500 transition-colors hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="border-t border-white/10 px-6 py-5">
                  <div className="mb-1 flex items-center justify-between text-sm text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-display text-lg font-bold text-white">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-zinc-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="block w-full rounded-xl bg-violet-500 py-3.5 text-center font-semibold text-white shadow-[0_0_30px_-6px_rgba(139,92,246,0.9)] transition-all hover:scale-[1.015] hover:bg-violet-400 active:scale-[0.98]"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/orders"
                    onClick={close}
                    className="mt-3 block text-center text-xs font-semibold text-zinc-500 transition-colors hover:text-violet-300"
                  >
                    View past orders
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
