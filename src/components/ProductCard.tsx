"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Plus } from "lucide-react";
import CardScene from "@/components/three/CardScene";
import { Corners } from "@/components/Corners";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

const SPRING = { stiffness: 160, damping: 18 };

/** 3D-tilting product card with pointer sheen, HUD brackets and live bottle */
export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const add = useCart((s) => s.add);
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(-py * 8);
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        boxShadow: hovered
          ? `0 24px 64px -24px ${product.accent}66, 0 0 0 1px ${product.accent}44`
          : "0 12px 40px -24px rgba(0,0,0,0.9)",
        transition: "box-shadow 0.4s ease",
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
    >
      {/* pointer-tracking sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.07), transparent 55%)",
        }}
      />

      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-56">
          <Corners />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 45%, ${product.accent}1f, transparent 65%)`,
            }}
          />
          <CardScene accent={product.accent} hovered={hovered} />
          <span className="absolute left-4 top-3 font-mono text-[10px] tracking-[0.2em] text-zinc-600">
            {product.code}
          </span>
        </div>
        <div className="px-5 pt-1">
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: product.accent }}
            >
              {product.categoryLabel}
            </span>
            <span className="text-sm font-semibold text-zinc-200">
              {formatPrice(product.price)}
            </span>
          </div>
          <h3 className="mt-1.5 font-display text-xl font-bold text-white">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {product.tagline}
          </p>
        </div>
      </Link>

      <div className="mt-auto p-5">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => add(product.id)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          style={{
            borderColor: hovered ? `${product.accent}88` : undefined,
            transition: "border-color 0.3s ease, background-color 0.2s ease",
          }}
        >
          <Plus className="h-4 w-4" style={{ color: product.accent }} />
          Add to cart
        </motion.button>
        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
          <span>{product.ingredients.length}× actives</span>
          <span>{product.servings}</span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: product.accent,
              boxShadow: `0 0 8px ${product.accent}`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
