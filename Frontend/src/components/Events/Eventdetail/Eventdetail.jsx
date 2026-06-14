import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerDetalleEvento } from "../../../services/EventoService";
import "./Eventdetail.css";

export default function EventPay() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState({});
  const [imagenPrincipal, setImagenPrincipal] = useState(null);

  useEffect(() => {
    const cargarDetalles = async () => {
      try {
        setLoading(true);

       

        const datos = await obtenerDetalleEvento(id);
         console.log("Respuesta completa:", datos);
        console.log("Evento:", datos.evento);
        console.log("Fecha:", datos.fecha);
        console.log("Recinto:", datos.recinto);
        console.log("Ciudad:", datos.ciudad);
        console.log("Organizador:", datos.organizador);
        console.log("Media:", datos.media);
        console.log("Invitados:", datos.invitados);
        console.log("Tipos boleto:", datos.tiposBoleto);
        console.log("Estadísticas:", datos.estadisticas);
        setEvento(datos);
        if (datos.evento.imagenUrl) {
          setImagenPrincipal(datos.evento.imagenUrl);
        } else if (datos.media && datos.media.length > 0) {
          setImagenPrincipal(datos.media[0].url);
        }
      } catch (err) {
        setError(err.message || "Error al cargar el evento");
      } finally {
        setLoading(false);
      }
    };

    cargarDetalles();
  }, [id]);

  const actualizarCarrito = (tipoBoletoId, cantidad) => {
    setCarrito((prev) => {
      const nuevo = { ...prev };
      if (cantidad > 0) {
        nuevo[tipoBoletoId] = cantidad;
      } else {
        delete nuevo[tipoBoletoId];
      }
      return nuevo;
    });
  };

  const calcularTotales = () => {
    if (!evento) return { subtotal: 0, descuento: 0, total: 0 };

    let subtotal = 0;
    Object.entries(carrito).forEach(([tipoBoletoId, cantidad]) => {
      const tipoboleto = evento.tiposBoleto.find(
        (t) => t.id.toString() === tipoBoletoId.toString(),
      );
      if (tipoboleto) {
        subtotal += tipoboleto.precio * cantidad;
      }
    });

    const descuento = (subtotal * evento.evento.descuento) / 100;
    const total = subtotal - descuento;

    return { subtotal, descuento, total };
  };

  const cantidadBoletos = Object.values(carrito).reduce(
    (sum, qty) => sum + qty,
    0,
  );
  const { subtotal, descuento, total } = calcularTotales();

  if (loading) {
    return (
      <div className="ep-container ep-loading">
        <div className="ep-spinner"></div>
        <p>Cargando evento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ep-container ep-error">
        <div className="ep-error-content">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="ep-container ep-error">
        <div className="ep-error-content">
          <h2>Evento no encontrado</h2>
        </div>
      </div>
    );
  }

  const {
    evento: eventoData,
    fecha,
    recinto,
    ciudad,
    organizador,
    media,
    invitados,
    tiposBoleto,
    estadisticas,
  } = evento;

  return (
    <div className="ep-page">
      <div
        className="ep-hero"
        style={{ backgroundImage: `url(${imagenPrincipal})` }}
      >
        <div className="ep-hero-overlay"></div>
        <div className="ep-hero-content">
          <div className="ep-breadcrumb">
            {ciudad && <span>{ciudad.nombreCiudad}</span>}
            <span className="ep-separator">•</span>
            {eventoData.categoria && <span>{eventoData.categoria}</span>}
          </div>
          <h1 className="ep-titulo-principal">{eventoData.nombreEvento}</h1>
        </div>
      </div>

      <div className="ep-content">
        <main className="ep-main">
          <section className="ep-section">
            <h2>Fecha y Horario</h2>
            <div className="ep-grid-2">
              <div className="ep-info-block">
                <span className="ep-label">Inicio</span>
                <div className="ep-value">{fecha.fechaInicio}</div>
                <div className="ep-value-secondary">{fecha.horaInicio}</div>
              </div>
              <div className="ep-info-block">
                <span className="ep-label">Finalización</span>
                <div className="ep-value">{fecha.fechaFin}</div>
                <div className="ep-value-secondary">{fecha.horaFin}</div>
              </div>
            </div>
          </section>

          <section className="ep-section">
            <h2>Ubicación</h2>
            <div className="ep-recinto-info">
              <h3>{recinto.nombreRecinto}</h3>
              <p className="ep-direccion">{recinto.direccionRecinto}</p>
              <div className="ep-grid-2">
                <div className="ep-info-item">
                  <span className="ep-label">Tipo</span>
                  <span className="ep-value">{recinto.tipoRecinto}</span>
                </div>
                <div className="ep-info-item">
                  <span className="ep-label">Capacidad</span>
                  <span className="ep-value">{recinto.capacidad} personas</span>
                </div>
              </div>
              {recinto.descripcionRecinto && (
                <p className="ep-descripcion">{recinto.descripcionRecinto}</p>
              )}
              {recinto.linkUbicacion && (
                <a
                  href={recinto.linkUbicacion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ep-link-ubicacion"
                >
                  Ver en mapa
                </a>
              )}
            </div>
          </section>

          {eventoData.descuento > 0 && (
            <section className="ep-section ep-descuento-banner">
              <span className="ep-badge-descuento">
                ¡Descuento de {eventoData.descuento}%!
              </span>
            </section>
          )}

          <section className="ep-section">
            <h2>Organizador</h2>
            <div className="ep-organizador">
              {organizador.fotoPerfil && (
                <img
                  src={organizador.fotoPerfil}
                  alt={organizador.nombreUsuario}
                  className="ep-foto-perfil"
                />
              )}
              <div>
                <h4>{organizador.nombreUsuario}</h4>
              </div>
            </div>
          </section>

          {media && media.length > 0 && (
            <section className="ep-section">
              <h2>Galería</h2>
              <div className="ep-galeria">
                {media.map((m) => (
                  <div key={m.id} className="ep-galeria-item">
                    <img src={m.url} alt={`Imagen ${m.orden}`} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {invitados && invitados.length > 0 && (
            <section className="ep-section">
              <h2>Invitados</h2>
              <div className="ep-invitados-lista">
                {invitados.map((inv) => (
                  <div key={inv.idInvitado} className="ep-invitado-card">
                    <h4>{inv.nombreInvitado}</h4>
                    <div className="ep-invitado-info">
                      <span className="ep-badge">{inv.tipoInvitado}</span>
                      <span className="ep-estado">{inv.estadoInvitado}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="ep-section">
            <h2>Selecciona tus Boletos</h2>
            <div className="ep-boletos-grid">
              {tiposBoleto &&
                tiposBoleto.map((tipo) => (
                  <div key={tipo.id} className="ep-boleto-card">
                    <div className="ep-boleto-header">
                      <h3>{tipo.nombreTipo}</h3>
                      <div className="ep-precio-grande">${tipo.precio}</div>
                    </div>
                    {tipo.imagenUrl && (
                      <img
                        src={tipo.imagenUrl}
                        alt={tipo.nombreTipo}
                        className="ep-boleto-imagen"
                      />
                    )}
                    {tipo.descripcion && (
                      <p className="ep-boleto-descripcion">
                        {tipo.descripcion}
                      </p>
                    )}
                    <div className="ep-disponibilidad">
                      <span className="ep-disponibles">
                        {tipo.cantidadDisponible} disponibles
                      </span>
                    </div>
                    <div className="ep-selector-cantidad">
                      <button
                        className="ep-btn-cantidad"
                        onClick={() =>
                          actualizarCarrito(
                            tipo.id,
                            (carrito[tipo.id] || 0) - 1,
                          )
                        }
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="0"
                        max={tipo.cantidadDisponible}
                        value={carrito[tipo.id] || 0}
                        onChange={(e) =>
                          actualizarCarrito(
                            tipo.id,
                            Math.max(0, parseInt(e.target.value) || 0),
                          )
                        }
                        className="ep-input-cantidad"
                      />
                      <button
                        className="ep-btn-cantidad"
                        onClick={() =>
                          actualizarCarrito(
                            tipo.id,
                            (carrito[tipo.id] || 0) + 1,
                          )
                        }
                        disabled={
                          tipo.cantidadDisponible <= (carrito[tipo.id] || 0)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </main>

        <aside className="ep-sidebar">
          <div className="ep-carrito-resumen">
            <h3>Resumen de Compra</h3>

            {cantidadBoletos > 0 && (
              <div className="ep-carrito-items">
                {tiposBoleto.map((tipo) => {
                  const cantidad = carrito[tipo.id];
                  if (!cantidad) return null;
                  return (
                    <div key={tipo.id} className="ep-carrito-item">
                      <span className="ep-item-nombre">{tipo.nombreTipo}</span>
                      <span className="ep-item-cantidad">x{cantidad}</span>
                      <span className="ep-item-precio">
                        ${(tipo.precio * cantidad).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div
              className={`ep-carrito-totales ${cantidadBoletos > 0 ? "ep-tiene-items" : ""}`}
            >
              <div className="ep-total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {eventoData.descuento > 0 && (
                <div className="ep-total-row ep-descuento">
                  <span>Descuento ({eventoData.descuento}%)</span>
                  <span>-${descuento.toFixed(2)}</span>
                </div>
              )}

              <div className="ep-total-row ep-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                className="ep-btn-comprar"
                disabled={cantidadBoletos === 0}
              >
                {cantidadBoletos > 0
                  ? `Comprar ${cantidadBoletos} ${cantidadBoletos === 1 ? "boleto" : "boletos"}`
                  : "Selecciona boletos"}
              </button>
            </div>

            {estadisticas && (
              <div className="ep-estadisticas">
                <div className="ep-estadistica-item">
                  <span className="ep-estadistica-label">Disponibles</span>
                  <span className="ep-estadistica-valor">
                    {estadisticas.totalDisponible}
                  </span>
                </div>
                <div className="ep-estadistica-item">
                  <span className="ep-estadistica-label">Rango de Precio</span>
                  <span className="ep-estadistica-valor">
                    ${estadisticas.precioMinimo} - ${estadisticas.precioMaximo}
                  </span>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
