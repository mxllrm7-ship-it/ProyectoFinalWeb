import './EventList.css'
import CardEventList from "./CardEventList"

export default function EventList({titulo, eventos}) {
  return (
    <section className="event-list-section">
      <h2 className="event-list-titulo">{titulo}</h2>
      <div className="event-list-carrusel">
        <div className="carrusel-container">
          {eventos.map((evento) => (
            <div key={evento.id} className="carrusel-item">
              <CardEventList 
                titulo={evento.titulo}
                imagen={evento.imagen}
                artista={evento.artista}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
