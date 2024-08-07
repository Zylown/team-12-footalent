import { format, parse } from "date-fns";

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
  rescheduled: {
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

export default function formatEvents(events) {
  return events.map((event) => {
    const colors = eventColors[event.state] || {};
    const parsedDate = parse(event.date, "dd-MM-yyyy", new Date());
    const formattedDate = format(parsedDate, "yyyy-MM-dd");
    return {
      id: event.id,
      title: `${event.patient_name}`,
      start: `${formattedDate}T${event.time}`,
      end: `${formattedDate}T${event.ending_time}`,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      statusColor: colors.statusColor,
      extendedProps: {
        dentist: event.dentist_name,
        state: event.state,
        observations: event.observations,
        date: event.date,
        time: event.time,
        endTime: event.ending_time,
        patientId: event.patient_id,
        dentistId: event.dentist_id,
        reasonId: event.reason_id,
      },
    };
  });
}
