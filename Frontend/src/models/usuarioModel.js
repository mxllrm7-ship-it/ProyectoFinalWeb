export class Usuario {
  constructor({ id_usuario, id_rol, nombre_rol, nombre_usuario, email_usuario, telefono, username, estado_usuario, foto_rostro }) {
    this.id_usuario = id_usuario
    this.id_rol = id_rol
    this.nombre_rol = nombre_rol
    this.nombre_usuario = nombre_usuario
    this.email_usuario = email_usuario
    this.telefono = telefono
    this.username = username
    this.estado_usuario = estado_usuario
    this.foto_rostro = foto_rostro ?? null
  }
}

export class RegistroPayload {
  constructor({ nombre_usuario, email_usuario, telefono, username, password, foto_rostro }) {
    this.nombre_usuario = nombre_usuario
    this.email_usuario = email_usuario
    this.telefono = telefono
    this.username = username
    this.password = password
    this.foto_rostro = foto_rostro ?? null
  }
}

export class LoginPayload {
  constructor({ username, password }) {
    this.username = username
    this.password = password
  }
}

export class EditarPerfilPayload {
  constructor({ id_usuario, nombre_usuario, email_usuario, telefono, username, foto_rostro }) {
    this.id_usuario = id_usuario
    this.nombre_usuario = nombre_usuario
    this.email_usuario = email_usuario
    this.telefono = telefono
    this.username = username
    this.foto_rostro = foto_rostro ?? null
  }
}