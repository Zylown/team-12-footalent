import { format, parse } from "date-fns";

const eventColors = {
  pending: {
    backgroundColor: "#ffcc0036",
    borderColor: "#3D005A",
    statusColor: "#FFCC00",
  },
  cancelled: {
    backgroundColor: "#FFD8D6",
    borderColor: "#3D005A",
    statusColor: "#FF3B30",
  },
  confirmed: {
    backgroundColor: "#D4F1FF",
    borderColor: "#3D005A",
    statusColor: "#006AF5",
  },
  rescheduled: {
    backgroundColor: "#ad00ff30",
    borderColor: "#3D005A",
    statusColor: "#AD00FF",
  },
  null: {
    backgroundColor: "#ffcc0036",
    borderColor: "#3D005A",
    statusColor: "#FFCC00",
  },
  1: {
    backgroundColor: "#CEFDDA",
    borderColor: "#3D005A",
    statusColor: "#24B849",
  },
  0: {
    backgroundColor: "#ff9d0054",
    borderColor: "#3D005A",
    statusColor: "#FF9500",
  },
};

export default function formatEvents(events) {
  return events.map((event) => {
    let colors = {};
    if (event.assistance !== null) {
      colors = eventColors[event.assistance] || {};
    } else if (event.state) {
      colors = eventColors[event.state] || {};
    }
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
        state: event.state || "pending",
        observations: event.observations,
        date: event.date,
        time: event.time,
        endTime: event.ending_time,
        patientId: event.patient_id,
        dentistId: event.dentist_id,
        reasonId: event.reason_id,
        assistance: event.assistance,
      },
    };
  });
}
