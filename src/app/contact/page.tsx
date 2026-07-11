import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open a channel to the Synaptiq team — support, orders, science questions, or press.",
};

export default function ContactPage() {
  return <ContactContent />;
}
