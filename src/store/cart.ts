import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products } from "@/data/products";

export type CartLine = { id: string; qty: number };

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      add: (id, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.id === id);
          return {
            isOpen: true,
            lines: existing
              ? s.lines.map((l) =>
                  l.id === id ? { ...l, qty: l.qty + qty } : l
                )
              : [...s.lines, { id, qty }],
          };
        }),
      remove: (id) =>
        set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.id !== id)
              : s.lines.map((l) => (l.id === id ? { ...l, qty } : l)),
        })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "synaptiq-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lines: s.lines }),
    }
  )
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => {
    const product = products.find((p) => p.id === l.id);
    return sum + (product ? product.price * l.qty : 0);
  }, 0);
}
