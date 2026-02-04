import { supabase } from "@/lib/supabase/client"

export async function uploadProductImage(file: File) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  // Upload no bucket products
  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file)

  if (error) {
    throw new Error("Erro no upload: " + error.message)
  }

  // Gerar URL pública
  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName)

  return data.publicUrl
}
