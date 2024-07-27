import PropTypes from "prop-types";
import CardWhite from "../../../../components/CardWhite";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { IoSearch, IoClose } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";
import TablePatients from "./TablePatientsModal";
import AddPatients from "../../../Pacientes/Modal/AddPatients";

export default function PatientsModal({ onSelectPatient }) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [searchDni, setSearchDni] = useState("");

  const handleInputSearch = (e) => {
    const value = e.target.value;
    setSearchDni(value);
  };

  const handleClearSearch = () => {
    setSearchDni("");
  };

  const handleOpenModalAdd = () => {
    setModalIsVisible(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <CardWhite className="bg-white gap-5 min-w-[690px] px-6 py-4">
          <div className="container__h1 py-[10px]">
            <h1 className="text-[32px] text-[#192739] font-semibold">
              Pacientes
            </h1>
          </div>
          <div className="w-full h-11 flex gap-1.5 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Input
                value={searchDni}
                type="text"
                onChange={handleInputSearch}
                className="w-full box-border h-full bg-white border-[1.5px] border-[#1C304A] border-opacity-50 placeholder:text-[#1B2B41] placeholder:text-opacity-70 placeholder:text-lg placeholder:font-normal outline-[#1C304A] text-[#1B2B41] text-opacity-70 font-normal px-3"
                placeholder="Buscar DNI del paciente..."
              />
              {searchDni && (
                <button
                  onClick={handleClearSearch}
                  className="absolute top-1/2 text-lg right-2 transform -translate-y-1/2"
                >
                  <IoClose className="text-[#1B2B41]" />
                </button>
              )}
            </div>
            <Button
              className="flex items-center py-1.5 px-3 gap-2 bg-[#006AF5] text-white font-normal text-lg"
              onClick={() => console.log(searchDni)}
            >
              <IoSearch className="text-white" />
              Buscar
            </Button>
            <Button
              className="flex px-[14px] box-border items-center font-normal text-lg text-[#005FDB] rounded border border-[#C3D4FF]"
              onClick={handleOpenModalAdd}
            >
              <AiOutlineUserAdd className="mr-1 text-[#005FDB] text-2xl" />
              Añadir paciente
            </Button>
          </div>
          <div className="bg-[#f6fbff] border border-[#DAE0E7] rounded-lg p-4 h-80">
            <TablePatients onSelectPatient={onSelectPatient} />
          </div>
        </CardWhite>
      </div>
      {modalIsVisible && (
        <AddPatients
          isVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
        />
      )}
    </>
  );
}

PatientsModal.propTypes = {
  onSelectPatient: PropTypes.func.isRequired,
};
