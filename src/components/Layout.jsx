import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* outlet  es un componente que se utiliza para renderizar las rutas hijas de un componente padre */}
    </>
  );
}
