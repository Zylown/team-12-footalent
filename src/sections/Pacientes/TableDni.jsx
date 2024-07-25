import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const dataExample = [
  {
    dni: "23.638.746",
    nombreApellido: "Marcelo Tinelli",
  },
  {
    dni: "23.638.746",
    nombreApellido: "Marcelo Tinelli",
  },
];

export default function TableDni() {
  const [pacientes, setPacientes] = useState([]); // Inicializar con dataExample por ahora
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("dni", {
      header: () => "DNI",
      cell: (info) => info.getValue(), // Obtiene el valor de la celda
    }),
    columnHelper.accessor("nombreApellido", {
      header: () => "NOMBRE Y APELLIDO",
      cell: (info) => info.getValue(),
    }),
  ];

  useEffect(() => {
    setPacientes(dataExample);
  }, []);

  const table = useReactTable({
    data: pacientes,
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
                className={`h-11 flex items-center justify-center px-3.5 border border-[#BBD9FF] rounded text-[#005FDB] text-lg font-semibold
                   ${column.id === "dni" ? "flex-none w-1/5" : "flex-1"}`}
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
                className={`max-h-12 flex items-center justify-center px-2.5 py-3 border border-[#99C3FB] text-[#192739] bg-white text-center rounded text-lg font-normal ${
                  cell.column.id === "dni" ? "flex-none w-1/5" : "flex-1"
                }`}
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
