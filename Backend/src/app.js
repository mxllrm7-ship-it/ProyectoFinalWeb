import "dotenv/config";
import express from "express";
import cors from "cors";

import usuarioRouter from "./routes/usuarioRouter.js";
import authRouter from "./routes/authRouter.js";
import eventoRoutes from "./routes/eventoRouter.js"
import pagoRoutes from "./routes/pagoRoutes.js"
import ciudadRouter from "./routes/CiudadRouter.js"
import ticketUsuarioRoutes from "./routes/ticketUsuarioRoutes.js"
import catalogoRoutes from "./routes/catalogoRoutes.js"
import servicioRoutes from "./routes/servicioRoutes.js"
import recintoRoutes from "./routes/recintoRoutes.js"
import searchRoutes from "./routes/searchRoutes.js"
import contratarServicioRoutes from "./routes/contratarServicioRoutes.js"
import contratarRecintoRoutes from "./routes/contratarRecintoRoutes.js"

const app = express();

const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());
app.use("/api/usuarios", usuarioRouter);
app.use("/api/auth", authRouter);
app.use("/api/eventos", eventoRoutes)
app.use("/api/ciudad", ciudadRouter)
app.use("/api/pagos", pagoRoutes)
app.use("/api/mis-eventos", ticketUsuarioRoutes)
app.use("/api/catalogo", catalogoRoutes)
app.use("/api/servicios", servicioRoutes)
app.use("/api/recintos", recintoRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/contratar-servicio", contratarServicioRoutes)

app.use("/api/contratar-recinto", contratarRecintoRoutes)
app.get("/", (req, res) => {
  res.json({
    mensaje: "Servidor funcionando correctamente"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});