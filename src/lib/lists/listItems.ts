import { supabase } from "@/lib/supabase/client"

/* =======================
   ADICIONAR ITEM NA LISTA
======================= */
export async function addItemToList(
  listId: string,
  productId: string,
  quantity: number
) {
  const { error } = await supabase.from("list_items").insert([
    {
      list_id: listId,
      product_id: productId,
      quantity,
    },
  ])

  if (error) throw new Error(error.message)
}

/* =======================
   LISTAR ITENS DA LISTA
======================= */
export async function getItemsFromList(listId: string) {
  const { data, error } = await supabase
    .from("list_items")
    .select(
      `
      id,
      quantity,
      products (
        id,
        name,
        price,
        image_url
      )
    `
    )
    .eq("list_id", listId)

  if (error) throw new Error(error.message)

  return data
}
