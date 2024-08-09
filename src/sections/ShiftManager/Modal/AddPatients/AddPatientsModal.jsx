import PropTypes from "prop-types";
import CardWhite from "../../../../components/CardWhite";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { IoSearch, IoClose } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import TablePatients from "./TablePatientsModal";
import AddPatients from "../../../Pacientes/Modal/AddPatients";

export default function PatientsModal({ onSelectPatient, closeModal }) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [searchDni, setSearchDni] = useState("");

  const handleInputSearch = (e) => {
    if (setSearchDni) {
      setSearchDni(e.target.value);
    }
  };

  const handleClearSearch = () => {
    if (searchDni && setSearchDni) {
      setSearchDni("");
    }
  };

  const handleOpenModalAdd = () => {
    setModalIsVisible(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2">
        <CardWhite className="bg-white gap-5 max-w-[690px] w-full sm:px-6 p-3 py-4 relative sm:max-h-max max-h-[90vh] overflow-y-auto overflow-x-hidden custom-scollbar">
          <div className="container__h1 py-[10px] flex justify-between items-center relative">
            <h1 className="text-[32px] text-[#192739] font-semibold">
              Pacientes
            </h1>
            <button
              onClick={closeModal}
              className="absolute sm:-right-4 -right-2 top-2 transform -translate-y-1/2 hover:bg-[#F2F8FC] rounded-full"
            >
              <IoIosClose className="text-[#1B2B41] text-3xl" />
            </button>
          </div>
          <div className="w-full h-auto flex sm:gap-1.5 gap-2 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Input
                value={searchDni}
                type="text"
                onChange={handleInputSearch}
                className="w-full box-border h-full bg-white border-[1.5px] border-[#1C304A] border-opacity-50 placeholder:text-[#1B2B41] placeholder:text-opacity-70 placeholder:text-lg placeholder:font-normal outline-[#1C304A] text-[#1B2B41] text-opacity-70 font-normal px-3"
                placeholder="Buscar DNI del paciente..."
              />
              {searchDni ? (
                <button
                  onClick={handleClearSearch}
                  className="absolute top-1/2 text-lg right-2 transform -translate-y-1/2"
                >
                  <IoClose className="text-[#1B2B41]" />
                </button>
              ) : (
                <IoSearch className="absolute top-1/2 right-3 text-lg transform -translate-y-1/2 text-[#1B2B41]" />
              )}
            </div>
            <Button
              className="flex px-[14px] box-border bg-mainBlue items-center font-normal text-lg text-white rounded border border-[#C3D4FF]"
              onClick={handleOpenModalAdd}
            >
              <AiOutlineUserAdd className="mr-1 text-white text-2xl" />
              Añadir paciente
            </Button>
          </div>
          <div className="bg-[#f6fbff] border border-[#DAE0E7] rounded-lg p-4 sm:h-80 h-auto overflow-y-auto custom-scrollbar">
            <TablePatients
              onSelectPatient={onSelectPatient}
              searchDni={searchDni}
            />
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
  closeModal: PropTypes.func.isRequired,
};
