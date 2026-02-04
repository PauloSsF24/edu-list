import { supabase } from "@/lib/supabase/client"
import { Grade } from "@/types/grade"

/* =======================
   LISTAR GRADES POR ESCOLA
======================= */
export async function getGradesBySchool(
  schoolId: string
): Promise<Grade[]> {
  const { data, error } = await supabase
    .from("grades")
    .select("*")
    .eq("school_id", schoolId)
    .order("name")

  if (error) throw new Error(error.message)

  return data as Grade[]
}

/* =======================
   CRIAR GRADE
======================= */
export async function createGrade(
  schoolId: string,
  name: string
) {
  const { error } = await supabase.from("grades").insert([
    {
      school_id: schoolId,
      name,
    },
  ])

  if (error) throw new Error(error.message)
}
