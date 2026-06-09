import { supabase } from "../config/supabase.js"

export const loginModel = async ({ username, password }) => {
  const { data, error } = await supabase.rpc("login_cliente", {
    p_username: username,
    p_password: password
  })

  if (error) throw error
  return data[0]
}