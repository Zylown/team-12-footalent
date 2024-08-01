import CardWhite from "../../../components/CardWhite"
import Button from "../../../components/Button"
import InputPassword from "../../../components/InputPassWord"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import loginSchema from "../../../validations/login";
const ModalPassword = ({ isVisible, setModalIsVisible}) => {
   const handleCancel =()=>{
setModalIsVisible(false)
   }
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(loginSchema),
      });
      const onSubmit = (data)=>{
        console.log(data);
      }
  return (
    isVisible &&(
    <>
      <div className=" fixed inset-0 flex min-h-full  bg-black bg-opacity-50 flex-col justify-center px-6 py-6 z-50 lg:px-8">
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
                    htmlFor="password"
                    className="block text-lg font-medium leading-6 text-[#1B2B41] text-opacity-70"
                  >
                    Contraseña actual
                  </label>
                </div>
                <div>
                  <InputPassword
                    placeholder="Ingrese su contraseña"
                    className="block w-full border-[#1C304A] border-opacity-50"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-error">{errors.password.message}</p>
                    
                  )}
                  
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium leading-6 text-[#1B2B41] text-opacity-70"
                  >
                    Repita contraseña actual
                  </label>
                </div>
                <div>
                  <InputPassword
                    placeholder="Ingrese su contraseña"
                    className="block w-full border-[#1C304A] border-opacity-50"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-error">{errors.password.message}</p>
                    
                  )}
                
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium leading-6 text-[#1B2B41] text-opacity-70"
                  >
                    Nueva contraseña
                  </label>
                </div>
                <div>
                  <InputPassword
                    placeholder="Ingrese su contraseña"
                    className="block w-full border-[#1C304A] border-opacity-50"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-error">{errors.password.message}</p>
                    
                  )}
                  
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center justify-between">
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md px-6 bg-mainBlue py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-hoverBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Guardar Cambios
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="flex w-full justify-center rounded-md px-6 bg-white py-1.5 text-lg font-normal leading-6 text-textBlue"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </CardWhite>
      </div>
    </>)
  )
}

export default ModalPassword