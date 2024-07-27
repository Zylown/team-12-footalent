import Button from '../../components/Button'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { useState } from 'react'
import Soporte from './Modal/Soporte'
const ConfigProfile = () => {
  // info que vendria desde el back
  const Contraseña = "contraseña"
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
        {isOpen ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
      </Button>
      {isOpen && (
        <div> <div className="py-1 flex  justify-center ">
                <Button
                type="button"
                className="py-[13.5px] px-[48px] border text-center w-[188px]"
                >
                  Contraseña
                </Button>
                </div>
                <div className="py-1 flex justify-center ">
                <Button
                 type="button"
                className="py-[13.5px] px-[48px] border text-center w-[188px]"
                onClick={handleOpenModalAdd}
                >
                  Soporte
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
    )}</>
  )
}

export default ConfigProfile