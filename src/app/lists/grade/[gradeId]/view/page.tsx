"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { getListsByGrade } from "@/lib/lists/lists"
import { getItemsFromList } from "@/lib/lists/listItems"

import { useCart } from "@/context/cartContext"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ParentListView() {
  const params = useParams()
  const router = useRouter()
  const gradeId = params.gradeId as string

  const { addAllFromList } = useCart()

  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const lists = await getListsByGrade(gradeId)

      if (lists.length === 0) return

      const firstList = lists[0]

      const listItems = await getItemsFromList(firstList.id)

      setItems(listItems || [])
    }

    load()
  }, [gradeId])

  function handleAddAllToCart() {
    const formatted = items.map((item) => ({
      id: item.products.id,
      name: item.products.name,
      price: item.products.price,
      image_url: item.products.image_url,
      quantity: item.quantity,
    }))

    addAllFromList(formatted)

    router.push("/cart")
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Lista Escolar Pronta 📝
      </h1>

      {items.length === 0 && (
        <p className="text-gray-500">
          Nenhum item cadastrado ainda.
        </p>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.products.image_url}
                alt={item.products.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div>
                <p className="font-semibold">
                  {item.products.name}
                </p>

                <p className="text-sm text-gray-500">
                  Quantidade: {item.quantity}
                </p>
              </div>
            </div>

            <p className="font-bold">
              R$ {item.products.price}
            </p>
          </Card>
        ))}
      </div>

      {items.length > 0 && (
        <Button
          onClick={handleAddAllToCart}
          className="w-full text-lg py-6"
        >
          Adicionar tudo ao carrinho 🛒
        </Button>
      )}
    </div>
  )
}
