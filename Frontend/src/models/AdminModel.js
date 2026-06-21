export default class AdminModel {
  constructor(data = {}) {
    this.id_usuario = data.id_usuario ?? null;
    this.id_rol = data.id_rol ?? null;
    this.nombre_usuario = data.nombre_usuario ?? "";
    this.username = data.username ?? "";
    this.correo = data.correo ?? "";
    this.foto_perfil = data.foto_perfil ?? null;
  }
}