import { supabase } from "@/lib/supabase/client"
import { School } from "@/types/school"

export async function getSchools(): Promise<School[]> {
  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .order("name")

  if (error) throw new Error(error.message)

  return data as School[]
}

export async function createSchool(name: string, city: string) {
  const { error } = await supabase.from("schools").insert([
    { name, city },
  ])

  if (error) throw new Error(error.message)
}
