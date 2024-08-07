import Button from "../../components/Button";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useState } from "react";
import Soporte from "./Modal/Soporte";
import ModalPassword from "./Modal/ModalPassword";
import { Link } from "react-router-dom";
const ConfigProfile = () => {
  // info que vendria desde el back
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  

 
  //funcio para desplegar la tabla
  const toggleTable = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModalAdd = () => {
    setModalIsVisible(true);
  };
  return (
    <>
      <div className="border rounded-md">
        <Button
          type="button"
          onClick={toggleTable}
          className="bg-custom-gradient !py-3 w-full text-xl flex justify-center items-center"
        >
          Configuración
          {isOpen ? (
            <FaCaretUp className="ml-2 text-[#1C304A] text-opacity-50" />
          ) : (
            <FaCaretDown className="ml-2 text-[#1C304A] text-opacity-50" />
          )}
        </Button>
        {isOpen && (
          <div className="flex justify-center gap-2 py-1">
            <div className="py-1 flex  justify-center ">
              <Link
                to="/perfil/cambiar-contraseña"
                className="py-[13.5px] px-[48px] border border-mainBlue text-mainBlue   text-center "
                
              >
                Cambiar contraseña
              </Link>
            </div>
            <div className="py-1 flex justify-center ">
              <Link
                to="/perfil/soporte"
                className="py-[13.5px] px-[48px] border border-mainBlue text-mainBlue  text-center "
                
              >
                Soporte
              </Link>
            </div>
            <div className="py-1 flex  justify-center ">
              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                className="py-[13.5px] px-[48px] border bg-mainBlue text-white text-center "
              >
                Cerrar sesion
              </Link>
            </div>
          </div>
        )}
      </div>
      {modalIsVisible && (
        <Soporte
          isVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
        />
      )}
      
    </>
  );
};

export default ConfigProfile;
