import LogoBanner from "../../assets/LogoBanner.svg";
import MockupHeader from "../../assets/MockupHeader.svg";

export default function LBanner() {
  return (
    <div className="flex sm:flex-row flex-col w-full justify-center items-center sm:gap-0 gap-8 sm:pt-0 py-8">
      <div className="flex flex-col items-center max-w-[538px] px-[34px] w-full">
        <div className="flex flex-col gap-6 items-center">
          <div className="sm:max-w-[220px] max-w-[148px] w-full">
            <img className="w-full" src={LogoBanner} alt="Logo" />
          </div>
          <div className="text-center">
            <h2 className="font-nunito sm:text-7xl text-[40px] font-semibold text-[#143D72]">
              DentPlanner
            </h2>
          </div>
          <div>
            <p className="sm:text-2xl text-lg text-[#1B2B41] text-opacity-70 font-light text-center">
              La solución integral para una <br />
              administración eficiente y sin
              <br className="sm:block hidden" /> complicaciones.
            </p>
          </div>
        </div>
        <div className="pt-8 flex w-full flex-col gap-2">
          <button className="bg-[#006AF5] font-medium w-full h-full text-white sm:text-2xl text-lg px-3.5 sm:py-5 py-3 rounded">
            Programá una demo
          </button>
          <button className="block sm:hidden bg-white font-medium w-full h-full sm:text-2xl text-lg px-3.5 sm:py-5 py-3  rounded text-[#006AF5] border border-[#006AF5]">
            Conocé más
          </button>
        </div>
      </div>
      <div className="max-w-[593px] w-full">
        <img className="w-full" src={MockupHeader} alt="MockupHeader" />
      </div>
    </div>
  );
}
