import CardWhite from "../../components/CardWhite";
import BannerHome from "../../assets/ImageFilter.svg";
import { PiIdentificationCard } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function CardWelcome() {
  const nombrePerfil = "Carlos García";
  return (
    <div className="bg-[#fafdff] max-w-[1126px] lg:px-28 sm:px-8 px-4 pt-6">
      <CardWhite className="gap-6">
        <div className="w-full h-40 sm:h-full bg-center">
          <img
            src={BannerHome}
            alt="Banner"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="bg-white flex justify-center">
          <p className="sm:text-2xl text-base font-normal">
            Bienvenido, {nombrePerfil}
          </p>
        </div>
        <div className="w-full bg-[#f3f5f7] flex sm:flex-row flex-col gap-2 px-4 py-3">
          <Link
            to={"/agenda"}
            className="flex rounded items-center justify-center bg-[#006af5] flex-1 px-[14px] py-2 text-white hover:bg-[#005fdb] transition-all"
          >
            <CiCalendar className="text-4xl text-[#c0d2ff]" />
            <p className="text-xl font-extralight">Agenda</p>
          </Link>
          <Link
            to={"/pacientes"}
            className="flex rounded items-center justify-center bg-[#006af5] flex-1 px-[14px] py-2 text-white hover:bg-[#005fdb] transition-all"
          >
            <PiIdentificationCard className="text-4xl text-[#c0d2ff]" />
            <p className="text-xl font-extralight">Pacientes</p>
          </Link>
          <Link
            to={"/perfil"}
            className="flex rounded items-center justify-center bg-[#006af5] flex-1 px-[14px] py-2 text-white hover:bg-[#005fdb] transition-all"
          >
            <AiOutlineUser className="text-4xl text-[#c0d2ff]" />
            <p className="text-xl font-extralight">Perfil</p>
          </Link>
        </div>
      </CardWhite>
    </div>
  );
}
