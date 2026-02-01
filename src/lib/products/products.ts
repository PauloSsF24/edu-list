import { supabase } from "@/lib/supabase/client"
import { Product } from "@/types/product"

/* =======================
   LISTAR PRODUTOS
======================= */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)

  return data as Product[]
}

/* =======================
   CRIAR PRODUTO
======================= */
export async function createProduct(product: {
  name: string
  description: string
  price: number
  stock: number
  image_url?: string
}) {
  const { error } = await supabase.from("products").insert([product])

  if (error) throw new Error(error.message)
}

/* =======================
   DELETAR PRODUTO
======================= */
export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) throw new Error(error.message)
}
