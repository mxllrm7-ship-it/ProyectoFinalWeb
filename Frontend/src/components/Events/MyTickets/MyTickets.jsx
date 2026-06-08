import { useState } from "react";
import { useNavigate } from "react-router";
import "./MyTickets.css";
import "../../../styles/styles.css";

const MOCK_TICKETS = [
  {
    code: "NODUS-ABCD-EFGH-1234",
    eventTitle: "Southern Hospitality Tour: The Black Crowes and Whiskey Myers",
    date: "2026-06-07",
    time: "6:30 PM",
    venue: "Coastal Credit Union Music Park at Walnut Creek",
    city: "Raleigh",
    state: "NC",
    section: "Floor GA",
    quantity: 2,
    total: 145,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80",
    category: "concerts",
    status: "valid",
    purchasedAt: "2026-05-20T14:30:00",
  },
  {
    code: "NODUS-WXYZ-MNOP-5678",
    eventTitle: "Punk Rock Brunch | 90's & Y2K Anthems",
    date: "2026-06-07",
    time: "10:00 AM",
    venue: "The Composers Room",
    city: "Las Vegas",
    state: "NV",
    section: "VIP Table (4 persons)",
    quantity: 4,
    total: 134,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    category: "concerts",
    status: "valid",
    purchasedAt: "2026-05-18T10:00:00",
  },
  {
    code: "NODUS-PAST-EVNT-0001",
    eventTitle: "Indigo Girls",
    date: "2025-11-15",
    time: "7:00 PM",
    venue: "F.M. Kirby Center",
    city: "Wilkes-Barre",
    state: "PA",
    section: "Orchestra",
    quantity: 1,
    total: 84,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80",
    category: "concerts",
    status: "used",
    purchasedAt: "2025-10-30T09:15:00",
  },
];

function getStoredTickets() {
  try {
    const raw = localStorage.getItem("nodus_tickets");
    return raw ? JSON.parse(raw) : MOCK_TICKETS;
  } catch {
    return MOCK_TICKETS;
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatPurchaseDate(isoStr) {
  const date = new Date(isoStr);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isUpcoming(dateStr) {
  return new Date(dateStr + "T23:59:59") >= new Date();
}

const categoryLabel = {
  concerts: "🎸 Conciertos",
  theater: "🎭 Teatro",
  sports: "🏆 Deportes",
  specials: "⭐ Especiales",
  cities: "🏙️ Ciudades",
};

function TicketCard({ ticket, onExpand, expanded }) {
  const upcoming = isUpcoming(ticket.date);

  return (
    <div className={`mt-ticket ${ticket.status === "used" ? "used" : ""} ${expanded ? "expanded" : ""}`}>
      {/* Top strip */}
      <div className="mt-ticket-top">
        <div className="mt-ticket-img" style={{ backgroundImage: `url(${ticket.image})` }}>
          <div className="mt-ticket-img-overlay" />
          <span className={`mt-ticket-status-badge ${ticket.status}`}>
            {ticket.status === "valid" && upcoming ? "✓ Válido" : "Utilizado"}
          </span>
        </div>

        <div className="mt-ticket-main">
          <div className="mt-ticket-meta-row">
            <span className="mt-ticket-category">{categoryLabel[ticket.category]}</span>
            <span className="mt-ticket-purchase-date">
              Comprado el {formatPurchaseDate(ticket.purchasedAt)}
            </span>
          </div>

          <h3 className="mt-ticket-title">{ticket.eventTitle}</h3>

          <div className="mt-ticket-info-grid">
            <div className="mt-ticket-info-item">
              <span className="mt-ticket-info-label">📅 Fecha</span>
              <span className="mt-ticket-info-value">
                {formatDate(ticket.date)} · {ticket.time}
              </span>
            </div>
            <div className="mt-ticket-info-item">
              <span className="mt-ticket-info-label">📍 Venue</span>
              <span className="mt-ticket-info-value">
                {ticket.venue} — {ticket.city}, {ticket.state}
              </span>
            </div>
            <div className="mt-ticket-info-item">
              <span className="mt-ticket-info-label">🪑 Sección</span>
              <span className="mt-ticket-info-value">{ticket.section}</span>
            </div>
            <div className="mt-ticket-info-item">
              <span className="mt-ticket-info-label">🎟️ Boletos</span>
              <span className="mt-ticket-info-value">{ticket.quantity}</span>
            </div>
          </div>

          <button className="mt-ticket-toggle" onClick={() => onExpand(ticket.code)}>
            {expanded ? "Ocultar código ▲" : "Ver código ▼"}
          </button>
        </div>
      </div>

      {/* Expandable code */}
      {expanded && (
        <div className="mt-ticket-code-area">
          <div className="mt-ticket-perforations">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="mt-perf-dot" />
            ))}
          </div>
          <div className="mt-ticket-code-body">
            <p className="mt-code-label">CÓDIGO DE CONFIRMACIÓN</p>
            <p className="mt-code-value">{ticket.code}</p>
            <p className="mt-code-total">
              Total pagado: <strong>${ticket.total.toLocaleString("es-ES")}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyTickets() {
  const navigate = useNavigate();
  const tickets = getStoredTickets();
  const [filter, setFilter] = useState("all");
  const [expandedCode, setExpandedCode] = useState(null);

  const filtered = tickets.filter((t) => {
    if (filter === "upcoming") return isUpcoming(t.date) && t.status === "valid";
    if (filter === "used") return !isUpcoming(t.date) || t.status === "used";
    return true;
  });

  const handleExpand = (code) => {
    setExpandedCode((prev) => (prev === code ? null : code));
  };

  return (
    <div className="mt-page">
      {/* Header */}
      <div className="mt-header">
        <div className="mt-header-content">
          <div className="mt-header-text">
            <span className="mt-header-icon">🎟️</span>
            <div>
              <h1 className="mt-title">Mis Tickets</h1>
              <p className="mt-subtitle">
                {tickets.length} boleto{tickets.length !== 1 ? "s" : ""} en tu cuenta
              </p>
            </div>
          </div>
          <button className="mt-explore-btn" onClick={() => navigate("/eventos")}>
            Explorar Eventos →
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-filters-bar">
        <div className="mt-filters">
          {[
            { key: "all", label: "Todos" },
            { key: "upcoming", label: "Próximos" },
            { key: "used", label: "Pasados" },
          ].map((f) => (
            <button
              key={f.key}
              className={`mt-filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="mt-filter-count">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Content */}
      <div className="mt-content">
        {filtered.length === 0 ? (
          <div className="mt-empty">
            <span className="mt-empty-icon">🎪</span>
            <h3 className="mt-empty-title">No hay tickets aquí</h3>
            <p className="mt-empty-sub">
              {filter === "upcoming"
                ? "No tienes eventos próximos. ¡Explora y compra tu primer boleto!"
                : "No tienes tickets pasados todavía."}
            </p>
            <button className="mt-explore-btn" onClick={() => navigate("/eventos")}>
              Ver Eventos
            </button>
          </div>
        ) : (
          <div className="mt-list">
            {filtered.map((ticket) => (
              <TicketCard
                key={ticket.code}
                ticket={ticket}
                expanded={expandedCode === ticket.code}
                onExpand={handleExpand}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}