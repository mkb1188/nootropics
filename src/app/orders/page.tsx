import type { Metadata } from "next";
import { OrdersContent } from "./OrdersContent";

export const metadata: Metadata = {
  title: "Orders",
  description: "Your SYNAPTIQ order history.",
};

export default function OrdersPage() {
  return <OrdersContent />;
}
