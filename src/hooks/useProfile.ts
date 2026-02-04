"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase/client"
import { useUser } from "./useUser"

type Profile = {
  role: "admin" | "parent"
}

export function useProfile() {
  const { user } = useUser()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setProfile(null)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("Erro ao buscar profile:", error)
      }

      setProfile(data)
      setLoading(false)
    }

    loadProfile()
  }, [user])

  return {
    profile,
    loading,
    isAdmin: profile?.role === "admin",
  }
}
