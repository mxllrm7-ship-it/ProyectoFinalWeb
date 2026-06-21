import { supabase } from "../config/supabase.js"

export const crearEventoModel = async ({
  id_organizador, nombre_evento, categoria, nombre_reservante,
  es_publico, imagen_url, descuento, tope_reserva, id_recinto,
  fecha_inicio, fecha_fin, hora_inicio, hora_fin
}) => {
  const { data, error } = await supabase.rpc("crear_evento", {
    p_id_organizador: id_organizador,
    p_nombre_evento: nombre_evento,
    p_categoria: categoria,
    p_nombre_reservante: nombre_reservante,
    p_es_publico: es_publico,
    p_imagen_url: imagen_url,
    p_descuento: descuento,
    p_tope_reserva: tope_reserva,
    p_id_recinto: id_recinto,
    p_fecha_inicio: fecha_inicio,
    p_fecha_fin: fecha_fin,
    p_hora_inicio: hora_inicio,
    p_hora_fin: hora_fin
  })

  return { data, error }
}