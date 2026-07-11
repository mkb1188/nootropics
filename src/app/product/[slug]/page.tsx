import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, MoveHorizontal } from "lucide-react";
import { products, getProduct, DISCLAIMER } from "@/data/products";
import ProductViewer from "@/components/three/ProductViewer";
import { BuyBox } from "@/components/BuyBox";
import { FadeIn } from "@/components/FadeIn";
import { Corners } from "@/components/Corners";
import { EffectProfile } from "@/components/EffectProfile";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product ? product.name : "Not found",
    description: product?.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const pairedWith = getProduct(product.pairsWith);

  return (
    <div className="relative min-h-screen overflow-hidden pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="aurora-a absolute -top-32 left-1/4 h-[480px] w-[640px] rounded-full blur-[150px]"
        style={{ background: `${product.accent}14` }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-28">
        <FadeIn>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All stacks
          </Link>
        </FadeIn>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ===== 3D viewer ===== */}
          <FadeIn className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="relative h-[440px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] md:h-[560px]"
              style={{
                boxShadow: `0 30px 90px -40px ${product.accent}55`,
              }}
            >
              <Corners />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 50% 45%, ${product.accent}1a, transparent 65%)`,
                }}
              />
              <ProductViewer accent={product.accent} />
              <span className="absolute left-5 top-4 font-mono text-[10px] tracking-[0.25em] text-zinc-500">
                {product.code} // 360° RENDER
              </span>
              <div className="glass pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300">
                <MoveHorizontal className="h-3.5 w-3.5" />
                Drag to explore
              </div>
            </div>
          </FadeIn>

          {/* ===== Details ===== */}
          <div>
            <FadeIn>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-block rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{
                    color: product.accent,
                    borderColor: `${product.accent}55`,
                    background: `${product.accent}14`,
                  }}
                >
                  {product.categoryLabel}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-600">
                  {product.code} // PROTOCOL
                </span>
              </div>
              <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-white md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-3 text-lg text-zinc-400">{product.tagline}</p>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-white">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-zinc-500">
                  {product.servings} · one month
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 leading-relaxed text-zinc-400">
                {product.description}
              </p>
              <ul className="mt-6 space-y-3">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                      style={{ background: `${product.accent}26` }}
                    >
                      <Check
                        className="h-3 w-3"
                        style={{ color: product.accent }}
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-zinc-300">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
              <BuyBox product={product} />
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="relative mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                <Corners />
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
                  Effect profile
                </h2>
                <div className="mt-5">
                  <EffectProfile
                    profile={product.profile}
                    accent={product.accent}
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
                  Inside the stack
                </h2>
                <div className="mt-4 divide-y divide-white/5">
                  {product.ingredients.map((ingredient) => (
                    <div
                      key={ingredient.name}
                      className="flex items-start justify-between gap-6 py-3.5"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {ingredient.name}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">
                          {ingredient.role}
                        </p>
                      </div>
                      <span
                        className="shrink-0 font-mono text-sm font-semibold"
                        style={{ color: product.accent }}
                      >
                        {ingredient.dose}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div
                className="mt-6 rounded-3xl border p-6"
                style={{
                  borderColor: `${product.accent}33`,
                  background: `${product.accent}0d`,
                }}
              >
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
                  Suggested protocol
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {product.protocol}
                </p>
              </div>

              {pairedWith && (
                <Link
                  href={`/product/${pairedWith.slug}`}
                  className="group mt-6 flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.05]"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${pairedWith.accent}33, transparent 70%)`,
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: pairedWith.accent,
                        boxShadow: `0 0 10px ${pairedWith.accent}`,
                      }}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Stacks well with
                    </span>
                    <span className="block font-display text-base font-bold text-white">
                      {pairedWith.name}{" "}
                      <span className="font-sans text-sm font-normal text-zinc-500">
                        — {pairedWith.categoryLabel}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                    {formatPrice(pairedWith.price)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )}

              <p className="mt-6 text-xs italic leading-relaxed text-zinc-600">
                {DISCLAIMER}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
