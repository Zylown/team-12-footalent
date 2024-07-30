import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const dataExample = [
  {
    id: 1,
    data: "Nombre",
    description: "OdontoClinica",
  },
  {
    id: 2,
    data: "Teléfono",
    description: "123456789",
  },
  {
    id: 3,
    data: "Dirección",
    description: "Calle Falsa 123",
  },
  {
    id: 4,
    data: "Correo electrónico",
    description: "contacto@odontoclinica.com",
  },
  {
    id: 5,
    data: "Horario de apertura",
    description: "08:00",
  },
  {
    id: 6,
    data: "Horario de cierre",
    description: "20:00",
  },
];

export default function TableClinicalInfo() {
  const [clinics, setClinics] = useState([]); // Inicializar con dataExample por ahora
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("data", {
      header: () => "DATO",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: () => "DESCRIPCIÓN",
      cell: (info) => info.getValue(),
    }),
  ];

  useEffect(() => {
    setClinics(dataExample);
  }, []);

  const table = useReactTable({
    data: clinics,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full table-auto">
      <thead className="w-full">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="flex gap-2.5">
            {headerGroup.headers.map((column) => (
              <th
                key={column.id}
                className={`min-h-[46px] flex items-center justify-center px-3.5 border border-[#BBD9FF] rounded text-[#005FDB] text-lg font-semibold ${
                  column.id === "data"
                    ? "w-2/5 sm:w-[186px]"
                    : "w-3/5 sm:flex-1"
                }`}
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #FAFDFF, #DBE5FF)",
                }}
              >
                {flexRender(
                  column.column.columnDef.header,
                  column.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="flex gap-2.5 cursor-pointer hover:opacity-70 mt-2.5"
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.column.id}
                className={`min-h-11 flex items-center justify-center px-2.5 py-3 border border-[#99C3FB] text-[#192739] bg-white text-center rounded sm:text-lg text-base font-normal break-words whitespace-normal ${
                  cell.column.id === "data"
                    ? "w-2/5 sm:w-[186px]"
                    : "w-3/5 sm:flex-1"
                }`}
                style={{ whiteSpace: "normal", wordBreak: "break-word" }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
