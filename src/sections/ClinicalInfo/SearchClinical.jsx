import CardWhite from "../../components/CardWhite";
import TableClinicalInfo from "./TableClinicalInfo";

export default function SearchClinical() {
  return (
    <>
      <div className="bg-white mt-6 px-2 w-full flex justify-center">
        <CardWhite className="sm:gap-5 gap-2 max-w-[744px] w-full sm:px-6 px-4 py-4">
          <div className="container__h1 py-[10px]">
            <h1 className="sm:text-[32px] text-2xl text-[#192739] font-semibold">
              Información de la clínica
            </h1>
          </div>
          <div className="bg-[#f6fbff] border border-[#DAE0E7] rounded-lg sm:p-4 p-2 md:h-96 h-auto overflow-y-auto custom-scrollbar">
            <TableClinicalInfo />
          </div>
        </CardWhite>
      </div>
    </>
  );
}
