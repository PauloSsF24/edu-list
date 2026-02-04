"use client"

import { useEffect, useState } from "react"
import { getSchools, createSchool } from "@/lib/schools/schools"
import { School } from "@/types/school"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AdminSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [name, setName] = useState("")
  const [city, setCity] = useState("")

  async function loadSchools() {
    const data = await getSchools()
    setSchools(data)
  }

  async function handleCreate() {
    await createSchool(name, city)
    setName("")
    setCity("")
    loadSchools()
  }

  useEffect(() => {
    loadSchools()
  }, [])

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Escolas 🏫</h1>

      {/* Form */}
      <Card className="p-4 flex gap-3">
        <Input
          placeholder="Nome da escola"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <Button onClick={handleCreate}>Adicionar</Button>
      </Card>

      {/* Listagem */}
      <div className="space-y-3">
        {schools.map((school) => (
          <Card key={school.id} className="p-4">
            <p className="font-semibold">{school.name}</p>
            <p className="text-sm text-gray-500">{school.city}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
