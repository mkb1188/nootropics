import type { Metadata } from "next";
import { CheckoutContent } from "./CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your stack and place your order.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
