import { useEffect, useState } from "react";
import { X, Briefcase, Calendar, Package, CheckCircle, AlertCircle } from "lucide-react";
import { obtenerEventos } from "../../../Services/EventoService";
import ContratarServicioModel from "../../../Models/ContratarServicioModel";
import "./ContratarModal.css";

export default function ContratarModal({ servicio, onClose }) {
  const [eventos, setEventos] = useState([]);
  const [idEventoSeleccionado, setIdEventoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [cargandoEventos, setCargandoEventos] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerEventos();
        setEventos(data);
      } catch {
        setError("No se pudieron cargar los eventos.");
      } finally {
        setCargandoEventos(false);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleContratar = async () => {
    if (!idEventoSeleccionado) {
      setError("Selecciona un evento.");
      return;
    }
    if (cantidad < 1) {
      setError("La cantidad debe ser al menos 1.");
      return;
    }

    setError("");
    setEnviando(true);

    try {
      await ContratarServicioModel.contratar(
        Number(idEventoSeleccionado),
        servicio.id,
        cantidad
      );
      setExito(true);
    } catch (err) {
      setError(err.message || "Error al contratar el servicio.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-header-icon">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="modal-title">Contratar servicio</h2>
              <p className="modal-subtitle">{servicio.nombre}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {!exito ? (
          <div className="modal-body">
            <div className="modal-servicio-badge">
              <span className="modal-servicio-categoria">{servicio.categoria}</span>
              <span className="modal-servicio-nombre">{servicio.nombre}</span>
            </div>

            <div className="modal-field">
              <label className="modal-label">
                <Calendar size={14} />
                Evento
              </label>
              {cargandoEventos ? (
                <div className="modal-loading-select">Cargando eventos...</div>
              ) : (
                <select
                  className="modal-select"
                  value={idEventoSeleccionado}
                  onChange={(e) => {
                    setIdEventoSeleccionado(e.target.value);
                    setError("");
                  }}
                >
                  <option value="">Selecciona un evento</option>
                  {eventos.map((evento) => (
                    <option key={evento.idEvento} value={evento.idEvento}>
                      {evento.nombreEvento}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="modal-field">
              <label className="modal-label">
                <Package size={14} />
                Cantidad
              </label>
              <div className="modal-cantidad-wrapper">
                <button
                  type="button"
                  className="modal-cantidad-btn"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                >
                  −
                </button>
                <input
                  type="number"
                  className="modal-cantidad-input"
                  value={cantidad}
                  min={1}
                  onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                />
                <button
                  type="button"
                  className="modal-cantidad-btn"
                  onClick={() => setCantidad((c) => c + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {error && (
              <div className="modal-error">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <div className="modal-footer">
              <button className="modal-btn-cancel" onClick={onClose} disabled={enviando}>
                Cancelar
              </button>
              <button className="modal-btn-confirm" onClick={handleContratar} disabled={enviando || cargandoEventos}>
                {enviando ? "Contratando..." : "Confirmar contratación"}
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-exito">
            <CheckCircle size={52} className="modal-exito-icon" />
            <h3 className="modal-exito-title">¡Servicio contratado!</h3>
            <p className="modal-exito-desc">
              <strong>{servicio.nombre}</strong> fue contratado correctamente para tu evento.
            </p>
            <button className="modal-btn-confirm" onClick={onClose}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}