import MisEventosModel from "../models/misEventosModel";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const obtenerMisEventos = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/mis-eventos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error al obtener mis eventos");
  }

  return (result.tickets || []).map((item) => new MisEventosModel(item));
};