import CardWhite from "../../components/CardWhite"
import DropTable from "../../components/DropTable"
import ConfigProfile from "./ConfigProfile";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";



const Adjustments = () => {
  //variables para ejemplos
  const [userRole, setUserRole] = useState('admin'); // Puede ser 'admin' o 'dentist'
  const [sections, setSections] = useState([
    { nombre: 'Teléfono', value: '0800 222 4589' },
    { nombre: 'Dirección', value: 'Dirección del lugar' },
    { nombre: 'Correo electrónico', value: 'correo electrónico' },
    { nombre: 'Horario de apertura', value: 'Horario de apertura del lugar' },
    { nombre: 'Horario de cierre', value: 'Horario de cierre del lugar' }
  ]);
 
  
 const section2= [{
    nombre:"Motivos",
    value: "Peronaliza los motivos" ,
    icon: <FaRegEdit />,
  }]
//esto actualiza los campos
  const handleSectionChange = (updatedSections) => {
    setSections(updatedSections);
  };
  return (
    <>
    <div className="bg-white xl:mx-72 md:mx-48 sm:mx-4 mt-4 mb-4 px-2 gap-[24px]">

      <CardWhite className="!gap-4 px-[24px] py-[34px]">
        <h1 className="text-[24px] font-bold pb-[10px] " >Ajustes generales</h1>
        <div className="border rounded-md">
        <DropTable nameButton={"Información de la clínica"} userRole={userRole} sections={sections}/>
        </div>
         
      <div className="border rounded-md">
        <DropTable nameButton={"Consultas"} userRole={userRole} sections={section2}/>
        </div>

        <div className="border rounded-md">
        <ConfigProfile nameButton={"Consultas"} userRole={userRole} sections={section2}/>
        </div>
        </CardWhite>
      </div>
      
      
      </>
  )
}

export default Adjustments