"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { getGradesBySchool } from "@/lib/grades/grades"
import { Grade } from "@/types/grade"

export default function GradesPage() {
  const params = useParams()
  const schoolId = params.schoolId as string

  const [grades, setGrades] = useState<Grade[]>([])

  useEffect(() => {
    async function load() {
      const data = await getGradesBySchool(schoolId)
      setGrades(data)
    }

    load()
  }, [schoolId])

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Escolha a série 📚
      </h1>

      <p className="text-gray-600">
        Agora selecione o ano/série do aluno.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {grades.map((grade) => (
          <Link
            key={grade.id}
            href={`/lists/grade/${grade.id}`}
            className="p-5 border rounded-xl hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">
              {grade.name}
            </h2>

            <p className="text-sm text-gray-500">
              Ver lista escolar →
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
