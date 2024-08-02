import PropTypes from "prop-types";

//import Checkbox from "antd/es/checkbox/Checkbox";
import MonthCalendar from "../Calendar/MonthCalendar";
import { useState } from "react";
import ScheduleShift from "./Modal/ScheduleShift";
import Button from "../../components/Button";
/* import { getDentists } from "../../api/dentist/dentist-services"; */
/* import { useNavigate } from "react-router-dom"; */

function ShiftSidebar({ handleDateSelect }) {
  // modal estado para mostrar u ocultar el modal de agendar turno
  const [modalShiftIsVisible, setModalShiftIsVisible] = useState(false);

  // funcion para mostrar el modal de agendar turno
  const handleOpenModalAdd = () => {
    setModalShiftIsVisible(true);
  };

  /* const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }; */

  return (
    <>
      <div className="px-3 border-l-2 border-[#1A3860]/10 w-80 min-w-[300px] space-y-3 hidden lg:block">
        <MonthCalendar handleDateSelect={handleDateSelect} />
        <div className="flex items-center justify-center w-full mx-auto">
          <div className="w-full">
            <Button
              className="w-full text-white bg-mainBlue hover:bg-mainBlue/80 "
              onClick={handleOpenModalAdd}
              type="button"
            >
              Agendar Turno
            </Button>
          </div>
        </div>
        {/* <div className="flex flex-col gap-1 pb-5">
          <h2>Filtros</h2>
          <Checkbox onChange={onChange}>Reprogramado</Checkbox>
          <Checkbox onChange={onChange}>Ausente</Checkbox>
        </div> */}
        <div>
          <h2 className="font-semibold text-lg text-[#1b2b41a7]">Estado</h2>
          <ul className="flex flex-col gap-3 mt-2">
            <li className="inline-flex items-center">
              <div className="me-2 w-6 h-6 rounded-md bg-[#006AF5]"></div>
              Confirmado
            </li>
            <li className="inline-flex items-center">
              <div className="me-2 w-6 h-6 rounded-md bg-[#FFCC00]"></div>
              Pendiente
            </li>
            <li className="inline-flex items-center">
              <div className="me-2 w-6 h-6 rounded-md bg-[#AD00FF]"></div>
              Reprogramado
            </li>
            <li className="inline-flex items-center">
              <div className="me-2 w-6 h-6 rounded-md bg-[#FF3B30]"></div>
              Cancelado
            </li>
            <li className="inline-flex items-center">
              <div className="me-2 w-6 h-6 rounded-md bg-[#34C759]"></div>
              Presente
            </li>
            <li className="inline-flex items-center">
              <div className="me-2 w-6 h-6 rounded-md bg-[#FF9500]"></div>
              Ausente
            </li>
          </ul>
        </div>
      </div>
      {modalShiftIsVisible && (
        <ScheduleShift
          isVisible={modalShiftIsVisible}
          setModalShiftIsVisible={setModalShiftIsVisible}
        />
      )}
    </>
  );
}

export default ShiftSidebar;

ShiftSidebar.propTypes = {
  handleDateSelect: PropTypes.func.isRequired,
};
