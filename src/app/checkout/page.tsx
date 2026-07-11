import type { Metadata } from "next";
import { CheckoutContent } from "./CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your stack and complete your (demo) order.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
