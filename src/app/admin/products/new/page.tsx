"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { createProduct } from "@/lib/products/products"
import { uploadProductImage } from "@/lib/products/uploadProductImage"

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

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)

    let imageUrl = ""

    // 1. Upload da imagem se existir
    if (imageFile) {
      imageUrl = await uploadProductImage(imageFile)
    }

    // 2. Criar produto no banco
    await createProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      image_url: imageUrl,
    })

    setLoading(false)

    router.push("/admin/products")
  }

  return (
    <div className="flex justify-center p-10">
      <Card className="w-full max-w-lg p-6 space-y-5">
        <h1 className="text-2xl font-bold">
          Novo Produto ➕📦
        </h1>

        {/* Nome */}
        <div className="space-y-2">
          <Label>Nome</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Descrição */}
        <div className="space-y-2">
          <Label>Descrição</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Preço */}
        <div className="space-y-2">
          <Label>Preço</Label>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        {/* Estoque */}
        <div className="space-y-2">
          <Label>Estoque</Label>
          <Input value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>

        {/* Upload */}
        <div className="space-y-2">
          <Label>Imagem do Produto 🖼️</Label>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files?.[0]) return

              const file = e.target.files[0]
              setImageFile(file)

              setPreview(URL.createObjectURL(file))
            }}
          />

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-xl border"
            />
          )}
        </div>

        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Produto"}
        </Button>
      </Card>
    </div>
  )
}
