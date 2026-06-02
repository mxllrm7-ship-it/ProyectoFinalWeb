import './CardEventList.css'

export default function CardEventList({titulo, imagen, artista}) {
  return (
    <div className="card-evento">
      <div className="card-evento-imagen">
        <img src={imagen} alt={titulo} />
      </div>
      <div className="card-evento-contenido">
        <h3 className="card-evento-titulo">{titulo}</h3>
        <p className="card-evento-artista">{artista}</p>
      </div>
    </div>
  )
}
