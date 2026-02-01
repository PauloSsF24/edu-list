"use client"

import { useState } from "react"
import { createProduct } from "@/lib/products/products"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function NewProductPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")

  async function handleSubmit() {
    await createProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
    })

    router.push("/admin/products")
  }

  return (
    <div className="flex justify-center p-10">
      <Card className="w-full max-w-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold">
          Novo Produto ➕
        </h1>

        <div className="space-y-2">
          <Label>Nome</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Descrição</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Preço</Label>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Estoque</Label>
          <Input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleSubmit}>
          Salvar Produto
        </Button>
      </Card>
    </div>
  )
}
