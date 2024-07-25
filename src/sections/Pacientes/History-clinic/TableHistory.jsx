import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const dataExample = [
  {
    date: "01/01/2024",
    hour: "10:00",
    reason: "Extracción de molares",
  },
  {
    date: "24/07/2024",
    hour: "12:00",
    reason: "Dolor de diente",
  },
];

export default function TableHistory() {
  const [turnos, setTurnos] = useState([]);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("date", {
      header: () => "FECHA",
      cell: (info) => info.getValue(), // Obtiene el valor de la celda
    }),
    columnHelper.accessor("hour", {
      header: () => "HORA",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("reason", {
      header: () => "MOTIVO",
      cell: (info) => info.getValue(),
    }),
  ];

  useEffect(() => {
    setTurnos(dataExample);
  }, []);

  const table = useReactTable({
    data: turnos,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full table-auto">
      <thead className="w-full">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="flex gap-2.5 px-4 py-3">
            {headerGroup.headers.map((column) => (
              <th
                key={column.id}
                className={`h-[46px] flex items-center justify-center px-3.5 border border-[#193B67] border-opacity-15 rounded text-[#005FDB] text-lg font-semibold ${
                  column.id === "reason" ? "flex-1" : "flex-none w-1/6"
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
                className={`h-12 px-2.5 flex items-center justify-center border border-[#BBD9FF] text-[#192739] bg-white rounded text-lg font-normal ${
                  cell.column.id === "reason" ? "flex-1" : "flex-none w-1/6"
                }
                  ${cell.column.id === "hour" && "w-[77px]"}`}
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
