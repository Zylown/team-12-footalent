import PropTypes from "prop-types";
import CardWhite from "../../../components/CardWhite";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import soporteSchema from "../../../validations/soporte";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from 'react-dropzone';

const Soporte = ({isVisible, setModalIsVisible}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(soporteSchema),
      });

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
          'image/*': [] // Solo acepta imágenes
        },
        onDrop: acceptedFiles => {
          setValue("photo", acceptedFiles[0]);
        }
      });
    
      const onSubmit = (data) => {
        console.log(data);
      };
    
      const handleOnCancel = () => {
        setModalIsVisible(false);
      };
  return (
    isVisible && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <CardWhite className="bg-white min-w-[568px] p-6">
            <div className="pb-6">
              <h2 className="text-[32px] font-semibold text-[#192739]">
                Soporte
              </h2>
            </div>
            {Object.keys(errors).length > 0 && (
              <p className="text-red-600 text-sm font-normal">
                {"Estos campos son requeridos"}
              </p>
            )}
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-row flex gap-6">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Nombre *
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
                 placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
                 ${errors.name && "border-red-600 border-2"}
                 `}
                    type="text"
                    placeholder="Ingrese el nombre"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Apellido *
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
                 placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
                  ${errors.lastName && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="Ingrese el apellido"
                    {...register("lastName", { required: true })}
                  />
                </div>
              </div>
              
              <div className="flex-row w-full flex gap-4">
                <div className="flex flex-col w-full gap-2">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Correo electrónico 
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
                 placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
                 ${errors.email && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="Ingrese el correo electrónico"
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className="flex-row w-full flex gap-4">
                <div className="flex flex-col w-full gap-2">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Detalles del problema * 
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
                 placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none 
                 ${errors.details && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="Por favor, bríndenos con detalles sobre su problema y lo solucionaremos. Muchas gracias!"
                    {...register("details", { required: true })}
                  />
                </div>
              </div>
              
              <div className="flex flex-col w-full">
              <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                Adjuntar imágenes
              </label>
              <div
                {...getRootProps({ className: 'dropzone border border-dashed rounded-lg border-gray-300 p-4 text-center cursor-pointer' })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-gray-500">Suelta la foto aquí...</p>
                ) : (
                  <div>
                    <p className="text-gray-500">Arrastra una foto aquí, o haz clic para seleccionar</p>
                  </div>
                )}
              </div>
            </div>

              <div className="flex flex-col w-full">
                <Button type="submit" className="bg-[#006AF5] text-white">
                 Enviar
                </Button>
                <Button
                  type="button"
                  className="bg-white text-[#006AF5] font-light"
                  onClick={handleOnCancel}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardWhite>
        </div>
      )
  )
}

export default Soporte

Soporte.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    setModalIsVisible: PropTypes.func.isRequired,
  };