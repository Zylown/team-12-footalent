import PropTypes from "prop-types";
import { Select } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import MonthCalendar from "../Calendar/MonthCalendar";
import { useState } from "react";
import ScheduleShift from "./Modal/ScheduleShift";

function ShiftSidebar({ handleDateSelect }) {
  // modal estado para mostrar u ocultar el modal de agendar turno
  const [modalShiftIsVisible, setModalShiftIsVisible] = useState(false);
  // funcion para mostrar el modal de agendar turno
  const handleOpenModalAdd = () => {
    setModalShiftIsVisible(true);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <MonthCalendar handleDateSelect={handleDateSelect} />
        </div>
        <div className="flex items-center justify-center w-full mx-auto">
          <div className="w-full m-3">
            <button
              className="w-full py-2 font-bold text-white bg-blue-500 rounded-lg"
              onClick={handleOpenModalAdd}
            >
              Agendar Turno
            </button>
            <div className="w-full my-2">
              <Select
                placeholder={"Selecciona Profesional"}
                style={{
                  width: "100%",
                  height: "35px",
                }}
                allowClear
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                    disabled: true,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-4">
          <h2>Estados</h2>
          <Checkbox onChange={onChange}>Reprogramado</Checkbox>
          <Checkbox onChange={onChange}>Ausente</Checkbox>
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
