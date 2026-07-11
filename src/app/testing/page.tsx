import type { Metadata } from "next";
import { TestingContent } from "./TestingContent";

export const metadata: Metadata = {
  title: "Third-Party Testing",
  description:
    "Every Synaptiq batch is verified by independent ISO-accredited labs. Look up any batch's certificate of analysis.",
};

export default function TestingPage() {
  return <TestingContent />;
}
