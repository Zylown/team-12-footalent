import { Link } from "react-router-dom";
import Logo from "../assets/LogoDental.svg";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState /*useMemo*/ } from "react";
import { FaCaretDown } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { useDecode } from "../hooks/useDecode";
// import { apiGetUserById } from "../api/users/apiUsers";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  // const [user, setUser] = useState(null);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const decoded = useDecode(token);
  let nombreUsuario;
  //estado para saber si el usuario esta logueado
  const [isLogin, setIsLogin] = useState(false);
  // no mostrar pacientes y agenda en el inicio
  const [isInicio, setIsInicio] = useState(false);

  // const getUserData = useMemo(() => {
  //   return async (userId) => {
  //     try {
  //       const response = await apiGetUserById(userId);
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error.message); // Añade más detalles del error
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (decoded && !user) {
  //     getUserData(decoded.user_id);
  //   }
  // }, [decoded, user, getUserData]);

  // if (user) {
  //   if (user.last_name === "User") {
  //     nombreUsuario = user.first_name.toUpperCase();
  //   } else {
  //     const fullName = `${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()}`;
  //     nombreUsuario =
  //       fullName.length > 20 ? user.first_name.toUpperCase() : fullName;
  //   }
  // }

  if (decoded) {
    if (decoded.last_name === "User") {
      nombreUsuario = decoded.first_name.toUpperCase();
    } else {
      const fullName = `${decoded.first_name.toUpperCase()} ${decoded.last_name.toUpperCase()}`;
      nombreUsuario =
        fullName.length > 20 ? decoded.first_name.toUpperCase() : fullName;
    }
  }

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  useEffect(() => {
    if (location.pathname === "/iniciar-sesion") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }

    if (location.pathname === "/inicio") {
      setIsInicio(true);
    } else {
      setIsInicio(false);
    }

    // Cerrar el menú si se hace clic fuera de él
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location]);

  return (
    <nav
      className="py-3"
      style={{
        backgroundImage: "linear-gradient(to bottom, #418FF5, #1C45D4)",
      }}
    >
      <div className="lg:px-[120px] px-4 pr-8 flex justify-between items-center">
        <div className="flex w-full items-center justify-between">
          <Link
            to={isLogin ? "/inicio" : "/iniciar-sesion"}
            className="flex items-center"
          >
            <p className="text-white text-2xl font-bold font-nunito mr-2">
              DentPlanner
            </p>
            <img src={Logo} alt="Logo" />
          </Link>
          <div className="sm:hidden block" ref={menuRef}>
            <IoMenu
              className="text-white text-3xl cursor-pointer"
              onClick={toggleMenu}
            />
            <div
              className={`fixed right-0 top-0 w-48 h-full bg-white shadow-lg z-10 transform transition-transform duration-300 ${
                isOpenMenu ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <button
                className="flex items-center px-4 py-6 text-black text-lg font-normal hover:bg-gray-100 rounded-t w-full"
                onClick={closeMenu}
              >
                <FaArrowLeft className="text-black text-2xl mr-3" />
                Volver
              </button>
              <Link
                to="/perfil"
                className="flex items-center px-4 py-3 text-gray-700 text-lg font-normal hover:bg-gray-100 rounded-t"
                onClick={closeMenu}
              >
                <AiOutlineUser className="text-[#1B2B41] text-opacity-70 text-2xl mr-3" />
                Perfil
              </Link>
              <Link
                to="/soporte"
                className="flex items-center px-4 py-3 text-gray-700 text-lg font-normal hover:bg-gray-100"
                onClick={closeMenu}
              >
                <MdOutlineContactSupport className="text-[#1B2B41] text-opacity-70 text-2xl mr-3" />
                Soporte
              </Link>
              <Link
                to="/iniciar-sesion"
                className="flex items-center px-4 py-3 border-t-2 text-gray-700 text-lg font-normal hover:bg-gray-100 rounded-b"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                <AiOutlineLogout className="text-[#1B2B41] text-opacity-70 text-2xl mr-3" />
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
        {isInicio || location.pathname === "/iniciar-sesion" ? null : (
          <div className="md:flex hidden">
            <ul className="flex gap-6 text-white font-semibold text-xl items-center">
              <li>
                <Link to={"/pacientes"}>Pacientes</Link>
              </li>
              <li>
                <Link to={"/agenda"}>Agenda</Link>
              </li>
              <li className="relative" ref={menuRef}>
                <button
                  className="flex items-center text-white"
                  onClick={toggleMenu}
                >
                  <span className="truncate max-w-[150px]">
                    {nombreUsuario}
                  </span>
                  <FaCaretDown className="ml-1 text-white" />
                </button>
                {isOpenMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-10">
                    <div className="absolute top-[-6px] right-2 w-5 h-5 bg-white rotate-45 -z-10"></div>
                    <Link
                      to="/perfil"
                      className="flex items-center px-4 py-3 text-gray-700 text-lg font-normal hover:bg-gray-100 rounded-t"
                      onClick={closeMenu}
                    >
                      <AiOutlineUser className="text-[#1B2B41] text-opacity-70 text-2xl mr-3" />
                      Perfil
                    </Link>
                    <Link
                      to="/perfil/soporte"
                      className="flex items-center px-4 py-3 text-gray-700 text-lg font-normal hover:bg-gray-100"
                      onClick={closeMenu}
                    >
                      <MdOutlineContactSupport className="text-[#1B2B41] text-opacity-70 text-2xl mr-3" />
                      Soporte
                    </Link>
                    <Link
                      to="/iniciar-sesion"
                      className="flex items-center px-4 py-3 border-t  text-gray-700 text-lg font-normal hover:bg-gray-100 rounded-b"
                      onClick={() => {
                        localStorage.removeItem("token");
                      }}
                    >
                      <AiOutlineLogout className="text-[#1B2B41] text-opacity-70 text-2xl mr-3" />
                      Cerrar sesión
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
        {location.pathname === "/inicio" && (
          <div className="md:flex hidden">
            <ul className="flex gap-6 text-white font-semibold text-xl items-center">
              <li className="relative" ref={menuRef}>
                <button
                  className="flex items-center text-white"
                  onClick={toggleMenu}
                >
                  <span className="truncate max-w-[150px]">
                    {nombreUsuario}
                  </span>
                  <FaCaretDown className="ml-1 text-white" />
                </button>
                {isOpenMenu && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-10"
                    ref={menuRef}
                  >
                    <div className="absolute top-[-6px] right-2 w-5 h-5 bg-white rotate-45 -z-10"></div>
                    {isInicio ? null : (
                      <Link
                        to="/perfil"
                        className="flex items-center px-4 py-3 text-gray-700 text-lg font-normal hover:bg-gray-100 rounded-t"
                        onClick={closeMenu}
                      >
                        <AiOutlineUser className="text-[#1B2B41] text-opacity-70 text-2xl mr-3" />
                        Perfil
                      </Link>
                    )}
                    <Link
                      to="/soporte"
                      className="flex items-center px-4 py-3 text-gray-700 text-lg font-normal hover:bg-gray-100"
                      onClick={closeMenu}
                    >
                      <MdOutlineContactSupport className="text-[#1B2B41] text-opacity-70 text-2xl mr-3" />
                      Soporte
                    </Link>
                    <Link
                      to="/iniciar-sesion"
                      className="flex items-center px-4 py-3 border-t  text-gray-700 text-lg font-normal hover:bg-gray-100 rounded-b"
                      onClick={() => {
                        localStorage.removeItem("token");
                      }}
                    >
                      <AiOutlineLogout className="text-[#1B2B41] text-opacity-70 text-2xl mr-3" />
                      Cerrar sesión
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
