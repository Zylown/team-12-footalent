import CardWhite from "../../components/CardWhite"
import DropTable from "../../components/DropTable"
import ConfigProfile from "./ConfigProfile";
import Reasons from "./Modal/Reasons";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";



const Adjustments = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const handleOpenModalAdd = () => {
    setModalIsVisible(true);
    
  };
  //variables para ejemplos
  
  const sections = [
    { nombre: 'Teléfono', value: '0800 222 4589' },
    { nombre: 'Dirección', value: 'Dirección del lugar' },
    { nombre: 'Correo electrónico', value: 'correo electrónico' },
    { nombre: 'Horario de apertura', value: 'Horario de apertura del lugar' },
    { nombre: 'Horario de cierre', value: 'Horario de cierre del lugar' }
  ]
 
  
 const section2= [{
    nombre:"Motivos",
    value: "Peronaliza los motivos" ,
    icon: <FaRegEdit />,
  }]

  return (
    <>
    <div className="bg-white xl:mx-72 md:mx-48 sm:mx-4 mt-4 mb-4 px-2 gap-[24px]">

      <CardWhite className="!gap-4 px-[24px] py-[34px]">
        <h1 className="text-[24px] font-bold pb-[10px] " >Ajustes generales</h1>
        <div className="border rounded-md">
        <DropTable nameButton={"Información de la clínica"}  sections={sections}/>
        </div>
         
      <div className="border rounded-md">
        <DropTable nameButton={"Consultas"}  sections={section2} setModalIsVisible={handleOpenModalAdd}/>
        </div>

        <div className="border rounded-md">
        <ConfigProfile nameButton={"Consultas"} sections={section2}/>
        </div>
        </CardWhite>
      </div>
      {modalIsVisible && (
      <Reasons
        isVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
      />
    )}
      
      </>
  )
}

export default Adjustments