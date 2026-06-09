import { Usuario, RegistroPayload, LoginPayload } from "../models/usuarioModel.js"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const registrarUsuario = async ({ nombre_usuario, email_usuario, telefono, username, password, foto_rostro }) => {
  const payload = new RegistroPayload({ nombre_usuario, email_usuario, telefono, username, password, foto_rostro })

  const res = await fetch(`${BASE_URL}/api/usuarios/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.mensaje ?? "Error al registrar usuario.")

  return new Usuario(data.usuario)
}

export const loginUsuario = async ({ username, password }) => {
  const payload = new LoginPayload({ username, password })

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.mensaje ?? "Error al iniciar sesión.")

  return new Usuario(data.usuario)
}