import { Router } from "express"
import { crearCliente } from "../controllers/usuarioController.js"

const router = Router()

router.post("/registro", crearCliente)

export default router