import { supabase } from "../config/supabase.js"

export const contratarRecintoModel = async ({ id_recinto, nombre_reservante, fecha_inicio, fecha_fin, hora_inicio, hora_fin }) => {
  const { data, error } = await supabase.rpc("contratar_recinto", {
    p_id_recinto: id_recinto,
    p_nombre_reservante: nombre_reservante,
    p_fecha_inicio: fecha_inicio,
    p_fecha_fin: fecha_fin,
    p_hora_inicio: hora_inicio,
    p_hora_fin: hora_fin
  })
  if (error) throw error
  return data
}