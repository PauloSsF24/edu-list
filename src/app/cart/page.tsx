"use client"

import { useCart } from "@/context/cartContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function CartPage() {
  const { cart, removeItem, clearCart, increaseQty, decreaseQty } = useCart()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Carrinho 🛒</h1>

      {cart.length === 0 && (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      )}

      <div className="space-y-4">
        {cart.map((item) => (
          <Card
            key={item.id}
            className="p-4 flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image_url}
                className="w-16 h-16 rounded-lg object-cover"
                alt={item.name}
              />

              <div>
                <p className="font-semibold">{item.name}</p>
                <div>
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-100"
                    >
                      ➖
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-100"
                    >
                      ➕
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-right">
              <p className="font-bold">
                R$ {item.price * item.quantity}
              </p>

              <Button
                variant="destructive"
                onClick={() => removeItem(item.id)}
              >
                Remover
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {cart.length > 0 && (
        <Card className="p-5 space-y-4">
          <p className="text-xl font-bold">
            Total: R$ {total.toFixed(2)}
          </p>

          <Button className="w-full py-6 text-lg">
            Ir para Checkout ✅
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={clearCart}
          >
            Limpar Carrinho
          </Button>
        </Card>
      )}
    </div>
  )
}
