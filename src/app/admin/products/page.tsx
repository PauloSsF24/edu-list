"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Product } from "@/types/product"
import { getProducts, deleteProduct } from "@/lib/products/products"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // 🔄 Carregar produtos
  async function loadProducts() {
    setLoading(true)

    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error("Erro ao carregar produtos:", error)
    }

    setLoading(false)
  }

  // 🗑️ Remover produto
  async function handleDelete(id: string) {
    const confirmDelete = confirm("Deseja remover este produto?")
    if (!confirmDelete) return

    try {
      await deleteProduct(id)
      loadProducts()
    } catch (error) {
      console.error("Erro ao deletar produto:", error)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="p-10 space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produtos 📦</h1>
          <p className="text-gray-500">
            Gerencie os produtos disponíveis na papelaria
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button>Novo Produto ➕</Button>
        </Link>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-500">Carregando produtos...</p>}

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <p className="text-gray-500">
          Nenhum produto cadastrado ainda.
        </p>
      )}

      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="p-4 rounded-2xl shadow-sm hover:shadow-md transition space-y-3"
          >
            {/* IMAGEM */}
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl border"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-xl text-gray-400">
                Sem imagem
              </div>
            )}

            {/* INFO */}
            <div className="space-y-1">
              <h2 className="font-semibold text-lg">{product.name}</h2>

              <p className="text-sm text-gray-500">
                {product.description || "Sem descrição"}
              </p>

              <p className="text-sm font-medium">
                💰 R$ {product.price}
              </p>

              <p className="text-sm text-gray-600">
                📦 Estoque: {product.stock}
              </p>
            </div>

            {/* AÇÕES */}
            <div className="flex justify-between gap-2 pt-2">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => handleDelete(product.id)}
              >
                Remover
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
