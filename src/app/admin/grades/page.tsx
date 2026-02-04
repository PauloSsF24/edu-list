"use client"

import { useEffect, useState } from "react"

import { School } from "@/types/school"
import { Grade } from "@/types/grade"

import { getSchools } from "@/lib/schools/schools"
import { getGradesBySchool, createGrade } from "@/lib/grades/grades"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AdminGradesPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [selectedSchool, setSelectedSchool] = useState<string>("")

  const [grades, setGrades] = useState<Grade[]>([])
  const [gradeName, setGradeName] = useState("")

  /* =======================
     LOAD SCHOOLS
  ======================= */
  async function loadSchools() {
    const data = await getSchools()
    setSchools(data)

    if (data.length > 0) {
      setSelectedSchool(data[0].id)
    }
  }

  /* =======================
     LOAD GRADES
  ======================= */
  async function loadGrades(schoolId: string) {
    const data = await getGradesBySchool(schoolId)
    setGrades(data)
  }

  /* =======================
     CREATE GRADE
  ======================= */
  async function handleCreateGrade() {
    if (!selectedSchool) return

    await createGrade(selectedSchool, gradeName)

    setGradeName("")
    loadGrades(selectedSchool)
  }

  /* =======================
     EFFECTS
  ======================= */
  useEffect(() => {
    loadSchools()
  }, [])

  useEffect(() => {
    if (selectedSchool) {
      loadGrades(selectedSchool)
    }
  }, [selectedSchool])

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Séries / Anos 📚</h1>

      {/* SELECIONAR ESCOLA */}
      <Card className="p-4 space-y-3">
        <p className="font-semibold">Selecione uma escola:</p>

        <select
          className="w-full border rounded-lg p-2"
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
        >
          {schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>
      </Card>

      {/* FORM CRIAR GRADE */}
      <Card className="p-4 flex gap-3">
        <Input
          placeholder="Ex: 1º Ano, 5º Ano..."
          value={gradeName}
          onChange={(e) => setGradeName(e.target.value)}
        />

        <Button onClick={handleCreateGrade}>Adicionar</Button>
      </Card>

      {/* LISTAGEM */}
      <div className="space-y-3">
        {grades.length === 0 && (
          <p className="text-gray-500">
            Nenhuma série cadastrada ainda.
          </p>
        )}

        {grades.map((grade) => (
          <Card key={grade.id} className="p-4">
            <p className="font-semibold">{grade.name}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
