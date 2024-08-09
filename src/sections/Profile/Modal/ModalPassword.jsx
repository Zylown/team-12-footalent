import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWhite from "../../../components/CardWhite";
import Button from "../../../components/Button";
import InputPassword from "../../../components/InputPassWord";
import { Link } from "react-router-dom";
import passwordSchema from "../../../validations/changePassword";
import ModalOk from "../../../components/ModalOk";
import { apiChangePassword } from "../../../api/apiLogin";
import { useDecode } from "../../../hooks/useDecode";
import { Toaster, toast } from "react-hot-toast";
const ModalPassword = () => {
  const [modalOk, setModalOk] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = useMemo(() => {
    try {
      return useDecode(token);
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  }, [token]);
  const userId = decodedToken?.user_id; 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiChangePassword(userId, data);
      if (response.status === 200) {
        toast.success("La contraseña se cambió con éxito");
        setTimeout(() => {
          window.location.href = "/perfil";
        }, 500);}
    } catch (error) {
      setErrorMessage(error.message || "Failed to change password");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 z-50 lg:px-8">
        <CardWhite className="sm:mx-auto bg-white sm:w-full sm:max-w-md px-6 pt-12 pb-6 rounded-lg gap-[34px]">
          <div className="sm:w-full">
            <h2 className="text-start text-[32px] font-medium leading-9 tracking-tight text-gray-900">
              Cambiar contraseña
            </h2>
          </div>

          <div className="sm:w-full">
            <form
              className="space-y-6"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="old_password"
                    className="block text-lg font-medium leading-6 text-[#1B2B41] text-opacity-70"
                  >
                    Contraseña actual
                  </label>
                </div>
                <div>
                  <InputPassword
                    placeholder="Ingrese su contraseña actual"
                    className="block w-full border-[#1C304A] border-opacity-50"
                    {...register("old_password")}
                  />
                  {errors.old_password && (
                    <p className="text-error">{errors.old_password.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="new_password"
                    className="block text-lg font-medium leading-6 text-[#1B2B41] text-opacity-70"
                  >
                    Nueva contraseña
                  </label>
                </div>
                <div>
                  <InputPassword
                    placeholder="Ingrese su nueva contraseña"
                    className="block w-full border-[#1C304A] border-opacity-50"
                    {...register("new_password")}
                  />
                  {errors.new_password && (
                    <p className="text-error">{errors.new_password.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm_password"
                    className="block text-lg font-medium leading-6 text-[#1B2B41] text-opacity-70"
                  >
                    Confirme la nueva contraseña
                  </label>
                </div>
                <div>
                  <InputPassword
                    placeholder="Confirme su nueva contraseña"
                    className="block w-full border-[#1C304A] border-opacity-50"
                    {...register("confirm_password")}
                  />
                  {errors.confirm_password && (
                    <p className="text-error">{errors.confirm_password.message}</p>
                  )}
                </div>
              </div>

              {errorMessage && (
                <p className="text-error">{errorMessage}</p>
              )}

              <div className="flex flex-col gap-2 items-center justify-between">
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md px-6 bg-mainBlue py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-hoverBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Guardar Cambios
                </Button>
                <Link
                  to="/perfil"
                  className="flex w-full justify-center rounded-md px-6 bg-white py-1.5 text-lg font-normal leading-6 text-textBlue"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </CardWhite>
      </div>
      {modalOk && (
        <ModalOk isOkVisible={modalOk} setIsOkVisible={setModalOk}>
          Contraseña cambiada con éxito
        </ModalOk>
      )}
      <Toaster position="top-right" />
    </>
  );
};

export default ModalPassword;
