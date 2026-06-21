import { supabase } from "../config/supabase.js"

export const loginAdminModel = async ({ username, password }) => {
  const { data, error } = await supabase.rpc("login_admin", {
    p_username: username,
    p_password: password
  })

  if (error) throw error

  if (!data || data.length === 0) {
    throw new Error("Usuario no encontrado o sin permisos.")
  }

  return data[0]
}