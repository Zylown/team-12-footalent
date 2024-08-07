import { Link } from "react-router-dom";

export default function NavbarLanding() {
  return (
    <ul className="sm:flex hidden py-4 text-[#143D72] text-2xl font-semibold justify-center gap-6">
      {/* faltaria agregar acá una transición para que te lleve a esta parte de la landing, un scroll */}
      <Link>Nosotros</Link>
      <Link>Funcionalidades</Link>
      <Link>Contacto</Link>
    </ul>
  );
}
