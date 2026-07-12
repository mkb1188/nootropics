import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// A line item is snapshotted at purchase time so an order's history stays
// accurate even if a product's price, name, or accent later changes.
export type OrderItem = {
  id: string;
  name: string;
  code: string;
  accent: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  createdAt: number;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  email: string;
  name: string;
  city: string;
};

type OrdersState = {
  orders: Order[];
  addOrder: (order: Order) => void;
  clear: () => void;
};

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      clear: () => set({ orders: [] }),
    }),
    {
      name: "synaptiq-orders",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function makeOrderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SYN-${id}`;
}
