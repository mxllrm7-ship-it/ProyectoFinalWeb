import { supabase } from "../config/supabase.js"
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

export const crearClienteModel = async ({ nombre_usuario, correo, telefono, username, password, foto_rostro }) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS)

  const { data, error } = await supabase.rpc("crear_cliente", {
    p_nombre_usuario: nombre_usuario,
    p_correo: correo,
    p_telefono: telefono,
    p_username: username,
    p_password: hash,
    p_foto_rostro: foto_rostro ?? null
  })

  if (error) throw error
  return data[0]
}

export const editarPerfilModel = async ({ id_usuario, nombre_usuario, correo, telefono, username, foto_rostro }) => {
  const { data, error } = await supabase.rpc("editar_perfil", {
    p_id_usuario: id_usuario,
    p_nombre_usuario: nombre_usuario,
    p_correo: correo,
    p_telefono: telefono,
    p_username: username,
    p_foto_rostro: foto_rostro ?? null
  })

  if (error) throw error
  return data[0]
}