import { Router } from "express"
import { crearCliente, editarPerfil } from "../controllers/usuarioController.js"

const router = Router()

router.post("/registro", crearCliente)
router.put("/:id", editarPerfil)

export default router