import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CardWhite from "../../../components/CardWhite";
import { FaCaretDown } from "react-icons/fa";
import TableHistory from "./TableHistory";
import { getPatientById } from "../../../api/patients/apiPatients";
export default function HistoryClinic({ patientId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [patientSelected, setPatientSelected] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await getPatientById(patientId);
        setPatientSelected(res.data);
      } catch (error) {
        console.error("Error de la API:", error);
      }
    };
    fetchPatient();
  }, [patientId]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white mt-6 px-2 w-full flex justify-center">
      <CardWhite className="sm:gap-5 gap-2 max-w-[842px] w-full sm:px-6 px-4 py-4">
        <div className="flex justify-between sm:flex-row flex-col">
          <div className="py-2.5">
            <h2 className="font-semibold sm:text-3xl text-xl">
              Historial de visitas
            </h2>
          </div>
          <div className="sm:max-w-[387px] w-full">
            <div className="py-6 px-8 shadow-custom-lg rounded-lg flex flex-col gap-1">
              {patientSelected ? (
                <>
                  <h2 className="font-semibold text-2xl text-[#192739]">
                    {patientSelected.first_name} {patientSelected.last_name}
                  </h2>
                  <p className="text-lg text-[#1C304A] text-opacity-50 font-semibold">
                    <b className="mr-2.5 font-medium text-[#1B2B41] text-opacity-70">
                      Nació el
                    </b>{" "}
                    {patientSelected.birth_date}
                  </p>
                  <p className="text-lg text-[#1C304A] text-opacity-50 font-semibold">
                    <b className="mr-2.5 font-medium text-[#1B2B41] text-opacity-70">
                      DNI
                    </b>{" "}
                    {patientSelected.dni}
                  </p>
                  <p className="text-lg text-[#1C304A] text-opacity-50 font-semibold">
                    <b className="mr-2.5 font-medium text-[#1B2B41] text-opacity-70">
                      Teléfono
                    </b>{" "}
                    {patientSelected.phone_number}
                  </p>
                </>
              ) : (
                <p>Cargando datos del paciente...</p>
              )}
            </div>
          </div>
        </div>
        <div className="rounded-[4px] border">
          <div
            className="w-full py-3 px-4 pb-3 cursor-pointer flex justify-center items-center"
            style={{
              backgroundImage: "linear-gradient(to bottom, #F6FBFF, #C3D4FF)",
            }}
            onClick={toggleDropdown}
          >
            <h1 className="text-[#192739] text-opacity-95 font-semibold text-2xl">
              Turnos
            </h1>
            <FaCaretDown
              className={`ml-1 text-[#1C304A] text-xl transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          {isDropdownOpen && (
            <div className="bg-[#f6fbff] border border-[#DAE0E7] rounded-lg sm:p-4 p-0 overflow-y-auto custom-scrollbar">
              <TableHistory patientId={patientId} />
            </div>
          )}
        </div>
      </CardWhite>
    </div>
  );
}

HistoryClinic.propTypes = {
  patientId: PropTypes.string.isRequired,
};
