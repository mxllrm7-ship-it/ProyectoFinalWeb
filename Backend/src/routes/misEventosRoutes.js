import { Router } from "express"
import { misEventos } from "../controllers/misEventosController.js"
import { proteger } from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/", proteger, misEventos)

export default router