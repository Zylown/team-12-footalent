import PropTypes from "prop-types";
import { Select } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import MonthCalendar from "../Calendar/MonthCalendar";
import { useState } from "react";
import ScheduleShift from "./Modal/ScheduleShift";
import Button from "../../components/Button";

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
            <div className="w-full mt-3 text-lg">
              <Select
                placeholder={"Seleccionar profesional"}
                variant="Borderless"
                style={{
                  width: "100%",
                  height: "44px",
                  fontSize: 18,
                  fontWeight: 600,
                  backgroundColor: "#F6FBFF",
                  borderColor: "rgba(28, 52, 84, 0.2)",
                  borderWidth: 2,
                  borderRadius: 4,
                  fontFamily: "Roboto, sans-serif",
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
        <div className="flex flex-col gap-1">
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
