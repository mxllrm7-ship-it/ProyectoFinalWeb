class MisEventosModel {
  constructor(data = {}) {
    this.pago = data.pago || {};
    this.fecha = data.fecha || {};
    this.orden = data.orden || {};
    this.boleto = data.boleto || {};
    this.ciudad = data.ciudad || {};
    this.evento = data.evento || {};
    this.recinto = data.recinto || {};
    this.tipo_boleto = data.tipo_boleto || {};
  }
}

export default MisEventosModel;