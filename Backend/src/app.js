import "dotenv/config"

const express=require("express")

const app=express()

dotenv.config();

const PORT=3000

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`)
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})