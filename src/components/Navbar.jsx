import { Link } from "react-router-dom";
import Logo from "../assets/LogoDental.svg";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");
  let nombreUsuario;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      nombreUsuario = `${decoded.first_name.toUpperCase()} ${decoded.last_name.toUpperCase()}`;
    } catch (e) {
      console.error("Invalid token", e);
    }
  }
  const menuRef = useRef(null);

  const [isLogin, setIsLogin] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  useEffect(() => {
    if (
      location.pathname === "/agenda" ||
      location.pathname === "/pacientes" ||
      location.pathname === "/pacientes/historia-clinica"
    ) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
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
      <div className="lg:px-[120px] px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center">
            <p className="text-white text-2xl font-bold font-nunito mr-2">
              DentPlanner
            </p>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        {isLogin && (
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
                  {nombreUsuario}
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
                      to="/soporte"
                      className="flex items-center px-4 py-3 text-gray-700 text-lg font-normal hover:bg-gray-100"
                      onClick={closeMenu}
                    >
                      <MdOutlineContactSupport className="text-[#1B2B41] text-opacity-70 text-2xl mr-3" />
                      Soporte
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center px-4 py-3 border-t  text-gray-700 text-lg font-normal hover:bg-gray-100 rounded-b"
                      onClick={closeMenu}
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
