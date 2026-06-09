import { supabase } from "../config/supabase.js"

export const crearClienteModel = async ({ nombre_usuario, email_usuario, telefono, username, password, foto_rostro }) => {
  const { data, error } = await supabase.rpc("crear_cliente", {
    p_nombre_usuario: nombre_usuario,
    p_email_usuario: email_usuario,
    p_telefono: telefono,
    p_username: username,
    p_password: password,
    p_foto_rostro: foto_rostro ?? null
  })

  if (error) throw error
  return data[0]
}