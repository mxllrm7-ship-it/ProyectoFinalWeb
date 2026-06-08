import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import eventsData from "../data/Eventsdata.json";
import "./EventDetail.css";
import "../../../styles/styles.css";

function generateTicketCode(eventId, section) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "NODUS-";
  for (let i = 0; i < 12; i++) {
    if (i === 4 || i === 8) code += "-";
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
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

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find((e) => e.id === id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    section: "",
    quantity: 1,
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  const [step, setStep] = useState(1); // 1 = info, 2 = payment, 3 = confirmation
  const [ticketCode, setTicketCode] = useState("");
  const [errors, setErrors] = useState({});
  const confirmRef = useRef(null);

  if (!event) {
    return (
      <div className="ed-not-found">
        <h2>Evento no encontrado</h2>
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
    );
  }

  const selectedSeat = event.seats.find((s) => s.section === form.section);
  const subtotal = selectedSeat ? selectedSeat.price * form.quantity : 0;
  const fee = Math.round(subtotal * 0.12);
  const total = subtotal + fee;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nombre requerido";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Email inválido";
    if (!form.phone.trim()) e.phone = "Teléfono requerido";
    if (!form.section) e.section = "Selecciona una sección";
    return e;
  };

  const validatePayment = () => {
    const e = {};
    if (!form.cardName.trim()) e.cardName = "Nombre requerido";
    if (!form.cardNumber.replace(/\s/g, "").match(/^\d{16}$/))
      e.cardNumber = "Número de tarjeta inválido (16 dígitos)";
    if (!form.cardExpiry.match(/^\d{2}\/\d{2}$/))
      e.cardExpiry = "Formato MM/AA";
    if (!form.cardCvv.match(/^\d{3,4}$/)) e.cardCvv = "CVV inválido";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleCardNumber = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    handleChange("cardNumber", formatted);
  };

  const handleExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    const formatted = digits.length > 2 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
    handleChange("cardExpiry", formatted);
  };

  const goToPayment = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePayment = () => {
    const e = validatePayment();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    const code = generateTicketCode(event.id, form.section);
    setTicketCode(code);
    setStep(3);
    setTimeout(() => {
      confirmRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="ed-page">
      {/* Hero */}
      <div className="ed-hero" style={{ backgroundImage: `url(${event.image})` }}>
        <div className="ed-hero-overlay" />
        <div className="ed-hero-content">
          <button className="ed-back-btn" onClick={() => navigate(-1)}>
            ← Volver
          </button>
          <div className="ed-hero-meta">
            <span className="ed-hero-category">
              {event.category === "concerts" && "🎸 Conciertos"}
              {event.category === "theater" && "🎭 Teatro & Cultura"}
              {event.category === "sports" && "🏆 Deportes"}
              {event.category === "specials" && "⭐ Especiales"}
              {event.category === "cities" && "🏙️ Ciudades"}
            </span>
            <h1 className="ed-hero-title">{event.title}</h1>
            <div className="ed-hero-info">
              <span>📅 {formatDate(event.date)} · {event.time}</span>
              <span>📍 {event.venue} — {event.city}, {event.state}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ed-body">
        {/* Left: info + form */}
        <div className="ed-main">
          {/* Lineup */}
          <div className="ed-section">
            <h2 className="ed-section-title">Descripción</h2>
            <p className="ed-description">{event.description}</p>
          </div>

          {event.lineup && event.lineup.length > 0 && (
            <div className="ed-section">
              <h2 className="ed-section-title">Artistas</h2>
              <div className="ed-lineup">
                {event.lineup.map((a, i) => (
                  <span key={i} className="ed-artist-chip">{a}</span>
                ))}
              </div>
            </div>
          )}

          {/* Step indicator */}
          {step < 3 && (
            <div className="ed-steps">
              <div className={`ed-step ${step >= 1 ? "active" : ""}`}>
                <span>1</span> Datos
              </div>
              <div className="ed-step-divider" />
              <div className={`ed-step ${step >= 2 ? "active" : ""}`}>
                <span>2</span> Pago
              </div>
              <div className="ed-step-divider" />
              <div className={`ed-step ${step >= 3 ? "active" : ""}`}>
                <span>3</span> Confirmación
              </div>
            </div>
          )}

          {/* ── STEP 1: Info ── */}
          {step === 1 && (
            <div className="ed-section ed-form-section">
              <h2 className="ed-section-title">Selecciona tus Boletos</h2>

              <div className="ed-form-group">
                <label>Sección / Asientos *</label>
                <select
                  value={form.section}
                  onChange={(e) => handleChange("section", e.target.value)}
                  className={errors.section ? "error" : ""}
                >
                  <option value="">— Selecciona una sección —</option>
                  {event.seats.map((s, i) => (
                    <option key={i} value={s.section}>
                      {s.section} — ${s.price} / persona
                    </option>
                  ))}
                </select>
                {errors.section && <span className="ed-error">{errors.section}</span>}
              </div>

              <div className="ed-form-group">
                <label>Cantidad de boletos</label>
                <select
                  value={form.quantity}
                  onChange={(e) => handleChange("quantity", Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} boleto{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              <h2 className="ed-section-title" style={{ marginTop: "28px" }}>
                Información Personal
              </h2>

              <div className="ed-form-row">
                <div className="ed-form-group">
                  <label>Nombre completo *</label>
                  <input
                    type="text"
                    placeholder="Juan Pérez"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && <span className="ed-error">{errors.name}</span>}
                </div>
                <div className="ed-form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    placeholder="juan@email.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <span className="ed-error">{errors.email}</span>}
                </div>
              </div>

              <div className="ed-form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  placeholder="+591 70000000"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="ed-error">{errors.phone}</span>}
              </div>

              <button className="ed-primary-btn" onClick={goToPayment}>
                Continuar al Pago →
              </button>
            </div>
          )}

          {/* ── STEP 2: Payment ── */}
          {step === 2 && (
            <div className="ed-section ed-form-section">
              <h2 className="ed-section-title">Datos de Pago</h2>

              <div className="ed-form-group">
                <label>Nombre en la tarjeta *</label>
                <input
                  type="text"
                  placeholder="JUAN PÉREZ"
                  value={form.cardName}
                  onChange={(e) => handleChange("cardName", e.target.value.toUpperCase())}
                  className={errors.cardName ? "error" : ""}
                />
                {errors.cardName && <span className="ed-error">{errors.cardName}</span>}
              </div>

              <div className="ed-form-group">
                <label>Número de tarjeta *</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={(e) => handleCardNumber(e.target.value)}
                  maxLength={19}
                  className={errors.cardNumber ? "error" : ""}
                />
                {errors.cardNumber && <span className="ed-error">{errors.cardNumber}</span>}
              </div>

              <div className="ed-form-row">
                <div className="ed-form-group">
                  <label>Vencimiento *</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={form.cardExpiry}
                    onChange={(e) => handleExpiry(e.target.value)}
                    maxLength={5}
                    className={errors.cardExpiry ? "error" : ""}
                  />
                  {errors.cardExpiry && <span className="ed-error">{errors.cardExpiry}</span>}
                </div>
                <div className="ed-form-group">
                  <label>CVV *</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={form.cardCvv}
                    onChange={(e) =>
                      handleChange("cardCvv", e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    maxLength={4}
                    className={errors.cardCvv ? "error" : ""}
                  />
                  {errors.cardCvv && <span className="ed-error">{errors.cardCvv}</span>}
                </div>
              </div>

              <div className="ed-payment-note">
                🔒 Tus datos están protegidos con encriptación SSL de 256 bits.
              </div>

              <div className="ed-btn-row">
                <button className="ed-secondary-btn" onClick={() => setStep(1)}>
                  ← Atrás
                </button>
                <button className="ed-primary-btn" onClick={handlePayment}>
                  Pagar ${total.toLocaleString("es-ES")} →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Confirmation ── */}
          {step === 3 && (
            <div className="ed-section ed-confirmation" ref={confirmRef}>
              <div className="ed-confirm-icon">🎉</div>
              <h2 className="ed-confirm-title">¡Compra Exitosa!</h2>
              <p className="ed-confirm-sub">
                Tus boletos han sido reservados. Guarda tu código de confirmación.
              </p>

              <div className="ed-ticket">
                <div className="ed-ticket-header">
                  <span>🎟️ NODUS TICKET</span>
                  <span className="ed-ticket-valid">✓ VÁLIDO</span>
                </div>
                <div className="ed-ticket-divider" />
                <div className="ed-ticket-event">{event.title}</div>
                <div className="ed-ticket-details">
                  <div>
                    <strong>Fecha</strong>
                    <span>{formatDate(event.date)} · {event.time}</span>
                  </div>
                  <div>
                    <strong>Venue</strong>
                    <span>{event.venue}</span>
                  </div>
                  <div>
                    <strong>Sección</strong>
                    <span>{form.section}</span>
                  </div>
                  <div>
                    <strong>Boletos</strong>
                    <span>{form.quantity}</span>
                  </div>
                  <div>
                    <strong>Titular</strong>
                    <span>{form.name}</span>
                  </div>
                </div>
                <div className="ed-ticket-divider dotted" />
                <div className="ed-ticket-code-label">CÓDIGO DE CONFIRMACIÓN</div>
                <div className="ed-ticket-code">{ticketCode}</div>
                <div className="ed-ticket-total">
                  Total pagado: <strong>${total.toLocaleString("es-ES")}</strong>
                </div>
              </div>

              <p className="ed-confirm-email">
                Una copia fue enviada a <strong>{form.email}</strong>
              </p>

              <button
                className="ed-primary-btn"
                style={{ marginTop: "24px" }}
                onClick={() => navigate("/")}
              >
                Volver al inicio
              </button>
            </div>
          )}
        </div>

        {/* Right: order summary (hidden on step 3) */}
        {step < 3 && (
          <aside className="ed-sidebar">
            <div className="ed-summary-card">
              <h3 className="ed-summary-title">Resumen de Orden</h3>
              <div className="ed-summary-event">
                <img src={event.image} alt={event.title} />
                <div>
                  <strong>{event.title}</strong>
                  <span>{formatDate(event.date)}</span>
                  <span>{event.venue}</span>
                </div>
              </div>
              <div className="ed-summary-lines">
                <div className="ed-summary-line">
                  <span>
                    {form.section || "Sin sección"} × {form.quantity}
                  </span>
                  <span>${subtotal.toLocaleString("es-ES")}</span>
                </div>
                <div className="ed-summary-line fee">
                  <span>Cargo por servicio (12%)</span>
                  <span>${fee.toLocaleString("es-ES")}</span>
                </div>
                <div className="ed-summary-divider" />
                <div className="ed-summary-line total">
                  <span>Total</span>
                  <strong>${total.toLocaleString("es-ES")}</strong>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}