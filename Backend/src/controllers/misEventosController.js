import { misEventosModel } from "../models/misEventosModel.js"

export const misEventos = async (req, res) => {
  const id_usuario = req.usuario.id_usuario

  try {
    const eventos = await misEventosModel(id_usuario)
    return res.status(200).json({ ok: true, eventos })
  } catch (error) {
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor.", detalle: error.message })
  }
}