import CardWhite from "../../components/CardWhite";
import BannerHome from "../../assets/ImageFilter.svg";
import BannerAdmin from "../../assets/BannerAdmin.jpg";
import { PiIdentificationCard } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineSnippets } from "react-icons/ai";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo } from "react";
import { apiGetUserById } from "../../api/users/apiUsers";
import { userStore } from "../../context/userStore";

export default function CardWelcome() {
  // se obtiene el estado global de la variable user y para guardar el usuario
  const { user, setUser } = userStore();
  const token = localStorage.getItem("token");
  const decoded = useMemo(() => {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  }, [token]);
  
  useEffect(() => {
    if (!user && decoded) {
      const getUsersByIdToken = async () => {
        try {
          const response = await apiGetUserById(decoded.user_id);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };
      getUsersByIdToken();
    }
  }, [decoded, user, setUser]);

  const nombrePerfil = useMemo(() => {
    // if (user) {
    //   return user.last_name === "User"
    //     ? user.first_name
    //     : `${user.first_name} ${user.last_name}`;
    // }
    if (decoded) {
      return decoded.last_name === "User"
        ? decoded.first_name
        : `${decoded.first_name} ${decoded.last_name}`;
    }
    return null;
  }, [decoded]);

  const role = decoded.role;

  return (
    <div className="bg-[#fafdff] max-w-[1126px] w-full lg:px-28 sm:px-8 px-4 pt-6">
      <CardWhite className="gap-6">
        <div className="w-full h-40 sm:h-full bg-center">
          <img
            src={role === "admin" ? BannerAdmin : BannerHome}
            alt="Banner"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>

        <div className="bg-white flex justify-center">
          <p className="sm:text-2xl text-xl font-normal">
            Bienvenido, {nombrePerfil}
          </p>
        </div>
        <div className="w-full bg-[#f3f5f7] flex flex-col gap-2 px-4 py-3">
          <div className="flex sm:flex-row flex-col gap-2">
            <Link
              to={"/pacientes"}
              className="flex rounded items-center justify-center bg-[#006af5] flex-1 px-[14px] py-2 text-white hover:bg-[#005fdb] transition-all"
            >
              <PiIdentificationCard className="text-4xl text-[#c0d2ff]" />
              <p className="text-xl font-extralight">Pacientes</p>
            </Link>
            <Link
              to={"/agenda"}
              className="flex rounded items-center justify-center bg-[#006af5] flex-1 px-[14px] py-2 text-white hover:bg-[#005fdb] transition-all"
            >
              <CiCalendar className="text-4xl text-[#c0d2ff]" />
              <p className="text-xl font-extralight">Agenda</p>
            </Link>
            {role === "admin" ? (
              <Link
                to={"/usuarios"}
                className="flex rounded items-center justify-center bg-[#006af5] flex-1 px-[14px] py-2 text-white hover:bg-[#005fdb] transition-all"
              >
                <AiOutlineUser className="text-4xl text-[#c0d2ff]" />
                <p className="text-xl font-extralight">Usuarios</p>
              </Link>
            ) : (
              <Link
                to={"/perfil"}
                className="flex rounded items-center justify-center bg-[#006af5] flex-1 px-[14px] py-2 text-white hover:bg-[#005fdb] transition-all"
              >
                <AiOutlineUser className="text-4xl text-[#c0d2ff]" />
                <p className="text-xl font-extralight">Perfil</p>
              </Link>
            )}
          </div>
          {role === "admin" ? (
            <div className="flex justify-center w-full">
              <div className="flex sm:flex-row flex-col gap-2 max-w-[718px] w-full">
                <Link
                  to={"/reportes"}
                  className="flex rounded items-center justify-center bg-[#006af5] flex-1 px-[14px] py-2 text-white hover:bg-[#005fdb] transition-all"
                >
                  <AiOutlineSnippets className="text-4xl text-[#c0d2ff]" />
                  <p className="text-xl font-extralight">Reportes</p>
                </Link>
                <Link
                  to={"/info-clinica"}
                  className="flex rounded items-center justify-center bg-[#006af5] flex-1 px-[14px] py-2 text-white hover:bg-[#005fdb] transition-all min-h-[52px]"
                >
                  <p className="text-xl font-extralight">
                    Información de la clínica
                  </p>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </CardWhite>
    </div>
  );
}
