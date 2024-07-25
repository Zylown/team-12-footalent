export default function Profile() {
  const perfil = "Secretario";
  return (
    <div className="sm:flex hidden bg-[#eef3f7] w-full justify-end pr-[120px] py-3">
      <p className="text-base text-[#262626]">Perfil: {perfil}</p>
    </div>
  );
}
