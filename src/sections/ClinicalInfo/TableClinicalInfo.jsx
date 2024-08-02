import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import EditClinical from "./Modal/EditClinical";
import {
  apiClinicalInfo, // GET
  apiEditClinicalInfo, // PATCH
} from "../../api/clinicalInfo/apiClinicalInfo";
import { apiGetUserById } from "../../api/users/apiUsers";
import { useDecode } from "../../hooks/useDecode";

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
  const [clinics, setClinics] = useState([]); // Inicializar con dataExample por ahora
  // Estado para mostrar el modal de edición
  const [modalEditVisible, setModalEditVisible] = useState(false);
  // Estado para guardar el valor del input
  const [valueData, setValueData] = useState({
    id: 1, // Usa un valor por defecto si es necesario
    data: "",
    description: "",
  });
  // Estado para mostrar el loading
  const [isLoading, setIsLoading] = useState(true);
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
  }, []);

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
    setModalEditVisible(true);
    // Guarda el objeto completo para mostrarlo en el modal
    setValueData({
      id: row.original.id,
      data: row.original.data,
      description: row.original.description,
    });
  };

  const handleSubmitEdit = async (data) => {
    try {
      // Obtiene el id del usuario logueado
      const userId = await apiGetUserById(decoded.user_id);
      // Obtiene el id de la clínica del usuario logueado
      const clinicId = userId.data.clinic_id;
      // Actualiza la información de la clínica
      const updatedData = clinics.map((clinic) => {
        // clinic.data es de la data que viene de la API y data.data es de la data que viene del formulario
        if (clinic.id === clinicId) {
          // ...clinic es para mantener los datos que no se están editando y solo cambiar la descripción
          return { ...clinic, description: data.description };
        }
        // retorna el objeto sin cambios si no es el que se está editando
        return clinic;
      });
      // Actualiza el estado con la nueva información de la clínica editada
      setClinics(updatedData);
      // Aquí se debe hacer la petición PUT a la API
      try {
        // el {[data.data]: data.description} es para que el objeto tenga la forma {key: value}
        // por ejemplo {nombre: "DentPlanner"}
        const response = await apiEditClinicalInfo(clinicId, {
          [data.data]: data.description,
        });
        if (response.status === 200) {
          console.log("Información editada con éxito");
        }
      } catch (error) {
        console.error("Error al editar la información:", error);
      }
    } catch (error) {
      console.error("Error al editar la información:", error);
    } finally {
      setModalEditVisible(false);
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
      {
        <EditClinical
          isVisible={modalEditVisible}
          setIsVisible={setModalEditVisible}
          valueData={valueData}
          onSubmit={handleSubmitEdit}
        />
      }
    </>
  );
}
