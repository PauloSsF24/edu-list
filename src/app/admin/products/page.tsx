"use client"

import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { getProducts, deleteProduct } from "@/lib/products/products"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  async function loadProducts() {
    setLoading(true)
    const data = await getProducts()
    setProducts(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Deseja remover este produto?")) return

    await deleteProduct(id)
    loadProducts()
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Produtos 📦</h1>

      {loading && <p>Carregando...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="p-4 space-y-2">
            <h2 className="font-semibold">{product.name}</h2>

            <p className="text-sm text-gray-500">
              R$ {product.price}
            </p>

            <p className="text-sm">
              Estoque: {product.stock}
            </p>

            <Button
              variant="destructive"
              onClick={() => handleDelete(product.id)}
            >
              Remover
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
