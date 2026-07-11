import type { Metadata } from "next";
import { FaqContent } from "./FaqContent";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Choosing a stack, combining formulas, timelines, testing, and safety — answered.",
};

export default function FaqPage() {
  return <FaqContent />;
}
