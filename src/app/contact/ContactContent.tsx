"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Mail, MapPin, Send } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { Corners } from "@/components/Corners";
import { ScrambleText } from "@/components/fx/ScrambleText";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "support@synaptiq.demo",
    note: "Best for order and product questions",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "< 24 hours",
    note: "A human, not an autoresponder",
  },
  {
    icon: MapPin,
    label: "HQ",
    value: "San Francisco, CA",
    note: "37.7749° N, 122.4194° W",
  },
];

const topics = ["Support", "Orders", "The Science", "Press"];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-violet-400/60";

export function ContactContent() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(topics[0]);

  return (
    <div className="relative min-h-screen overflow-hidden pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="aurora-a absolute -top-32 left-[-8%] h-[500px] w-[500px] rounded-full bg-violet-600/12 blur-[140px]"
      />
      <div
        aria-hidden
        className="aurora-b absolute bottom-0 right-[-10%] h-[420px] w-[420px] rounded-full bg-fuchsia-600/[0.08] blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ===== Left: copy + channels ===== */}
          <div>
            <SectionHeading
              index="01"
              eyebrow="Contact"
              title={
                <>
                  Open a <span className="text-gradient">channel.</span>
                </>
              }
              description="Questions about a stack, an order, or the research behind a dose — send it through. Signal in, signal out."
            />

            <div className="mt-10 space-y-4">
              {channels.map((channel, i) => (
                <FadeIn key={channel.label} delay={0.1 + i * 0.08}>
                  <div className="glass flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-violet-400/40">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-violet-400/30 bg-violet-400/10">
                      <channel.icon className="h-5 w-5 text-violet-300" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                        {channel.label}
                      </p>
                      <p className="font-display text-base font-bold text-white">
                        {channel.value}
                      </p>
                      <p className="text-xs text-zinc-500">{channel.note}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.35}>
              <p className="mt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-zinc-600">
                <ScrambleText text="// TRANSMISSIONS MONITORED 09:00—18:00 PT" delay={600} />
              </p>
            </FadeIn>
          </div>

          {/* ===== Right: form ===== */}
          <FadeIn delay={0.15}>
            <div className="border-animated relative rounded-3xl p-7 md:p-9">
              <Corners />
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                        delay: 0.1,
                      }}
                      className="grid h-16 w-16 place-items-center rounded-full border border-violet-400/50 bg-violet-400/10 shadow-[0_0_40px_-8px_rgba(139,92,246,0.8)]"
                    >
                      <Check className="h-7 w-7 text-violet-300" />
                    </motion.div>
                    <h2 className="mt-6 font-display text-2xl font-bold text-white">
                      Transmission received.
                    </h2>
                    <p className="mt-2 max-w-xs text-sm text-zinc-400">
                      A human will reply within 24 hours. (Demo — nothing was
                      actually sent.)
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-6 text-sm font-semibold text-violet-300 transition-colors hover:text-violet-200"
                    >
                      Send another →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, y: -8 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-5"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                      New transmission
                    </p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          required
                          placeholder="Ada L."
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="you@university.edu"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                        Topic
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {topics.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTopic(t)}
                            className={
                              topic === t
                                ? "rounded-full border border-violet-400/60 bg-violet-400/15 px-4 py-1.5 text-xs font-semibold text-violet-200 shadow-[0_0_16px_-6px_rgba(139,92,246,0.8)]"
                                : "rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:text-white"
                            }
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="What's on your mind?"
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-violet-500 py-3.5 font-semibold text-white shadow-[0_0_30px_-6px_rgba(139,92,246,0.9)] transition-colors hover:bg-violet-400"
                    >
                      <Send className="h-4 w-4" />
                      Transmit
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
