import { supabase } from "../config/supabase.js"

export const misEventosModel = async (id_usuario) => {
  const { data, error } = await supabase.rpc("obtener_servicios_usuario", {
    p_id_usuario: id_usuario
  })
  if (error) throw error
  return data
}