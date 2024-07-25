import { useState } from "react";
import CardWhite from "../../../components/CardWhite";
import { FaCaretDown } from "react-icons/fa";
import TableHistory from "./TableHistory";

export default function HistoryClinic() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const patientName = "Marcelo Tinelli";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white mt-6 px-2">
      <CardWhite className="p-6 lg:min-w-[846px] w-full gap-6">
        <div className="flex justify-between">
          <div className="py-2.5">
            <h2 className="font-semibold text-3xl">Historial de visitas</h2>
          </div>
          <div className="min-w-[387px]">
            <div className="py-6 px-8 shadow-custom-lg rounded-lg flex flex-col gap-1">
              <h2 className="font-semibold text-2xl text-[#192739]">
                {patientName}
              </h2>
              <p className="text-lg text-[#1C304A] text-opacity-50 font-semibold">
                <b className="mr-2.5 font-medium text-[#1B2B41] text-opacity-70">
                  Nació el
                </b>{" "}
                01/04/1960
              </p>
              <p className="text-lg text-[#1C304A] text-opacity-50 font-semibold">
                <b className="mr-2.5 font-medium text-[#1B2B41] text-opacity-70">
                  DNI
                </b>{" "}
                21.428.290
              </p>
              <p className="text-lg text-[#1C304A] text-opacity-50 font-semibold">
                <b className="mr-2.5 font-medium text-[#1B2B41] text-opacity-70">
                  Teléfono
                </b>{" "}
                +54 9 15 1248-5938
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[4px] border">
          <div
            className="w-full py-3 px-4 pb-3 cursor-pointer flex justify-center items-center"
            style={{
              backgroundImage: "linear-gradient(to bottom, #F6FBFF, #C3D4FF)",
            }}
            onClick={toggleDropdown}
          >
            <h1 className="text-[#192739] text-opacity-95 font-semibold text-2xl">
              Turnos
            </h1>
            <FaCaretDown
              className={`ml-1 text-[#1C304A] text-xl transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          {isDropdownOpen && (
            <div className="bg-[#f6fbff]">
              <TableHistory />
            </div>
          )}
        </div>
      </CardWhite>
    </div>
  );
}
