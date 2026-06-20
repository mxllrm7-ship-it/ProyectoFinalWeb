import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Ticket,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import { obtenerMisTickets } from "../../../Services/MisTicketsService";
import "./MyTickets.css";
import "../../../styles/styles.css";
import { obtenerMisEventos } from "../../../Services/misEventosService";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatPurchaseDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isUpcoming(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr + "T23:59:59") >= new Date();
}

function TicketCard({ ticket, expanded, onExpand }) {
  const upcoming = isUpcoming(ticket.fecha.fechaInicio);

  return (
    <div
      className={`mt-ticket ${ticket.boleto.estadoValidacion !== "VIGENTE" ? "used" : ""} ${expanded ? "expanded" : ""}`}
    >
      <div className="mt-ticket-top">
        <div
          className="mt-ticket-img"
          style={ticket.evento.imagenUrl ? { backgroundImage: `url(${ticket.evento.imagenUrl})` } : {}}
        >
          <div className="mt-ticket-img-overlay" />
          <span
            className={`mt-ticket-status-badge ${ticket.boleto.estadoValidacion === "VIGENTE" ? "valid" : "used"}`}
          >
            {ticket.boleto.estadoValidacion === "VIGENTE" && upcoming ? (
              <>
                <CheckCircle size={14} />
                Válido
              </>
            ) : (
              <>
                <Clock size={14} />
                Utilizado
              </>
            )}
          </span>
        </div>

        <div className="mt-ticket-main">
          <div className="mt-ticket-meta-row">
            <span className="mt-ticket-category">{ticket.evento.categoria}</span>
            <span className="mt-ticket-purchase-date">
              Comprado el {formatPurchaseDate(ticket.orden.fechaOrden)}
            </span>
          </div>

          <h3 className="mt-ticket-title">{ticket.evento.nombreEvento}</h3>

          <div className="mt-ticket-info-grid">
            <div className="mt-ticket-info-item">
              <span className="mt-ticket-info-label">
                <Calendar size={16} />
                Fecha
              </span>
              <span className="mt-ticket-info-value">
                {formatDate(ticket.fecha.fechaInicio)} · {ticket.fecha.horaInicio}
              </span>
            </div>

            <div className="mt-ticket-info-item">
              <span className="mt-ticket-info-label">
                <MapPin size={16} />
                Recinto
              </span>
              <span className="mt-ticket-info-value">
                {ticket.recinto.nombreRecinto} — {ticket.ciudad.nombreCiudad}
              </span>
            </div>

            <div className="mt-ticket-info-item">
              <span className="mt-ticket-info-label">
                <Ticket size={16} />
                Tipo
              </span>
              <span className="mt-ticket-info-value">{ticket.tipoBoleto.nombreTipo}</span>
            </div>

            <div className="mt-ticket-info-item">
              <span className="mt-ticket-info-label">
                <CreditCard size={16} />
                Precio
              </span>
              <span className="mt-ticket-info-value">Bs {ticket.tipoBoleto.precio}</span>
            </div>
          </div>

          <button
            className="mt-ticket-toggle"
            onClick={() => onExpand(ticket.boleto.codigo)}
          >
            {expanded ? (
              <>
                Ocultar código <ChevronUp size={16} />
              </>
            ) : (
              <>
                Ver código <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-ticket-code-area">
          <div className="mt-ticket-perforations">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="mt-perf-dot" />
            ))}
          </div>
          <div className="mt-ticket-code-body">
            <p className="mt-code-label">CÓDIGO DEL TICKET</p>
            <p className="mt-code-value">{ticket.boleto.codigo}</p>
            <p className="mt-code-total">
              Total pagado: <strong>Bs {ticket.pago.montoPago}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function EventoCard({ evento }) {
  const navigate = useNavigate();
  const upcoming = isUpcoming(evento.fecha?.fechaInicio);

  return (
    <div className="mt-evento-card">
      <div
        className="mt-evento-img"
        style={evento.imagenUrl ? { backgroundImage: `url(${evento.imagenUrl})` } : {}}
      >
        <div className="mt-ticket-img-overlay" />
        <span className={`mt-ticket-status-badge ${upcoming ? "valid" : "used"}`}>
          {upcoming ? (
            <>
              <CheckCircle size={14} />
              Próximo
            </>
          ) : (
            <>
              <Clock size={14} />
              Finalizado
            </>
          )}
        </span>
      </div>

      <div className="mt-evento-body">
        <div className="mt-ticket-meta-row">
          <span className="mt-ticket-category">{evento.categoria}</span>
        </div>

        <h3 className="mt-ticket-title">{evento.nombreEvento}</h3>

        <div className="mt-ticket-info-grid">
          <div className="mt-ticket-info-item">
            <span className="mt-ticket-info-label">
              <Calendar size={16} />
              Fecha
            </span>
            <span className="mt-ticket-info-value">
              {formatDate(evento.fecha?.fechaInicio)} · {evento.fecha?.horaInicio}
            </span>
          </div>

          <div className="mt-ticket-info-item">
            <span className="mt-ticket-info-label">
              <MapPin size={16} />
              Recinto
            </span>
            <span className="mt-ticket-info-value">
              {evento.recinto?.nombreRecinto} — {evento.ciudad?.nombreCiudad}
            </span>
          </div>
        </div>

        <button
          className="mt-explore-btn mt-evento-btn"
          onClick={() => navigate(`/eventos/${evento.idEvento}`)}
        >
          Ver evento <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function MyTickets() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("tickets");

  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [expandedCode, setExpandedCode] = useState(null);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [errorTickets, setErrorTickets] = useState("");

  const [eventos, setEventos] = useState([]);
  const [loadingEventos, setLoadingEventos] = useState(false);
  const [errorEventos, setErrorEventos] = useState("");

  useEffect(() => {
    const cargarTickets = async () => {
      try {
        setLoadingTickets(true);
        const data = await obtenerMisTickets();
        setTickets(Array.isArray(data) ? data : (data.tickets ?? []));
      } catch (err) {
        setErrorTickets(err.message);
      } finally {
        setLoadingTickets(false);
      }
    };
    cargarTickets();
  }, []);

  useEffect(() => {
    if (activeTab !== "eventos") return;
    if (eventos.length > 0) return;
    const cargarEventos = async () => {
      try {
        setLoadingEventos(true);
        const data = await obtenerMisEventos();
        setEventos(Array.isArray(data) ? data : (data.eventos ?? []));
      } catch (err) {
        setErrorEventos(err.message);
      } finally {
        setLoadingEventos(false);
      }
    };
    cargarEventos();
  }, [activeTab]);

  const filtered = tickets.filter((ticket) => {
    if (filter === "upcoming") {
      return (
        isUpcoming(ticket.fecha.fechaInicio) &&
        ticket.boleto.estadoValidacion === "VIGENTE"
      );
    }
    if (filter === "used") {
      return (
        !isUpcoming(ticket.fecha.fechaInicio) ||
        ticket.boleto.estadoValidacion !== "VIGENTE"
      );
    }
    return true;
  });

  const handleExpand = (code) => {
    setExpandedCode((prev) => (prev === code ? null : code));
  };

  return (
    <div className="mt-page">
      <div className="mt-header">
        <div className="mt-header-content">
          <div className="mt-header-text">
            {activeTab === "tickets" ? <Ticket size={36} /> : <Star size={36} />}
            <div>
              <h1 className="mt-title">
                {activeTab === "tickets" ? "Mis Tickets" : "Mis Eventos"}
              </h1>
              <p className="mt-subtitle">
                {activeTab === "tickets"
                  ? `${tickets.length} boleto${tickets.length !== 1 ? "s" : ""} en tu cuenta`
                  : `${eventos.length} evento${eventos.length !== 1 ? "s" : ""} encontrados`}
              </p>
            </div>
          </div>

          <button className="mt-explore-btn" onClick={() => navigate("/eventos")}>
            Explorar Eventos
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-tabs">
          <button
            className={`mt-tab-btn ${activeTab === "tickets" ? "active" : ""}`}
            onClick={() => setActiveTab("tickets")}
          >
            <Ticket size={16} />
            Mis Tickets
            {tickets.length > 0 && (
              <span className="mt-tab-badge">{tickets.length}</span>
            )}
          </button>
          <button
            className={`mt-tab-btn ${activeTab === "eventos" ? "active" : ""}`}
            onClick={() => setActiveTab("eventos")}
          >
            <Star size={16} />
            Mis Eventos
            {eventos.length > 0 && (
              <span className="mt-tab-badge">{eventos.length}</span>
            )}
          </button>
          <div
            className="mt-tab-indicator"
            style={{ transform: activeTab === "tickets" ? "translateX(0%)" : "translateX(100%)" }}
          />
        </div>
      </div>

      {activeTab === "tickets" && (
        <>
          <div className="mt-filters-bar">
            <div className="mt-filters">
              {[
                { key: "all", label: "Todos" },
                { key: "upcoming", label: "Próximos" },
                { key: "used", label: "Pasados" },
              ].map((filtro) => (
                <button
                  key={filtro.key}
                  className={`mt-filter-btn ${filter === filtro.key ? "active" : ""}`}
                  onClick={() => setFilter(filtro.key)}
                >
                  {filtro.label}
                </button>
              ))}
            </div>
            <span className="mt-filter-count">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="mt-content">
            {loadingTickets ? (
              <div className="mt-empty">
                <h3 className="mt-empty-title">Cargando tickets...</h3>
              </div>
            ) : errorTickets ? (
              <div className="mt-empty">
                <h3 className="mt-empty-title">Error al cargar tickets</h3>
                <p className="mt-empty-sub">{errorTickets}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="mt-empty">
                <Ticket size={48} />
                <h3 className="mt-empty-title">No hay tickets aquí</h3>
                <p className="mt-empty-sub">No tienes tickets para mostrar.</p>
                <button className="mt-explore-btn" onClick={() => navigate("/eventos")}>
                  Ver Eventos
                </button>
              </div>
            ) : (
              <div className="mt-list">
                {filtered.map((ticket) => (
                  <TicketCard
                    key={ticket.boleto.idBoleto}
                    ticket={ticket}
                    expanded={expandedCode === ticket.boleto.codigo}
                    onExpand={handleExpand}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "eventos" && (
        <div className="mt-content">
          {loadingEventos ? (
            <div className="mt-empty">
              <h3 className="mt-empty-title">Cargando eventos...</h3>
            </div>
          ) : errorEventos ? (
            <div className="mt-empty">
              <h3 className="mt-empty-title">Error al cargar eventos</h3>
              <p className="mt-empty-sub">{errorEventos}</p>
            </div>
          ) : eventos.length === 0 ? (
            <div className="mt-empty">
              <Star size={48} />
              <h3 className="mt-empty-title">Sin eventos aún</h3>
              <p className="mt-empty-sub">No tienes eventos registrados.</p>
              <button className="mt-explore-btn" onClick={() => navigate("/eventos")}>
                Ver Eventos
              </button>
            </div>
          ) : (
            <div className="mt-list">
              {eventos.map((evento) => (
                <EventoCard key={evento.idEvento} evento={evento} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}