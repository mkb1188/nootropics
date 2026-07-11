import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  FlaskConical,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { Marquee } from "@/components/fx/Marquee";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { CountUp } from "@/components/fx/CountUp";
import HeroScene from "@/components/three/HeroScene";

const principles = [
  {
    icon: FlaskConical,
    title: "Clinical-range doses",
    body: "Every ingredient is dosed at or near the levels used in the studies — not sprinkled in for label decoration.",
    href: "/science",
    cta: "Read the science",
  },
  {
    icon: ShieldCheck,
    title: "Third-party tested",
    body: "Every batch is verified for identity, potency and heavy metals by an independent ISO-accredited lab.",
    href: "/testing",
    cta: "Verify a batch",
  },
  {
    icon: ScanSearch,
    title: "Radical transparency",
    body: "Zero proprietary blends. The full formula — every molecule, every milligram — is printed on the label.",
    href: "/faq",
    cta: "Common questions",
  },
];

const stats = [
  { value: 4, suffix: "", label: "Signature stacks" },
  { value: 0, suffix: "", label: "Proprietary blends" },
  { value: 100, suffix: "%", label: "Doses disclosed" },
];

const tickerItems = [
  "Clinical-range doses",
  "Zero proprietary blends",
  "Third-party tested",
  "Made for deep work",
  "Cognition, engineered",
  "No mystery molecules",
];

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-28">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="aurora-a absolute -top-40 right-[-5%] h-[620px] w-[620px] rounded-full bg-violet-600/15 blur-[140px]"
        />
        <div
          aria-hidden
          className="aurora-b absolute bottom-[-10%] left-[-12%] h-[480px] w-[480px] rounded-full bg-fuchsia-600/10 blur-[140px]"
        />
        <div
          aria-hidden
          className="aurora-b absolute left-1/3 top-1/4 h-[380px] w-[380px] rounded-full bg-cyan-500/[0.06] blur-[130px]"
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 pb-16 pt-8 lg:grid-cols-2 lg:pb-24">
          <div>
            <FadeIn>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-300">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-violet-400" />
                <ScrambleText text="PRECISION NOOTROPICS // EST. 2026" delay={400} />
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-tight text-white md:text-7xl">
                Think in{" "}
                <span className="text-gradient">higher resolution.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
                Clinically-dosed cognitive stacks for deep work, learning,
                clean energy and calm under pressure. No proprietary blends.
                No mystery. Just the molecules, at the doses the studies used.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 font-semibold text-white shadow-[0_0_36px_-8px_rgba(139,92,246,0.9)] transition-all hover:scale-[1.03] hover:bg-violet-400"
                >
                  Shop the stacks
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#stacks"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-zinc-200 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
                >
                  Meet the lineup
                  <ArrowDown className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-l border-violet-400/40 pl-4"
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-3xl font-bold text-white">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} className="relative h-[440px] md:h-[580px]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 45%, rgba(139,92,246,0.16), transparent 62%)",
              }}
            />
            <HeroScene accent="#a78bfa" />
            <div className="glass pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-2xl px-5 py-3 text-center">
              <p className="font-display text-sm font-bold tracking-widest text-white">
                DEEPWORK
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300">
                SYN-01 // Flagship focus stack
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <Marquee items={tickerItems} />

      {/* ============ FEATURED STACKS ============ */}
      <section id="stacks" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="01"
            eyebrow="The Lineup"
            title="Four stacks. Every mode of mind."
          />
          <FadeIn delay={0.1}>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 transition-colors hover:text-violet-200"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ============ PRINCIPLES ============ */}
      <section className="relative mx-auto max-w-6xl px-4 pb-24">
        <SectionHeading
          index="02"
          eyebrow="The Standard"
          title="Engineered, not brewed."
          align="center"
          className="flex justify-center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {principles.map((principle, i) => (
            <FadeIn key={principle.title} delay={i * 0.1}>
              <Link
                href={principle.href}
                className="glass group flex h-full flex-col rounded-3xl p-7 transition-all duration-300 hover:border-violet-400/40 hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.5)]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/30 bg-violet-400/10">
                  <principle.icon className="h-5 w-5 text-violet-300" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">
                  {principle.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                  {principle.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 transition-colors group-hover:text-violet-200">
                  {principle.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-28">
        <FadeIn>
          <div className="border-animated relative overflow-hidden rounded-3xl p-10 text-center shadow-[0_0_80px_-20px_rgba(139,92,246,0.4)] md:p-16">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
            <div
              aria-hidden
              className="aurora-a absolute -top-20 left-1/4 h-[300px] w-[300px] rounded-full bg-violet-600/20 blur-[100px]"
            />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet-300">
                [ 03 ] — Initiate protocol
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                Your brain runs everything.
                <br />
                <span className="text-gradient">Fund it accordingly.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-zinc-400">
                Pick the mode you need — focus, memory, energy, calm — or run
                the full protocol.
              </p>
              <Link
                href="/shop"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-8 py-4 font-semibold text-white shadow-[0_0_36px_-8px_rgba(139,92,246,0.9)] transition-all hover:scale-[1.03] hover:bg-violet-400"
              >
                Find your stack
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
