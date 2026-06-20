import "./Events.css";
import EventList from "./EventList";
import EspecificEvents from "./EspecificEvents";
import { obtenerEventos } from "../../../services/EventoService";
import { obtenerEventosPorCategoria } from "../../../services/CatalogoService";
import { useEffect, useState } from "react";

export default function Events() {
  const [eventos, setEventos] = useState([]);
  const [eventosPersonal, setEventosPersonal] = useState([]);
  const [eventosConcierto, setEventosConcierto] = useState([]);
  const [eventosCultura, setEventosCultura] = useState([]);
  const [eventosNegocios, setEventosNegocios] = useState([]);
  const [eventosTecnologia, setEventosTecnologia] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerEventos();
        setEventos(data);
      } catch (error) {
        console.error(error);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerEventosPorCategoria("Personal");
        setEventosPersonal(data);
      } catch (error) {
        console.error(error);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerEventosPorCategoria("Concierto General");
        setEventosConcierto(data);
      } catch (error) {
        console.error(error);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerEventosPorCategoria("Cultura");
        setEventosCultura(data);
      } catch (error) {
        console.error(error);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerEventosPorCategoria("Negocios");
        setEventosNegocios(data);
      } catch (error) {
        console.error(error);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerEventosPorCategoria("Tecnologia");
        setEventosTecnologia(data);
      } catch (error) {
        console.error(error);
      }
    };
    cargar();
  }, []);

  return (
    <main className="events-main">
      <div className="events-container">
        <EventList titulo="Eventos Disponibles" eventos={eventos} />
        <EspecificEvents
          titulo="Eventos de Tecnologia"
          eventos={eventosTecnologia}
          tipoEvento="Tecnologia"
        />
        <EspecificEvents
          titulo="Eventos Personales"
          eventos={eventosPersonal}
          tipoEvento="Personal"
        />
        <EspecificEvents
          titulo="Conciertos"
          eventos={eventosConcierto}
          tipoEvento="Concierto General"
        />
        <EspecificEvents
          titulo="Eventos de Cultura"
          eventos={eventosCultura}
          tipoEvento="Cultura"
        />
        <EspecificEvents
          titulo="Eventos de Negocios"
          eventos={eventosNegocios}
          tipoEvento="Negocios"
        />
      </div>
    </main>
  );
}
