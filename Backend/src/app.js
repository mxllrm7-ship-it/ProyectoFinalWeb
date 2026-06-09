import "dotenv/config";
import express from "express";
import cors from "cors";

import usuarioRouter from "./routes/usuarioRouter.js";
import authRouter from "./routes/authRouter.js";

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
app.get("/", (req, res) => {
  res.json({
    mensaje: "Servidor funcionando correctamente"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});