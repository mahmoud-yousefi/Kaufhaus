import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  promoCode: string | null
  promoDiscount: number
  addItem: (productId: string, qty?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, qty: number) => void
  clear: () => void
  applyPromo: (code: string) => boolean
  removePromo: () => void
}

const PROMOS: Record<string, number> = {
  'KAUFHAUS10': 0.10,
  'WILLKOMMEN': 0.15,
  'SPAREN5': 5,
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,
      addItem: (productId, qty = 1) => {
        const items = [...get().items]
        const existing = items.find(i => i.productId === productId)
        if (existing) existing.quantity += qty
        else items.push({ productId, quantity: qty })
        set({ items })
      },
      removeItem: (productId) => set({ items: get().items.filter(i => i.productId !== productId) }),
      setQuantity: (productId, qty) => {
        if (qty <= 0) { get().removeItem(productId); return }
        set({ items: get().items.map(i => i.productId === productId ? { ...i, quantity: qty } : i) })
      },
      clear: () => set({ items: [], promoCode: null, promoDiscount: 0 }),
      applyPromo: (code) => {
        const upper = code.trim().toUpperCase()
        if (PROMOS[upper] !== undefined) {
          const discount = PROMOS[upper]
          set({ promoCode: upper, promoDiscount: discount })
          return true
        }
        return false
      },
      removePromo: () => set({ promoCode: null, promoDiscount: 0 }),
    }),
    { name: 'kaufhaus-cart' },
  ),
)
