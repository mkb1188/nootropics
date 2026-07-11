import type { Metadata } from "next";
import { ScienceContent } from "./ScienceContent";

export const metadata: Metadata = {
  title: "The Science",
  description:
    "How Synaptiq formulates: literature-first ingredient selection, clinical-range dosing, and full transparency.",
};

export default function SciencePage() {
  return <ScienceContent />;
}
