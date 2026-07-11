"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

export function BuyBox({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1.5">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="grid h-9 w-9 place-items-center rounded-lg text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Minus className="h-4 w-4" />
        </motion.button>
        <span className="w-8 text-center font-display text-lg font-bold text-white">
          {qty}
        </span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
          className="grid h-9 w-9 place-items-center rounded-lg text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Plus className="h-4 w-4" />
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          add(product.id, qty);
          setQty(1);
        }}
        className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 font-semibold text-white transition-colors sm:flex-none"
        style={{
          background: product.accent,
          color: "#0a0a0c",
          boxShadow: `0 0 36px -8px ${product.accent}e6`,
        }}
      >
        <ShoppingBag className="h-4 w-4" />
        Add to cart — {formatPrice(product.price * qty)}
      </motion.button>
    </div>
  );
}
