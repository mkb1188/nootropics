"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X, Zap } from "lucide-react";
import { useCart, cartCount } from "@/store/cart";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/science", label: "Science" },
  { href: "/testing", label: "Testing" },
  { href: "/faq", label: "FAQ" },
];

const mobileLinks = [...links, { href: "/contact", label: "Contact" }];

export function Navbar() {
  const lines = useCart((s) => s.lines);
  const openCart = useCart((s) => s.open);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu on navigation
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const count = mounted ? cartCount(lines) : 0;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-40"
      >
        <div
          className={cn(
            "mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-6xl items-center justify-between rounded-2xl border px-5 backdrop-blur-xl transition-all duration-300",
            scrolled
              ? "border-white/15 bg-zinc-950/80 py-2.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]"
              : "border-white/10 bg-zinc-950/60 py-3"
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-bold tracking-[0.2em] text-white"
          >
            <Zap className="h-5 w-5 text-violet-400" aria-hidden />
            SYNAPTIQ
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    active ? "text-white" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-violet-400 shadow-[0_0_8px_1px_rgba(167,139,250,0.8)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={openCart}
              aria-label="Open cart"
              className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-zinc-200 transition-all hover:border-violet-400/50 hover:text-white hover:shadow-[0_0_20px_-4px_rgba(167,139,250,0.6)]"
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-violet-500 text-[10px] font-bold text-white shadow-[0_0_12px_rgba(139,92,246,0.9)]"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-zinc-200 transition-colors hover:text-white md:hidden"
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ===== Mobile menu overlay ===== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-6xl items-center justify-between px-5 py-3">
              <span className="flex items-center gap-2 font-display text-lg font-bold tracking-[0.2em] text-white">
                <Zap className="h-5 w-5 text-violet-400" aria-hidden />
                SYNAPTIQ
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-zinc-200"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {mobileLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-baseline gap-4 py-2 font-display text-4xl font-bold tracking-tight transition-colors",
                      pathname === link.href
                        ? "text-violet-300"
                        : "text-white hover:text-violet-300"
                    )}
                  >
                    <span className="font-mono text-xs text-zinc-600">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-8 pb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-600"
            >
              Cognition, engineered ✦ est. 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
