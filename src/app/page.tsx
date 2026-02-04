"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <section className="grid md:grid-cols-2 gap-12 items-center py-20">
      {/* Texto */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight">
          Compre toda a lista escolar em{" "}
          <span className="text-indigo-600">1 clique</span>
        </h1>

        <p className="text-gray-600 text-lg">
          Escolha a escola, selecione a série e tenha todos os materiais prontos
          no carrinho — rápido, moderno e sem estresse.
        </p>

        <div className="flex gap-4">
          <Link href="/lists">
            <Button className="text-lg px-6 py-5">
              Começar agora 🚀
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="outline" className="text-lg px-6 py-5">
              Ver carrinho 🛒
            </Button>
          </Link>
        </div>
      </div>

      {/* Card */}
      <Card className="p-8 rounded-2xl shadow-md space-y-4">
        <h3 className="text-xl font-semibold">
          ✅ Fluxo completo
        </h3>

        <ul className="text-gray-600 space-y-2">
          <li>📍 Escolha escola</li>
          <li>📚 Selecione série</li>
          <li>📝 Lista pronta</li>
          <li>🛒 Carrinho automático</li>
          <li>💳 Checkout (em breve)</li>
        </ul>
      </Card>
    </section>
  )
}
