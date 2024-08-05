import CardWhite from "../../components/CardWhite";
import DropTable from "../../components/DropTable";
import ConfigProfile from "./ConfigProfile";
import Reasons from "./Modal/Reasons";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { apiGetClinicalInfoById } from "../../api/clinicalInfo/apiClinicalInfo";
import { useDecode } from "../../hooks/useDecode";
import { apiGetUserById } from "../../api/users/apiUsers";
import { useCallback, useMemo } from "react";

const Adjustments = () => {
  const token = localStorage.getItem("token");
  const decode = useDecode(token);

  const [infoClinic, setInfoClinic] = useState(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleOpenModalAdd = () => {
    setModalIsVisible(true);
  };

  // usamos useCallback para evitar que se recalcule en cada render
  const transformData = useCallback(
    (clinic) => {
      return Object.keys(clinic)
        .filter((key) => key !== "id")
        .map((key) => ({
          nombre: columnNames[key] || key, // Usa el nombre legible si existe, sino usa la clave original
          value: clinic[key],
        }));
    },
    [columnNames]
  );
  // diferencias entre useCallback y useMemo, el useMemo se usa para valores y el useCallback para funciones

  // Mapeo de nombres de columnas a nombres legibles en español y el useMemo para evitar que se recalcule en cada render
  const columnNames = useMemo(
    () => ({
      name: "Nombre",
      phone_number: "Teléfono",
      address: "Dirección",
      email: "Correo Electrónico",
      opening_hours: "Hora de Apertura",
      closing_hours: "Hora de Cierre",
    }),
    []
  );

  useEffect(() => {
    const fetchInfoClinic = async () => {
      try {
        //para obtener el id de la clinica
        const resUser = await apiGetUserById(decode.user_id);
        const res = await apiGetClinicalInfoById(resUser.data.clinic_id);
        if (res && res.data) {
          setInfoClinic(transformData(res.data)); // Actualiza el estado con la información de la clínica
        }
      } catch (error) {
        console.error("Error de la API:", error);
      }
    };
    fetchInfoClinic(decode.user_id);
  }, [decode.user_id, transformData]);

  const section2 = [
    {
      nombre: "Motivos",
      value: "Peronaliza los motivos",
      icon: <FaRegEdit />,
    },
  ];

  return (
    <>
      <div className="bg-white  max-w-[746px] w-full gap-6">
        <CardWhite className="!gap-4 px-6 py-[34px]">
          <h1 className="text-[32px] font-medium text-[#192739]">
            Ajustes generales
          </h1>
          <div className="border rounded-md">
            <DropTable
              nameButton={"Información de la clínica"}
              sections={infoClinic}
            />
          </div>

          <div className="border rounded-md">
            <DropTable
              nameButton={"Consultas"}
              sections={section2}
              setModalIsVisible={handleOpenModalAdd}
            />
          </div>

          <div className="border rounded-md">
            <ConfigProfile nameButton={"Consultas"} sections={section2} />
          </div>
        </CardWhite>
      </div>
      {modalIsVisible && (
        <Reasons
          isVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
        />
      )}
    </>
  );
};

export default Adjustments;
