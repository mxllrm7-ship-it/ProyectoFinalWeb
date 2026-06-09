import { crearClienteModel } from "../models/usuarioModel.js"

export const crearCliente = async (req, res) => {
  const { nombre_usuario, email_usuario, telefono, username, password, foto_rostro } = req.body

  if (!nombre_usuario || !email_usuario || !telefono || !username || !password) {
    return res.status(400).json({ ok: false, mensaje: "Faltan campos obligatorios." })
  }

  try {
    const nuevoUsuario = await crearClienteModel({ nombre_usuario, email_usuario, telefono, username, password, foto_rostro })
    return res.status(201).json({ ok: true, usuario: nuevoUsuario })
  } catch (error) {
    if (error.message?.includes("ya está en uso") || error.message?.includes("ya está registrado")) {
      return res.status(409).json({ ok: false, mensaje: error.message })
    }
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor.", detalle: error.message })
  }
}