import Button from "../../../components/Button";
import Input from "../../../components/Input";
import CardWhite from "../../../components/CardWhite";
import PropTypes from "prop-types";
import { IoIosSearch } from "react-icons/io";
import { GoPersonAdd } from "react-icons/go";
import { TbUserMinus } from "react-icons/tb";
import { useState } from "react";
import ModalAdd from "./ModalAdd";
import ModalCancel from "../../../components/ModalCancel";

const Reasons = ({isVisible, setModalIsVisible}) => {
  const [addModal, setAddModal] = useState(false)
  const [deletedReason, setDeletedReason] = useState(false)
  const handleDeletedReason =()=>{
console.log("ok");
  }

  const handleDeletedModal =()=>{
    setDeletedReason(true)
  }
const handleAddModal =()=>{
  setAddModal(true)
}
  const motivos = [{
    time: "40 minutos",
    description:"Conducto"
  },
  {
    time: "60 minutos",
    description:"Caries"
  },
  {
    time: "30 minutos",
    description:"Limpieza"
  }]
    const handleOnCancel = () => {
        setModalIsVisible(false);
      };
  return (
    isVisible && (
      <>
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <CardWhite className="bg-white min-w-[744px] p-[24px] gap-[24px]">
            <div className="pb-6">
              <h2 className="text-[32px] font-semibold text-[#192739]">
                Motivos de Consulta
              </h2>
            </div>
            <div>
            <div className="flex  gap-1 " >
             <Input placeholder={"Buscar motivos..."}  type="text" className="flex-grow"/>
             <div className="flex gap-1">
             <Button className="flex items-center gap-1 border bg-mainBlue text-white">
             <IoIosSearch /> Buscar
             </Button>
             <Button 
             className="flex items-center gap-1 border text-mainBlue"
             onClick={handleAddModal}
             >
             <GoPersonAdd />  Añadir motivo 
             </Button>
             </div>
            </div>
            </div>
            <div className=" min-w-[744px] border rounded-md bg-bgTable ">
              
              <table className="w-full  ">
               
                <thead>
                  <tr className="pt-[16px]">
                    <td className="p-2  text-center ">
                        <h3 className="border rounded-md p-2 bg-custom-gradient">Horario</h3>
                    </td>
                    <td className=" w-3/4 text-center">
                        <h3 className="border rounded-md p-2 mr-2 bg-custom-gradient">Descripción</h3>
                    </td>
                  </tr>
                </thead>
          <tbody className="space-y-1 rounded-md">
          {motivos.map((motivo, index) => (
              <tr key={index} className="space-x-2">
                <td className="p-2  text-center w-1/4">

                  <p className="border rounded-md p-2 bg-white"> {motivo.time}</p>

                </td>
                <td className=" w-3/4">
                
                  <div className="flex items-center justify-center relative">
                    <p className="w-full p-2 rounded-md border text-center mr-2 bg-white">{motivo.description} </p>
                    
                  <Button
                      type="button"
                      onClick={handleDeletedModal}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-1 "
                    >
                    <TbUserMinus className="text-[#7d8693]"/>
                    </Button>
                    </div>
                </td>

              </tr>
         ))}
          </tbody>
        
        </table>
              
            </div>

          </CardWhite>
        </div>
       {addModal &&
        <ModalAdd
        isVisible={addModal}
        setModalIsVisible={setAddModal}
       />}
       {
        deletedReason &&
        <ModalCancel
        isVisible= {deletedReason}
        setIsVisible={setDeletedReason}
        cancelModal={handleDeletedReason}
        />
       }
        </>
      )
  )
}

export default Reasons

Reasons.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    setModalIsVisible: PropTypes.func.isRequired,
  };