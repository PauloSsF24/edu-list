"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { CartItem } from "@/types/cart"

type CartContextType = {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  addAllFromList: (items: CartItem[]) => void
  removeItem: (id: string) => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  /* =======================
     LOAD CART FROM STORAGE
  ======================= */
  useEffect(() => {
    const stored = localStorage.getItem("cart")

    if (stored) {
      setCart(JSON.parse(stored))
    }
  }, [])

  /* =======================
     SAVE CART TO STORAGE
  ======================= */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  /* =======================
     ADD SINGLE ITEM
  ======================= */
  function addItem(item: CartItem) {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id)

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        )
      }

      return [...prev, item]
    })
  }

  /* =======================
     ADD FULL LIST
  ======================= */
  function addAllFromList(items: CartItem[]) {
    items.forEach((item) => addItem(item))
  }

  /* =======================
     REMOVE ITEM
  ======================= */
  function removeItem(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }
  /* =======================
   INCREASE QUANTITY
  ======================= */
  function increaseQty(id: string) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  /* =======================
    DECREASE QUANTITY
  ======================= */
  function decreaseQty(id: string) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  /* =======================
     CLEAR CART
  ======================= */
  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, addItem, addAllFromList, removeItem, clearCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }

  return context
}
