import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrambleText } from "@/components/fx/ScrambleText";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="aurora-a absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[130px]"
      />
      <div className="relative px-4 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet-300">
          <ScrambleText text="[ ERR // 404 — ROUTE NOT FOUND ]" />
        </p>
        <h1 className="mt-5 font-display text-6xl font-bold tracking-tight text-white md:text-8xl">
          Signal <span className="text-gradient">lost.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-zinc-400">
          The page you requested doesn&apos;t exist — or it dissolved. Either
          way, the stacks are still where you left them.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-zinc-200 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back home
          </Link>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,92,246,0.9)] transition-all hover:scale-[1.03] hover:bg-violet-400"
          >
            Shop the stacks
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
