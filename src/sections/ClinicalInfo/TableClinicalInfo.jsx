import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import EditClinical from "./Modal/EditClinical";
import {
  apiClinicalInfo, // GET
  apiEditClinicalInfo, // PATCH
} from "../../api/clinicalInfo/apiClinicalInfo";
import { apiGetUserById } from "../../api/users/apiUsers";
import { useDecode } from "../../hooks/useDecode";
import { clinicalStore } from "../../context/clinicalStore";
import { toast, Toaster } from "react-hot-toast";

// esto transforma el objeto en un array de objetos con la forma {field: key, value: clinic[key]}
const transformData = (clinic) => {
  return Object.keys(clinic).map((key) => ({
    data: key,
    description: clinic[key],
  }));
};
// console.log(transformData(dataExample[id]));

export default function TableClinicalInfo() {
  // Variable para guardar el token decodificado
  const decoded = useDecode(localStorage.getItem("token"));
  const {
    clinics,
    isLoading,
    modalEditVisible,
    valueData,
    setClinics,
    setIsLoading,
    openModal,
    closeModal,
    updateClinic,
  } = clinicalStore();

  // columnHelper es un objeto con funciones para crear columnas de la tabla
  const columnHelper = createColumnHelper();

  useEffect(() => {
    // Función para obtener la información de la clínica
    const fetchData = async () => {
      try {
        const res = await apiClinicalInfo();
        // para validar que la respuesta sea correcta
        if (res && res.data) {
          // Filtrar para no incluir la fila con data 'id'
          const transformedData = transformData(res.data[0]).filter(
            (item) => item.data !== "id" // Se puede cambiar por el campo que no se quiere mostrar
          );
          setClinics(transformedData); // Actualiza el estado con la información de la clínica
        }
      } catch (error) {
        console.error("Error de la API:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setClinics, setIsLoading]);

  // Mapeo de nombres de columnas a nombres legibles
  const columnNames = {
    name: "Nombre",
    phone_number: "Teléfono",
    address: "Dirección",
    email: "Correo Electrónico",
    opening_hours: "Hora de Apertura",
    closing_hours: "Hora de Cierre",
  };

  const columns = [
    columnHelper.accessor("data", {
      header: () => "DATO",
      cell: (info) => columnNames[info.getValue()] || info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: () => "DESCRIPCIÓN",
      cell: (
        info // Aquí se puede cambiar el estilo del texto
      ) => (
        <div className="flex items-center justify-center gap-2 relative w-full">
          <span>{info.getValue()}</span>
          <FiEdit className="text-blue-500 cursor-pointer absolute right-0" />
        </div>
      ),
    }),
  ];

  const handleEditRow = (row) => {
    // Abre el modal para editar la información de la clínica
    openModal({
      id: row.original.id,
      data: row.original.data,
      description: row.original.description,
    });
  };

  const handleSubmitEdit = async (data) => {
    try {
      // Obtener el id de la clínica
      const userId = await apiGetUserById(decoded.user_id);
      // aca guaradmos en clinicId el id de la clinica del usuario
      const clinicId = userId.data.clinic_id;
      // Enviar la información actualizada a la API
      const response = await apiEditClinicalInfo(clinicId, {
        [data.data]: data.description,
      });
      // Validar que la respuesta sea correcta
      if (response.status === 200) {
        // Actualizar la información de la clínica en el estado global
        updateClinic({
          id: clinicId,
          data: data.data,
          description: data.description,
        });
        toast.success(
          "La información de la clínica ha sido actualizada con éxito"
        );
      }
    } catch (error) {
      console.error("Error al editar la información:", error);
      toast.error("Error al actualizar la información");
    } finally {
      closeModal();
    }
  };

  const table = useReactTable({
    data: clinics,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
                onClick={() => handleEditRow(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.column.id}
                    className={`flex items-center justify-center px-2.5 py-3 border border-[#99C3FB] text-[#192739] bg-white text-center rounded sm:text-lg text-base font-normal break-words whitespace-normal ${
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
      )}
      <Toaster position="top-right" />
      {
        <EditClinical
          isVisible={modalEditVisible}
          setIsVisible={closeModal}
          valueData={valueData}
          onSubmit={handleSubmitEdit}
        />
      }
    </>
  );
}
