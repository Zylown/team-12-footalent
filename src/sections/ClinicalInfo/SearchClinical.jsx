import CardWhite from "../../components/CardWhite";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { IoSearch, IoClose } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";
import TableClinicalInfo from "./TableClinicalInfo";
// import AddUser from "./Modal/AddUser";

export default function SearchClinical() {
  //   const [modalIsVisible, setModalIsVisible] = useState(false);
  const [searchDni, setSearchDni] = useState("");

  const handleInputSearch = (e) => {
    const value = e.target.value;
    setSearchDni(value);
  };

  const handleClearSearch = () => {
    setSearchDni("");
  };

  const handleOpenModalAdd = () => {
    // setModalIsVisible(true);
  };

  return (
    <>
      <div className="bg-white mt-6 px-2 w-full flex justify-center">
        <CardWhite className="sm:gap-5 gap-2 max-w-[744px] w-full sm:px-6 px-4 py-4">
          <div className="container__h1 py-[10px]">
            <h1 className="text-[32px] text-[#192739] font-semibold">
              Información de la clínica
            </h1>
          </div>
          <div className="w-full md:h-11 h-auto flex sm:gap-1.5 gap-2 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Input
                value={searchDni}
                type="text"
                onChange={handleInputSearch}
                className="w-full box-border h-full bg-white border-[1.5px] border-[#1C304A] border-opacity-50 placeholder:text-[#1B2B41] placeholder:text-opacity-70 placeholder:text-lg placeholder:font-normal outline-[#1C304A] text-[#1B2B41] text-opacity-70 font-normal px-3"
                placeholder="Buscar información..."
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
              className="flex px-[14px] box-border items-center font-normal text-lg text-[#005FDB] rounded border border-[#006AF5]"
              onClick={handleOpenModalAdd}
            >
              <AiOutlineUserAdd className="mr-1 text-[#005FDB] text-2xl" />
              Añadir información
            </Button>
          </div>
          <div className="bg-[#f6fbff] border border-[#DAE0E7] rounded-lg sm:p-4 p-2 md:h-80 h-auto overflow-y-auto custom-scrollbar">
            <TableClinicalInfo />
          </div>
        </CardWhite>
      </div>
      {/* {modalIsVisible && (
        <AddUser
          isVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
        />
      )} */}
    </>
  );
}
