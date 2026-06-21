import { loginAdminModel } from "../models/authAdminModel.js"
import { generarToken } from "../config/jwt.js"

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ ok: false, mensaje: "Username y password son obligatorios." })
  }

  try {
    const admin = await loginAdminModel({ username, password })

    if (!admin) {
      return res.status(401).json({ ok: false, mensaje: "Credenciales inválidas." })
    }

    const token = generarToken({
      id_usuario: admin.id_usuario,
      id_rol: admin.id_rol,
      username: admin.username
    })

    return res.status(200).json({ ok: true, token, usuario: admin })
  } catch (error) {
    if (error.message?.includes("no encontrado") || error.message?.includes("sin permisos")) {
      return res.status(404).json({ ok: false, mensaje: error.message })
    }
    if (error.message?.includes("Contraseña incorrecta")) {
      return res.status(401).json({ ok: false, mensaje: error.message })
    }
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor.", detalle: error.message })
  }
}