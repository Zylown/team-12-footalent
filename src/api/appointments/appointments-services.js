import axios from "axios";

const formatEvents = (events) => {
  return events.map((event) => ({
    id: event.id,
    title: `${event.paciente_nombre_completo}`,
    start: `${event.fecha}T${event.desde}`,
    end: `${event.fecha}T${event.hasta}`,
    color: `${event.color}`,
    extendedProps: {
      terapeuta: event.terapeuta_nombre_completo,
      estado: event.estado,
      especialidad: event.especialidad_descripcion,
    },
  }));
};

export const getAppointments = async () => {
  try {
    const response = await axios.get("/data/event.json");
    if (response.data && Array.isArray(response.data)) {
      return formatEvents(response.data);
    } else {
      throw new Error("El formato de los datos no es correcto");
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
