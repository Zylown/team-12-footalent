import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const token = localStorage.getItem("token");
  let profileText;
  if (token) {
    const decoded = jwtDecode(token);
    profileText =
      decoded.role === "admin"
        ? "Administrador"
        : decoded.role === "dentist"
        ? "Odontólogo"
        : "Secretario";
  }

  return (
    <div className="sm:flex hidden bg-[#eef3f7] w-full justify-end pr-[120px] py-3">
      <p className="text-base text-[#262626]">Perfil: {profileText}</p>
    </div>
  );
}
