"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase/client"

import { useUser } from "@/hooks/useUser"
import { useProfile } from "@/hooks/useProfile"

import { Button } from "@/components/ui/button"

export function Navbar() {
  const router = useRouter()

  const { user, loading } = useUser()
  const { isAdmin, loading: profileLoading } = useProfile()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-indigo-600">
          EduList 📚
        </Link>

        {/* Links */}
        <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
          <Link href="/lists" className="hover:text-indigo-600 transition">
            Listas
          </Link>

          <Link href="/cart" className="hover:text-indigo-600 transition">
            Carrinho 🛒
          </Link>

          {/* 🔐 Só Admin vê */}
          {!profileLoading && isAdmin && (
            <Link href="/admin" className="hover:text-indigo-600 transition">
              Admin ⚙️
            </Link>
          )}
        </nav>

        {/* Auth */}
        <div className="flex gap-3 items-center">
          {/* Usuário NÃO logado */}
          {!loading && !user && (
            <Link href="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
          )}

          {/* Usuário logado */}
          {!loading && user && (
            <>
              <p className="hidden sm:block text-sm text-gray-500">
                {user.email}
              </p>

              <Button onClick={handleLogout} variant="destructive">
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
