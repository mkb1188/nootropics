import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { Noise } from "@/components/fx/Noise";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SYNAPTIQ — Precision Nootropic Stacks",
    template: "%s — SYNAPTIQ",
  },
  description:
    "Clinically-dosed nootropic stacks for focus, memory, clean energy, and calm. Engineered for people who think for a living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <Noise />
      </body>
    </html>
  );
}
