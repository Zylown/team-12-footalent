import { useState, useEffect } from "react";
import Button from "../../components/Button";
import CardWhite from "../../components/CardWhite";
import Input from "../../components/Input";
import ModalOk from "../../components/ModalOk";
import { useForm } from "react-hook-form";
import { apiGetUsers } from "../../api/users/apiUsers";
import { apiResetPassword } from "../../api/apiResetPassword";

export default function ResetPassword() {
  // Estado para guardar los emails de los usuarios
  const [emails, setEmails] = useState([]);
  // Estado para mostrar mensaje de error si el email no se encuentra
  const [emailNotFound, setEmailNotFound] = useState(false);
  // Estado para mostrar el modal de éxito
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiGetUsers();
        const mappedEmails = res.data.map((user) => user.email);
        setEmails(mappedEmails); // guardamos los emails en el estado
      } catch (error) {
        console.error("Error de la API:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    // Verificar si el email ingresado está en la lista de emails
    if (emails.includes(data.email)) {
      // Si se encuentra el email, resetear el estado de emailNotFound
      setEmailNotFound(false);
      try {
        // Llamar a la API para resetear la contraseña
        const res = await apiResetPassword(data.email);
        if (res.status === 200) {
          // Si la respuesta es correcta, mostrar el modal de éxito
          setModalIsVisible(true);
        } else {
          console.log("Error al resetear la contraseña");
        }
      } catch (error) {
        console.error("Error de la API:", error);
      }
    } else {
      // Si no se encuentra el email, mostrar mensaje de error
      setEmailNotFound(true);
    }
  };

  const emailNow = watch("email");

  return (
    <>
      <div className="flex justify-center pt-6">
        <CardWhite className="max-w-[568px] w-full pt-12 p-6 gap-6">
          <div>
            <h2 className="font-medium text-[32px] text-[#192739]">
              ¿Olvidaste tu contraseña?
            </h2>
          </div>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2.5">
              <label className="text-[#1B2B41] text-opacity-70 text-lg font-semibold">
                Ingresa tu mail
              </label>
              <Input
                className="border-[#1C304A] border-opacity-50"
                type="text"
                {...register("email", { required: true })}
              />
              {emailNotFound && (
                <span className="text-error">
                  El email no se encuentra registrado
                </span>
              )}
            </div>
            <div className="w-full">
              <Button
                className="bg-[#006AF5] w-full text-white text-lg font-medium"
                type="submit"
              >
                Recuperar contraseña
              </Button>
            </div>
          </form>
        </CardWhite>
      </div>
      {
        // Mostrar modal de éxito si modalIsVisible es true
        modalIsVisible && (
          <ModalOk
            isOkVisible={modalIsVisible}
            setIsOkVisible={setModalIsVisible}
          >
            <span className="text-[#1B2B41] text-opacity-70 font-light">
              Se envió una contraseña al mail
            </span>
            <br />
            <span className="font-light text-[#005FDB]">{emailNow}</span>
          </ModalOk>
        )
      }
    </>
  );
}
