import { Usuario, RegistroPayload, LoginPayload, EditarPerfilPayload } from "../models/usuarioModel.js"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const registrarUsuario = async ({ nombre_usuario, correo, telefono, username, password, foto_rostro }) => {
  const payload = new RegistroPayload({ nombre_usuario, correo, telefono, username, password, foto_rostro })
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
  return { usuario: new Usuario(data.usuario), token: data.token }
}

export const editarPerfilUsuario = async ({ id_usuario, nombre_usuario, correo, telefono, username, foto_rostro }, token) => {
  const payload = new EditarPerfilPayload({ id_usuario, nombre_usuario, correo, telefono, username, foto_rostro })
  const res = await fetch(`${BASE_URL}/api/usuarios/${id_usuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.mensaje ?? "Error al actualizar perfil.")
  return new Usuario(data.usuario)
}

export const obtenerEventos = async () => {
  const res = await fetch(`${BASE_URL}/api/eventos`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.mensaje ?? "Error al obtener eventos.")
  return data.eventos
}