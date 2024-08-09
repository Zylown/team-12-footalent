import PropTypes from "prop-types";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";
import TableDni from "./TableDni";
import CardWhite from "../../components/CardWhite";
import AddPatients from "./Modal/AddPatients";

export default function SearchPatients() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [searchDni, setSearchDni] = useState("");
  const [pacientes, setPacientes] = useState([]); // Estado compartido de pacientes

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
      <div className="bg-white mt-6 px-2 w-full flex justify-center">
        <CardWhite className="sm:gap-5 gap-2 max-w-[690px] w-full sm:px-6 px-4 py-4">
          <div className="container__h1 py-[10px]">
            <h1 className="text-[32px] text-[#192739] font-semibold">
              Pacientes
            </h1>
          </div>
          <div className="w-full md:h-11 h-auto flex sm:gap-1.5 gap-2 flex-col md:flex-row">
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
              className="flex px-[14px] box-border bg-mainBlue items-center font-normal text-lg text-white rounded border border-[#006AF5]"
              onClick={handleOpenModalAdd}
            >
              <AiOutlineUserAdd className="mr-1 text-white text-2xl" />
              Añadir paciente
            </Button>
          </div>
          <div className="bg-[#f6fbff] border border-[#DAE0E7] rounded-lg p-4 md:h-80 h-auto overflow-y-auto custom-scrollbar">
            <TableDni
              searchDni={searchDni}
              pacientes={pacientes}
              setPacientes={setPacientes}
            />
          </div>
        </CardWhite>
      </div>
      {modalIsVisible && (
        <AddPatients
          isVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
          setPacientes={setPacientes}
        />
      )}
    </>
  );
}

SearchPatients.propTypes = {
  searchDni: PropTypes.string,
  setSearchDni: PropTypes.func,
  setPacientes: PropTypes.func,
};
