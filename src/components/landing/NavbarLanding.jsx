import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
export default function NavbarLanding() {
  return (
    <div className="sm:flex hidden items-center justify-between lg:px-[120px] px-8">
      <ul className="flex py-4 text-[#143D72] text-2xl font-semibold gap-6">
        <ScrollLink
          to="nosotros"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:opacity-70"
        >
          Nosotros
        </ScrollLink>
        <ScrollLink
          to="funcionalidades"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:opacity-70"
        >
          Funcionalidades
        </ScrollLink>
        <ScrollLink
          to="contacto"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:opacity-70"
        >
          Contacto
        </ScrollLink>
      </ul>
      <div className="">
        <Link
          to={"/iniciar-sesion"}
          className="bg-[#006AF5] py-2 px-4 rounded font-medium text-lg text-[#F6FBFF] hover:opacity-70 transition-all"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
