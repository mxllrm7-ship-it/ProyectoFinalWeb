import { Router } from "express"
import { loginAdmin } from "../controllers/authAdminController.js"

const router = Router()

router.post("/login", loginAdmin)

export default router