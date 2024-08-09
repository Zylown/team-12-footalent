import Button from "../../components/Button";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
const ConfigProfile = () => {
  
  const [isOpen, setIsOpen] = useState(false);
 
  

 
  //funcio para desplegar la tabla
  const toggleTable = () => {
    setIsOpen(!isOpen);
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
          <div className="flex flex-col px-[16.5px] sm:flex-row justify-center gap-2 py-1">
            <div className="py-1 flex  justify-center items-center">
              <Link
                to="/perfil/cambiar-contraseña"
                className="w-full mx-1 py-1 px-[71px] border rounded-md border-mainBlue text-mainBlue   text-center text-[14px] sm:text-[18px]  sm:py-[11px] sm:px-[40px]"
                
              >
                Cambiar contraseña
              </Link>
            </div>
            <div className="py-1 flex justify-center items-center ">
              <Link
                to="/perfil/soporte"
                className="w-full mx-1 py-1 px-[71px]  border rounded-md border-mainBlue text-mainBlue text-[14px] sm:text-[18px]    text-center sm:py-[11px] md:px-[40px] "
                
              >
                Soporte
              </Link>
            </div>
            <div className="py-1 flex  justify-center items-center">
              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                className="w-full mx-1 py-1 px-[71px] border rounded-md  text-white bg-mainBlue text-[14px] sm:text-[18px]   text-center sm:py-[11px] sm:px-[40px] "
              >
                Cerrar sesion
              </Link>
            </div>
          </div>
        )}
      </div>
      
    </>
  );
};

export default ConfigProfile;
