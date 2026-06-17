import { contratarRecintoModel } from "../models/contratarRecintoModel.js"

export const contratarRecinto = async (req, res) => {
  const { id_recinto, nombre_reservante, fecha_inicio, fecha_fin, hora_inicio, hora_fin } = req.body

  if (!id_recinto || !nombre_reservante || !fecha_inicio || !fecha_fin || !hora_inicio || !hora_fin) {
    return res.status(400).json({ ok: false, mensaje: "Todos los campos son obligatorios." })
  }

  try {
    const resultado = await contratarRecintoModel({ id_recinto, nombre_reservante, fecha_inicio, fecha_fin, hora_inicio, hora_fin })
    return res.status(201).json({ ok: true, reserva: resultado })
  } catch (error) {
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor.", detalle: error.message })
  }
}