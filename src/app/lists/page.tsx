"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { getSchools } from "@/lib/schools/schools"
import { School } from "@/types/school"

export default function ListsPage() {
  const [schools, setSchools] = useState<School[]>([])

  useEffect(() => {
    async function load() {
      const data = await getSchools()
      setSchools(data)
    }

    load()
  }, [])

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Escolha a escola 📍
      </h1>

      <p className="text-gray-600">
        Selecione a escola do seu filho para ver a lista escolar pronta.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {schools.map((school) => (
          <Link
            key={school.id}
            href={`/lists/school/${school.id}`}
            className="p-5 border rounded-xl hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">
              {school.name}
            </h2>

            <p className="text-sm text-gray-500">
              Clique para ver as séries disponíveis →
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
