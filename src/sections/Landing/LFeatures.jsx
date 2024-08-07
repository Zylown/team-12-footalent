import CardWhite from "../../components/CardWhite";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineSolution } from "react-icons/ai";
import { AiFillCustomerService } from "react-icons/ai";
import { AiOutlineSchedule } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";

export default function LFeatures() {
  return (
    <div className="bg-[#FAFDFF] py-[70px] flex flex-col gap-8 justify-center items-center border-b-2">
      <div className="text-center">
        <h2 className="text-[#143D72] font-medium sm:text-[40px] text-2xl">
          Funcionalidades principales
        </h2>
      </div>
      <div className="w-full">
        <ul className="flex flex-wrap justify-center w-full gap-4 px-6 sm:px-0">
          <CardWhite className="sm:max-w-[214px] max-w-[138px] w-full items-center py-7 px-4 gap-4 border border-[#193B67] border-opacity-15 text-center sm:max-h-[176px] max-h-[145px] h-full">
            <AiOutlineCalendar className="sm:text-7xl text-[44px] text-[#005FDB]" />
            <h3 className="text-[#005FDB] font-medium sm:text-xl text-sm">
              Agenda personal
            </h3>
          </CardWhite>
          <CardWhite className="sm:max-w-[214px] max-w-[138px] w-full items-center py-7 px-4 gap-4 border border-[#193B67] border-opacity-15 text-center sm:max-h-[176px] max-h-[145px] h-full">
            <AiOutlineSolution className="sm:text-7xl text-[44px] text-[#005FDB]" />
            <h3 className="text-[#005FDB] font-medium sm:text-xl text-sm">
              Registro de pacientes
            </h3>
          </CardWhite>
          <CardWhite className="sm:max-w-[214px] max-w-[138px] w-full items-center py-7 px-4 gap-4 border border-[#193B67] border-opacity-15 text-center sm:max-h-[176px] max-h-[145px] h-full">
            <AiFillCustomerService className="sm:text-7xl text-[44px] text-[#005FDB]" />
            <h3 className="text-[#005FDB] font-medium sm:text-xl text-sm">
              Soporte las 24hs
            </h3>
          </CardWhite>
          <CardWhite className="sm:max-w-[214px] max-w-[138px] w-full items-center py-7 px-4 gap-4 border border-[#193B67] border-opacity-15 text-center sm:max-h-[176px] max-h-[145px] h-full">
            <AiOutlineSchedule className="sm:text-7xl text-[44px] text-[#005FDB]" />
            <h3 className="text-[#005FDB] font-medium sm:text-xl text-sm">
              Gestión de turnos
            </h3>
          </CardWhite>
          <CardWhite className="sm:max-w-[214px] max-w-[138px] w-full items-center py-7 px-4 gap-4 border border-[#193B67] border-opacity-15 text-center sm:max-h-[176px] max-h-[145px] h-full">
            <AiOutlineComment className="sm:text-7xl text-[44px] text-[#005FDB]" />
            <h3 className="text-[#005FDB] font-medium sm:text-xl text-sm">
              Recordatorios
            </h3>
          </CardWhite>
        </ul>
      </div>
    </div>
  );
}
