import './Events.css'
import EventList from "./EventList"

const conciertos = [
  {
    id: 1,
    titulo: "Benson Boone Tour 2026",
    artista: "Benson Boone",
    imagen: "https://s3.us-east-1.amazonaws.com/prd3318.tmp-digital-assets.prod.us-east-1.tmaws/assets/BensonBoone_1440x450_2026.jpg?width=1440&height=450&fit=bounds&optimize=high&auto=webp"
  },
  {
    id: 2,
    titulo: "Festival de Rock",
    artista: "Múltiples Artistas",
    imagen: "https://s1.ticketm.net/dam/a/00f/b9aebee0-d1cb-4a5c-8e0e-0ca03fd4d00f_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  },
  {
    id: 3,
    titulo: "Gira Acústica",
    artista: "Artista Principal",
    imagen: "https://s1.ticketm.net/dam/a/057/3dc88133-61df-47f6-9665-f3a83a4dd057_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  },
  {
    id: 4,
    titulo: "Noche de Conciertos",
    artista: "Banda Especial",
    imagen: "https://s1.ticketm.net/dam/a/433/021fc7b3-815d-4f88-9fce-83b31a96d433_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  },
  {
    id: 5,
    titulo: "Tour Latinoamérica",
    artista: "Artista Regional",
    imagen: "https://s3.us-east-1.amazonaws.com/prd3318.tmp-digital-assets.prod.us-east-1.tmaws/assets/BensonBoone_1440x450_2026.jpg?width=1440&height=450&fit=bounds&optimize=high&auto=webp"
  }
]

const eventosDeportivos = [
  {
    id: 6,
    titulo: "Campeonato de Fútbol",
    artista: "Liga Nacional",
    imagen: "https://s1.ticketm.net/dam/a/00f/b9aebee0-d1cb-4a5c-8e0e-0ca03fd4d00f_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  },
  {
    id: 7,
    titulo: "Tenis Internacional",
    artista: "Grand Slam",
    imagen: "https://s1.ticketm.net/dam/a/057/3dc88133-61df-47f6-9665-f3a83a4dd057_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  },
  {
    id: 8,
    titulo: "Boxeo de Campeones",
    artista: "Evento Principal",
    imagen: "https://s1.ticketm.net/dam/a/433/021fc7b3-815d-4f88-9fce-83b31a96d433_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  },
  {
    id: 9,
    titulo: "Carrera de Autos",
    artista: "Fórmula Extrema",
    imagen: "https://s3.us-east-1.amazonaws.com/prd3318.tmp-digital-assets.prod.us-east-1.tmaws/assets/BensonBoone_1440x450_2026.jpg?width=1440&height=450&fit=bounds&optimize=high&auto=webp"
  },
  {
    id: 10,
    titulo: "Baloncesto Profesional",
    artista: "Liga Premium",
    imagen: "https://s1.ticketm.net/dam/a/00f/b9aebee0-d1cb-4a5c-8e0e-0ca03fd4d00f_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  }
]

const festivales = [
  {
    id: 11,
    titulo: "Festival de Verano",
    artista: "Múltiples Géneros",
    imagen: "https://s1.ticketm.net/dam/a/057/3dc88133-61df-47f6-9665-f3a83a4dd057_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  },
  {
    id: 12,
    titulo: "Encuentro Musical",
    artista: "Festival Anual",
    imagen: "https://s1.ticketm.net/dam/a/433/021fc7b3-815d-4f88-9fce-83b31a96d433_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  },
  {
    id: 13,
    titulo: "Fiesta de Cultura",
    artista: "Arte en Vivo",
    imagen: "https://s3.us-east-1.amazonaws.com/prd3318.tmp-digital-assets.prod.us-east-1.tmaws/assets/BensonBoone_1440x450_2026.jpg?width=1440&height=450&fit=bounds&optimize=high&auto=webp"
  },
  {
    id: 14,
    titulo: "Celebración Urbana",
    artista: "Entretenimiento Total",
    imagen: "https://s1.ticketm.net/dam/a/00f/b9aebee0-d1cb-4a5c-8e0e-0ca03fd4d00f_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  },
  {
    id: 15,
    titulo: "Noche de Estrellas",
    artista: "Festival Especial",
    imagen: "https://s1.ticketm.net/dam/a/057/3dc88133-61df-47f6-9665-f3a83a4dd057_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp"
  }
]

export default function Events() {
  return (
    <main className="events-main">
      <div className="events-container">
        <EventList titulo="Conciertos Musicales" eventos={conciertos} />
        <EventList titulo="Eventos Deportivos" eventos={eventosDeportivos} />
        <EventList titulo="Festivales" eventos={festivales} />
      </div>
    </main>
  )
}
