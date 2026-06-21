import { crearEventoModel } from "../models/EventoModelAdmin.js"

export const crearEvento = async (req, res) => {
  const {
    nombre_evento, categoria, nombre_reservante, es_publico,
    imagen_url, descuento, tope_reserva, id_recinto,
    fecha_inicio, fecha_fin, hora_inicio, hora_fin
  } = req.body

  if (!nombre_evento || !categoria || !nombre_reservante || !id_recinto ||
      !fecha_inicio || !fecha_fin || !hora_inicio || !hora_fin) {
    return res.status(400).json({ error: "Faltan campos obligatorios" })
  }

  const id_organizador = req.usuario.id_usuario

  const { data, error } = await crearEventoModel({
    id_organizador, nombre_evento, categoria, nombre_reservante,
    es_publico: es_publico ?? true, imagen_url, descuento: descuento ?? 0,
    tope_reserva: tope_reserva ?? 0, id_recinto,
    fecha_inicio, fecha_fin, hora_inicio, hora_fin
  })

  if (error) return res.status(500).json({ error: error.message })

  return res.status(201).json({ id_evento: data })
}