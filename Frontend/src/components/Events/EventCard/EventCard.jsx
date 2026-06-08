import { useNavigate } from "react-router";
import { CalendarDays, MapPin } from "lucide-react";
import "./EventCard.css";
import "../../../styles/styles.css";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const categoryLabel = {
    concerts: "Conciertos",
    theater: "Teatro & Cultura",
    sports: "Deportes",
    specials: "Especiales",
    cities: "Ciudades",
  };

  return (
    <div className="event-card" onClick={() => navigate(`/event/${event.id}`)}>
      <div className="event-card-image-wrapper">
        <img
          src={event.image}
          alt={event.title}
          className="event-card-image"
        />

        <span className="event-card-category">
          {categoryLabel[event.category] || event.category}
        </span>

        <div className="event-card-price-badge">
          <span>Desde</span>
          <strong>${event.price}</strong>
        </div>
      </div>

      <div className="event-card-body">
        <div className="event-card-date">
          <CalendarDays className="event-card-date-icon" size={16} />
          <span>
            {formatDate(event.date)} · {event.time}
          </span>
        </div>

        <h3 className="event-card-title">{event.title}</h3>

        <div className="event-card-venue">
          <MapPin className="event-card-venue-icon" size={16} />
          <span>
            {event.venue} — {event.city}, {event.state}
          </span>
        </div>

        {event.lineup && event.lineup.length > 1 && (
          <div className="event-card-lineup">
            {event.lineup.slice(0, 3).map((artist, i) => (
              <span key={i} className="event-card-artist-tag">
                {artist}
              </span>
            ))}
            {event.lineup.length > 3 && (
              <span className="event-card-artist-tag more">
                +{event.lineup.length - 3} más
              </span>
            )}
          </div>
        )}

        <button
  className="event-card-btn"
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/eventos/${event.id}`);  
  }}
>
  Ver Boletos
</button>
      </div>
    </div>
  );
}