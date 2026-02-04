"use client"

import { useEffect, useState } from "react"

import { School } from "@/types/school"
import { Grade } from "@/types/grade"
import { SchoolList } from "@/types/schoolList"
import { Product } from "@/types/product"

import { getSchools } from "@/lib/schools/schools"
import { getGradesBySchool } from "@/lib/grades/grades"
import { getListsByGrade, createSchoolList } from "@/lib/lists/lists"

import { getProducts } from "@/lib/products/products"
import { addItemToList, getItemsFromList } from "@/lib/lists/listItems"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AdminListsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [lists, setLists] = useState<SchoolList[]>([])

  const [products, setProducts] = useState<Product[]>([])

  const [selectedSchool, setSelectedSchool] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("")
  const [selectedList, setSelectedList] = useState("")

  const [listTitle, setListTitle] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState(1)

  const [items, setItems] = useState<any[]>([])

  /* =======================
     LOAD INITIAL DATA
  ======================= */
  async function loadInitial() {
    const schoolsData = await getSchools()
    const productsData = await getProducts()

    setSchools(schoolsData)
    setProducts(productsData)

    if (schoolsData.length > 0) {
      setSelectedSchool(schoolsData[0].id)
    }
  }

  /* =======================
     LOAD GRADES
  ======================= */
  async function loadGrades(schoolId: string) {
    const data = await getGradesBySchool(schoolId)
    setGrades(data)

    if (data.length > 0) {
      setSelectedGrade(data[0].id)
    }
  }

  /* =======================
     LOAD LISTS
  ======================= */
  async function loadLists(gradeId: string) {
    const data = await getListsByGrade(gradeId)
    setLists(data)

    if (data.length > 0) {
      setSelectedList(data[0].id)
    }
  }

  /* =======================
     LOAD ITEMS
  ======================= */
  async function loadItems(listId: string) {
    const data = await getItemsFromList(listId)
    setItems(data || [])
  }

  /* =======================
     CREATE LIST
  ======================= */
  async function handleCreateList() {
    await createSchoolList(selectedGrade, listTitle)
    setListTitle("")
    loadLists(selectedGrade)
  }

  /* =======================
     ADD ITEM
  ======================= */
  async function handleAddItem() {
    await addItemToList(selectedList, selectedProduct, quantity)
    loadItems(selectedList)
  }

  /* =======================
     EFFECTS
  ======================= */
  useEffect(() => {
    loadInitial()
  }, [])

  useEffect(() => {
    if (selectedSchool) loadGrades(selectedSchool)
  }, [selectedSchool])

  useEffect(() => {
    if (selectedGrade) loadLists(selectedGrade)
  }, [selectedGrade])

  useEffect(() => {
    if (selectedList) loadItems(selectedList)
  }, [selectedList])

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Listas Escolares 📚
      </h1>

      {/* SELECT ESCOLA */}
      <Card className="p-4 space-y-2">
        <p className="font-semibold">Escola</p>
        <select
          className="w-full border rounded-lg p-2"
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
        >
          {schools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </Card>

      {/* SELECT SÉRIE */}
      <Card className="p-4 space-y-2">
        <p className="font-semibold">Série / Ano</p>
        <select
          className="w-full border rounded-lg p-2"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </Card>

      {/* CRIAR LISTA */}
      <Card className="p-4 flex gap-3">
        <Input
          placeholder="Título da lista (ex: Lista 2026)"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
        />
        <Button onClick={handleCreateList}>Criar Lista</Button>
      </Card>

      {/* SELECT LISTA */}
      <Card className="p-4 space-y-2">
        <p className="font-semibold">Lista</p>
        <select
          className="w-full border rounded-lg p-2"
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
        >
          {lists.map((l) => (
            <option key={l.id} value={l.id}>
              {l.title}
            </option>
          ))}
        </select>
      </Card>

      {/* ADICIONAR PRODUTO */}
      <Card className="p-4 space-y-3">
        <p className="font-semibold">Adicionar Produto</p>

        <select
          className="w-full border rounded-lg p-2"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Selecione um produto</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <Button onClick={handleAddItem}>
          Adicionar à Lista
        </Button>
      </Card>

      {/* ITENS DA LISTA */}
      <Card className="p-4 space-y-3">
        <h2 className="text-xl font-bold">Itens da Lista</h2>

        {items.length === 0 && (
          <p className="text-gray-500">
            Nenhum item adicionado ainda.
          </p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2"
          >
            <p>{item.products.name}</p>
            <p>Qtd: {item.quantity}</p>
          </div>
        ))}
      </Card>
    </div>
  )
}
