import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const token = localStorage.getItem("token");
  let profileRole;
  if (token) {
    const decoded = jwtDecode(token);
    profileRole =
      decoded.role === "admin"
        ? "Administrador"
        : decoded.role === "dentist"
        ? "Odontólogo"
        : "Secretario";
  }

  return (
    <div className="sm:flex hidden bg-[#eef3f7] w-full justify-end lg:px-[120px] px-4 pr-8 py-3">
      <p className="text-base text-[#262626]">Perfil: {profileRole}</p>
    </div>
  );
}
