import Us from "../../assets/Landing/us.png";
import { Link as ScrollLink } from "react-scroll";

export default function LUs() {
  return (
    <div className="flex sm:flex-row flex-col gap-10 py-[70px] justify-center items-center px-[21px] h-full">
      <div className="sm:max-w-[533px] max-w-[318px] w-full max-h-[378px] h-full">
        <img src={Us} alt="Background" className="w-full h-full" />
      </div>
      <div className="flex flex-col max-w-[558px] w-full gap-8">
        <div className="flex flex-col sm:gap-8 gap-2">
          <h2 className="text-[#143D72] font-medium text-[40px] sm:flex hidden">
            Nosotros
          </h2>
          <h2 className="text-[#143D72] sm:hidden font-semibold text-2xl">
            ¿Quiénes somos?
          </h2>
          <h3 className="sm:text-2xl text-sm font-normal text-[#192739] text-opacity-95 w-full sm:max-w-full max-w-[312px]">
            Nos dedicamos a ofrecer soluciones tecnológicas para clínicas
            odontológicas. Nuestro objetivo es simplificar y optimizar la
            gestión de tu clínica, permitiéndote centrarte en lo que realmente
            importa: el cuidado de tus pacientes.
          </h3>
        </div>
        <div className="h-[67px] sm:flex hidden">
          <ScrollLink
            to="contacto"
            smooth={true}
            duration={500}
            className="bg-[#006AF5] cursor-pointer items-center flex justify-center max-w-[167px] w-full rounded text-[#FAFAFA] font-normal text-2xl h-full"
          >
            Contáctanos
          </ScrollLink>
        </div>
      </div>
    </div>
  );
}
