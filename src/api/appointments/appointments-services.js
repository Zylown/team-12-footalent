import { BASE_URL } from "../constants/base-url";
import { APPOINTMENTS_PATHS } from "../constants/paths/appointments-paths";
import axios from "axios";

let nowStr = new Date().toISOString().replace(/T.*$/, "");

const eventColors = {
  pending: {
    backgroundColor: "#F5EDD9",
    borderColor: "#834E00",
    statusColor: "#FF9900",
  },
  cancelled: {
    backgroundColor: "#FFCCCB",
    borderColor: "#FF0000",
    statusColor: "#FF0000",
  },
  confirmed: {
    backgroundColor: "#E4ECFF",
    borderColor: "#006AF5",
    statusColor: "#006AF5",
  },
  reprogramar: {
    backgroundColor: "#F9ECFF",
    borderColor: "#3D005A",
    statusColor: "#AD00FF",
  },
  presente: {
    backgroundColor: "#D9F5E0",
    borderColor: "#3ab258",
    statusColor: "#34C759",
  },
};

const formatEvents = (events) => {
  return events.map((event) => {
    const colors = eventColors[event.state] || {};
    return {
      id: event.id,
      title: `${event.patient_name}`,
      start: `${nowStr}T${event.time}`,
      /* end: `${event.fecha}T${event.hasta}`, */
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      statusColor: colors.statusColor,
      extendedProps: {
        dentist: event.dentist_name,
        state: event.state,
        observations: event.observations,
        date: event.date,
        hour: event.time,
        patientId: event.patient_id,
        dentistId: event.dentist_id,
        reasonId: event.reason_id,
      },
    };
  });
};

export const getAppointments = async ({ id }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${APPOINTMENTS_PATHS.GET_BY_DENTIST_ID}/${id}`
    );
    return formatEvents(response.data);
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const updateAppointment = async ({ id, data }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${APPOINTMENTS_PATHS.UPDATE_APPOINTMENT}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error update appointmets:", error);
    throw error;
  }
};

