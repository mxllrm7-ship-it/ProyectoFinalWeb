import { Router } from "express"
import { crearEvento } from "../controllers/eventocontrollerAdmin.js"
import { verificarToken } from "../config/jwt.js"

const router = Router()

const authAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Token requerido" })
  try {
    const payload = verificarToken(token)
    if (payload.id_rol !== 1) return res.status(403).json({ error: "Acceso denegado" })
    req.usuario = payload
    next()
  } catch {
    return res.status(401).json({ error: "Token inválido" })
  }
}

router.post("/evento", authAdmin, crearEvento)

export default router