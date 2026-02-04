"use client"

import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"

import { supabase } from "@/lib/supabase/client"

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
      setLoading(false)
    }

    loadUser()
  }, [])

  return {
    user,
    loading,
  }
}
