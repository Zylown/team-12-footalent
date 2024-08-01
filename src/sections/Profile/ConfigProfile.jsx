import Button from '../../components/Button'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { useState } from 'react'
import Soporte from './Modal/Soporte'
import ModalPassword from './Modal/ModalPassword'
const ConfigProfile = () => {
  // info que vendria desde el back
  const Contraseña = "contraseña"
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

  const handleModalPassword = () => {
    setModalPassword(true);
  };
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
        {isOpen ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
      </Button>
      {isOpen && (
        <div className="flex justify-center gap-2 py-1"> 
        <div className="py-1 flex  justify-center ">
                <Button
                type="button"
                className="py-[13.5px] px-[48px] border border-mainBlue text-mainBlue   text-center "
                onClick={handleModalPassword}
                >
                  Cambiar contraseña
                </Button>
                </div>
                <div className="py-1 flex justify-center ">
                <Button
                 type="button"
                className="py-[13.5px] px-[48px] border border-mainBlue text-mainBlue  text-center "
                onClick={handleOpenModalAdd}
                >
                  Soporte
                </Button>
                </div>
                <div className="py-1 flex  justify-center ">
                <Button
                type="button"
                className="py-[13.5px] px-[48px] border bg-mainBlue text-white text-center "
                >
                  Cerrar sesion
                </Button>
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
    {
      modalPassword && 
      <ModalPassword
      isVisible ={modalPassword}
        setModalIsVisible={setModalPassword}
      />
    }
    </>
  )
}

export default ConfigProfile