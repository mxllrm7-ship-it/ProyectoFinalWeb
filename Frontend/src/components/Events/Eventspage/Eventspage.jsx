import { useMemo } from "react";
import {
  Music,
  Theater,
  Trophy,
  Star,
  Building2,
  Ticket,
} from "lucide-react";
import EventCard from "../EventCard/EventCard";
import eventsData from "../data/Eventsdata.json";
import "./EventsPage.css";
import "../../../styles/styles.css";

const categoryMeta = {
  concerts: {
    label: "Conciertos & Festivales",
    icon: Music,
    description: "Los mejores artistas y bandas en vivo cerca de ti.",
  },
  theater: {
    label: "Teatro & Cultura",
    icon: Theater,
    description: "Experiencias culturales únicas: teatro, cine en vivo y más.",
  },
  sports: {
    label: "Deportes",
    icon: Trophy,
    description: "Vive la emoción del deporte en vivo desde las gradas.",
  },
  specials: {
    label: "Especiales",
    icon: Star,
    description: "Eventos únicos e irrepetibles que no te puedes perder.",
  },
  cities: {
    label: "Ciudades",
    icon: Building2,
    description: "Descubre los mejores eventos en cada ciudad.",
  },
};

export default function EventsPage({ category }) {
  const filtered = useMemo(() => {
    if (!category || category === "all") return eventsData;
    return eventsData.filter((e) => e.category === category);
  }, [category]);

  const meta = categoryMeta[category] || {
    label: "Todos los Eventos",
    icon: Ticket,
    description: "Explora todos los eventos disponibles.",
  };

  const Icon = meta.icon;

  return (
    <div className="events-page">
      <div className="events-hero">
        <div className="events-hero-content">
          <Icon className="events-hero-icon" size={48} />
          <h1 className="events-hero-title">{meta.label}</h1>
          <p className="events-hero-desc">{meta.description}</p>
        </div>
        <div className="events-hero-bg" />
      </div>

      <div className="events-results-bar">
        <span className="events-results-count">
          {filtered.length} evento{filtered.length !== 1 ? "s" : ""} encontrado
          {filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filtered.length > 0 ? (
        <div className="events-grid">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="events-empty">
          <Ticket className="events-empty-icon" size={48} />
          <p>No hay eventos disponibles en esta categoría por ahora.</p>
        </div>
      )}
    </div>
  );
}