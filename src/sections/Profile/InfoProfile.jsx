import CardWhite from "../../components/CardWhite";
import Button from "../../components/Button";
import imgProfile from "../../assets/ImgProfile.svg";
import { useEffect } from "react";
import { apiGetUserById } from "../../api/users/apiUsers";
import { useDecode } from "../../hooks/useDecode";
import { userStore } from "../../context/userStore";

const InfoProfile = () => {
  const { user, setUser } = userStore();
  const token = localStorage.getItem("token");
  const decode = useDecode(token);

  useEffect(() => {
    const getUserData = async (userId) => {
      try {
        const response = await apiGetUserById(userId);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!user) {
      getUserData(decode.user_id);
    }
  }, [decode.user_id, user, setUser]);

  return (
    <div className="bg-white max-w-[746px] px-[16px] w-full">
      <CardWhite className=" p-[20px] sm:p-6 bg-white rounded-lg h-full flex !flex-row gap-6 items-start">
        <div className="flex flex-col items-center">
          <img
            src={imgProfile}
            alt="Perfil del Usuario"
            className=" hidden sm:block sm:w-[127px] sm:h-[127px]object-cover "
          />
         
        </div>
        {/* Información del Usuario */}
        {
          // Si no hay usuario, muestra un mensaje de cargando
          !user ? (
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold">Cargando...</h2>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between gap-2 h-full">
              <div className="flex flex-col">
                <h2 className=" text-[20px]  sm:text-2xl text-[#192739] font-semibold">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-[#005FDB] text-[14]  sm:text-[18px] font-medium">
                  {" "}
                  {decode.role === "admin"
                    ? "Administrador"
                    : decode.role === "secretary"
                    ? "Secretario"
                    : "Odontólogo"}
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                {/* <div>
                  <p className="text-[#1B2B41] text-opacity-70 text-lg font-medium">
                    Nació el{" "}
                    <span className="text-[#1C304A] text-opacity-50 text-lg font-normal ml-2.5">
                      {user.birth_date}
                    </span>
                  </p>
                </div> */}
                <div>
                  <p className="text-[#1B2B41] text-opacity-70 text-[14]  sm:text-[18px] font-medium">
                    DNI{" "}
                    <span className="text-[#1C304A] text-opacity-50 text-[14]  sm:text-[18px] font-normal ml-2.5">
                      {user.dni}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[#1B2B41] text-opacity-70 text-[14]  sm:text-[18px] font-medium">
                    Correo Electrónico{" "}
                    <span className="text-[#006AF5] underline text-[14]  sm:text-[18px]font-normal ml-2.5">
                      {user.email}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )
        }
      </CardWhite>
    </div>
  );
};

export default InfoProfile;
