import PropTypes from "prop-types";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import {
  deletePatientById,
  getAllPatients,
} from "../../api/patients/apiPatients";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ModalDeleted from "../../components/ModalDeleted";
import { toast, Toaster } from "react-hot-toast";

export default function TableDni({ searchDni }) {
  const [pacientes, setPacientes] = useState([]); // Inicializar con dataExample por ahora
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientIdToDelete, setPatientIdToDelete] = useState(null);

  const navigate = useNavigate();
  const columnHelper = createColumnHelper();

  const navigateToHistory = (id) => {
    navigate(`/pacientes/historia-clinica/${id}`);
  };

  const handleDeleteClick = (event, patientId) => {
    event.stopPropagation(); // Evita que se propague el evento al hacer click en la fila
    setPatientIdToDelete(patientId); // Guarda el id del paciente a eliminar
    setIsModalOpen(true); // Abre el modal
  };

  const columns = [
    columnHelper.accessor("dni", {
      header: () => "DNI",
      cell: (info) => info.getValue(), // Obtiene el valor de la celda
    }),
    columnHelper.accessor("patient", {
      header: () => "NOMBRE Y APELLIDO",
      cell: (info) => (
        <div className="flex items-center justify-center gap-2 relative w-full">
          <span>{info.getValue()}</span>
          <HiOutlineTrash
            className="text-[#1C304A] text-opacity-50 text-2xl cursor-pointer absolute right-0"
            onClick={(event) => handleDeleteClick(event, info.row.original.id)}
          />
        </div>
      ),
    }),
  ];

  // GET ALL PATIENTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllPatients();
        //mapear el array de pacientes
        const mappedPatients = res.data.map((patient) => ({
          id: patient.id, // id del paciente
          dni: patient.dni,
          patient: patient.first_name + " " + patient.last_name,
        }));
        setPacientes(mappedPatients); // para setear los pacientes
      } catch (error) {
        console.error("Error de la API:", error);
      }
    };
    fetchData();
  }, []);

  const deletePatient = async (id) => {
    try {
      const res = await deletePatientById(id);
      if (res.status === 200) {
        toast.success("Paciente eliminado correctamente");
        setPacientes(pacientes.filter((patient) => patient.id !== id)); // Actualiza el estado de pacientes
      }
    } catch (error) {
      console.error("Error de la API:", error);
    }
  };

  const filteredPatients = useMemo(() => {
    if (!searchDni) {
      return pacientes;
    }
    return pacientes.filter((patient) =>
      patient.dni.toString().toLowerCase().startsWith(searchDni.toLowerCase())
    );
  }, [searchDni, pacientes]);

  const table = useReactTable({
    data: filteredPatients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className="w-full table-auto">
        <thead className="w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="flex gap-2.5">
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  className={`min-h-11 flex items-center justify-center px-3.5 border border-[#BBD9FF] rounded text-[#005FDB] text-lg font-semibold ${
                    column.id === "dni" ? "w-2/5 sm:w-1/5" : "w-3/5 sm:flex-1"
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
              onClick={() => {
                // setIdPatient(row.original.id);
                navigateToHistory(row.original.id);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.column.id}
                  className={`min-h-11 flex items-center justify-center px-2.5 py-3 border border-[#99C3FB] text-[#192739] bg-white text-center rounded sm:text-lg text-base font-normal ${
                    cell.column.id === "dni"
                      ? "w-2/5 sm:w-1/5"
                      : "w-3/5 sm:flex-1"
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ModalDeleted
          isVisible={isModalOpen}
          setIsVisible={setIsModalOpen}
          //en deledtedModal va la funcion que se ejecuta al dar click en aceptar osea la funcion de eliminar a la api
          DeletedModal={() => deletePatient(patientIdToDelete)}
          titleModal="Eliminar paciente"
          infoModal="¿Estás seguro que deseas eliminar este paciente?"
        />
      )}
      <Toaster position="top-right" />
    </>
  );
}
TableDni.propTypes = {
  searchDni: PropTypes.string,
};
