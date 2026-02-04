import { supabase } from "@/lib/supabase/client"
import { SchoolList } from "@/types/schoolList"

/* =======================
   LISTAR LISTAS POR GRADE
======================= */
export async function getListsByGrade(
  gradeId: string
): Promise<SchoolList[]> {
  const { data, error } = await supabase
    .from("school_lists")
    .select("*")
    .eq("grade_id", gradeId)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)

  return data as SchoolList[]
}

/* =======================
   CRIAR LISTA
======================= */
export async function createSchoolList(
  gradeId: string,
  title: string
) {
  const { error } = await supabase.from("school_lists").insert([
    {
      grade_id: gradeId,
      title,
    },
  ])

  if (error) throw new Error(error.message)
}
