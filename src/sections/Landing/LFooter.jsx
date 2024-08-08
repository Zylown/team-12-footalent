import LogoFooter from "../../assets/Landing/LogoFooter.svg";
import { TbWorld } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";

export default function LFooter() {
  return (
    <footer className="sm:pt-[19px] sm:pb-[67px] py-[54px] pl-6 bg-[#143D72]">
      <div className="flex flex-col items-center">
        <ul className="sm:flex hidden gap-6 text-[#C3D4FF] justify-center pb-[22px] w-full">
          <ScrollLink
            to="nosotros"
            smooth={true}
            duration={500}
            className="cursor-pointer font-semibold text-2xl hover:opacity-70"
          >
            Nosotros
          </ScrollLink>
          <ScrollLink
            to="funcionalidades"
            smooth={true}
            duration={500}
            className="cursor-pointer font-semibold text-2xl hover:opacity-70"
          >
            Funcionalidades
          </ScrollLink>
          <ScrollLink
            to="contacto"
            smooth={true}
            duration={500}
            className="cursor-pointer font-semibold text-2xl hover:opacity-70"
          >
            Contacto
          </ScrollLink>
        </ul>
        <div className="w-full flex justify-center">
          <div className="container__dentplanner max-w-[1125px] w-full flex flex-col gap-6">
            <div className="flex items-center">
              <h1 className="font-nunito sm:font-normal font-bold sm:text-[64px] text-lg text-[#F6FBFF]">
                DentPlanner
              </h1>
              <div className="sm:pl-[18px]">
                <img className="sm:w-full w-8" src={LogoFooter} alt="Logo" />
              </div>
            </div>
            <div className="flex flex-col gap-[23px]">
              <h4 className="font-extrabold text-xl text-[#FDFDFD]">
                Contáctanos
              </h4>
              <ul className="flex flex-col gap-3 text-[#BABABA] font-medium text-xl">
                <li>dentplanner@contact.com</li>
                <li>0800 1506-2596</li>
                <li>Av. Corrientes 590, Buenos Aires</li>
              </ul>
            </div>
            <div className="flex justify-between sm:items-center w-full sm:gap-0 gap-6 sm:flex-row flex-col">
              <div className="flex text-[#BABABA] font-medium text-xl items-center">
                {/* icono */}
                <TbWorld className="text-xl" />
                <p className="pl-2.5">Español</p>
                {/* icono de flecha para abajo */}
                <IoIosArrowDown className="text-xl cursor-pointer" />
              </div>
              <div className="text-[#BABABA] font-medium text-xl">
                <p>Copyright © 2024. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
