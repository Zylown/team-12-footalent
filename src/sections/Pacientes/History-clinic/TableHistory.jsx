import PropTypes from "prop-types";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getAppointmentPatientById } from "../../../api/appointments/appointments-services";
import { getReasonById } from "../../../api/reasons/reasons-services";

// patienId es el id del paciente traido desde HistoryClinic.jsx
export default function TableHistory({ patientId }) {
  // estado para guardar los turnos
  const [turnos, setTurnos] = useState([]);
  //estado de loading
  const [loading, setLoading] = useState(true);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("date", {
      header: () => "FECHA",
      cell: (info) => info.getValue(), // Obtiene el valor de la celda
    }),
    columnHelper.accessor("time", {
      header: () => "HORA",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("reason", {
      header: () => "MOTIVO",
      cell: (info) => info.getValue(),
    }),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Empieza a cargar los datos

        // Obtener las citas del paciente
        const responseAppointment = await getAppointmentPatientById(patientId);

        // Crear una promesa para cada razón
        const reasonPromises = responseAppointment.map((appointment) =>
          getReasonById(appointment.reason_id)
        );

        // Esperar a que todas las promesas se resuelvan
        const reasons = await Promise.all(reasonPromises);

        // Mapear las citas con sus razones correspondientes
        const turnosData = responseAppointment.map((appointment, index) => ({
          id: appointment.id,
          date: appointment.date,
          time: appointment.time,
          reason: reasons[index].data.description,
        }));

        setTurnos(turnosData);
      } catch (error) {
        console.error("Error de la API:", error);
      } finally {
        setLoading(false); // Termina la carga de datos
      }
    };
    fetchData();
  }, [patientId]);

  const table = useReactTable({
    data: turnos,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative">
      {/* Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
      {/* Mensaje si no hay turnos */}
      {!loading && turnos.length === 0 && (
        <div className="flex items-center justify-center py-4 text-lg font-semibold text-gray-600">
          Este paciente aún no ha agenda ninguna cita.
        </div>
      )}
      {/* Tabla en caso de que haya turnos */}
      {!loading && turnos.length > 0 && (
        <table className="w-full table-auto">
          <thead className="w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="flex gap-2.5 px-4 py-3">
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    className={`min-h-11 flex items-center justify-center px-3.5 border border-[#BBD9FF] rounded text-[#005FDB] text-lg font-semibold ${
                      column.id === "reason" ? "flex-1" : "flex-none w-1/5"
                    }
                    ${column.id === "hour" && "w-[77px]"}`}
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, #FAFDFF, #DBE5FF)",
                    }}
                  >
                    <div>
                      {flexRender(
                        column.column.columnDef.header,
                        column.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="flex flex-col gap-2.5">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="flex gap-2.5 cursor-pointer px-4 hover:opacity-70"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.column.id}
                    className={`min-h-11 flex items-center justify-center px-2.5 py-3 border border-[#99C3FB] text-[#192739] bg-white text-center rounded sm:text-lg text-base font-normal ${
                      cell.column.id === "reason" ? "flex-1" : "flex-none w-1/5"
                    }
                    ${cell.column.id === "hour" && "max-w-[77px] w-full"}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

TableHistory.propTypes = {
  patientId: PropTypes.string.isRequired,
};
