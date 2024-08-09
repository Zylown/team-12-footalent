import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWhite from "../../../components/CardWhite";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import soporteSchema from "../../../validations/soporte";
import { createMessage } from "../../../api/support/apiSupport";
import { Toaster, toast } from "react-hot-toast";

const Soporte = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(soporteSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await createMessage(data);
      if (response.status === 201) {
        toast.success("Mensaje enviado con éxito");
        setTimeout(() => {
          window.location.href = "/perfil";
        }, 500);
      }
    } catch (error) {
      setErrorMessage("Error al enviar el mensaje. Inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnCancel = () => {
    // Lógica para manejar la cancelación si es necesario
  };

  return (
    <div className="flex justify-center items-center pt-4 px-2">
      <CardWhite className="sm:gap-5 gap-2 max-w-[568px] w-full sm:px-6 px-4 py-4">
        <div className="pb-6">
          <h2 className="text-[32px] font-semibold text-[#192739]">Soporte</h2>
        </div>
        {Object.keys(errors).length > 0 && (
          <p className="text-red-600 text-sm font-normal">Estos campos son requeridos</p>
        )}
        {successMessage && <p className="text-green-600 text-sm font-normal">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-sm font-normal">{errorMessage}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col gap-2 w-full sm:flex-1">
              <label htmlFor="first_name" className="font-semibold text-lg text-[#1B2B41] text-opacity-65">Nombre *</label>
              <Input
                className={`bg-white placeholder:text-[#c4cbd3] placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none ${errors.first_name ? "border-red-600 border-2" : ""}`}
                type="text"
                placeholder="Ingrese el nombre"
                {...register("first_name")}
              />
            </div>
            <div className="flex flex-col gap-2 w-full sm:flex-1">
              <label htmlFor="last_name" className="font-semibold text-lg text-[#1B2B41] text-opacity-65">Apellido *</label>
              <Input
                className={`bg-white placeholder:text-[#c4cbd3] placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none ${errors.last_name ? "border-red-600 border-2" : ""}`}
                type="text"
                placeholder="Ingrese el apellido"
                {...register("last_name")}
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="font-semibold text-lg text-[#1B2B41] text-opacity-65">Correo electrónico *</label>
            <Input
              className={`bg-white placeholder:text-[#c4cbd3] placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none ${errors.email ? "border-red-600 border-2" : ""}`}
              type="text"
              placeholder="Ingrese el correo electrónico"
              {...register("email")}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="issue_detail" className="font-semibold text-lg text-[#1B2B41] text-opacity-65">Detalles del problema *</label>
            <Input
              className={`bg-white placeholder:text-[#c4cbd3] placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none ${errors.issue_detail ? "border-red-600 border-2" : ""}`}
              type="text"
              placeholder="Por favor, bríndenos con detalles sobre su problema y lo solucionaremos. Muchas gracias!"
              {...register("issue_detail")}
            />
          </div>

          <div className="flex flex-col w-full">
            <Button type="submit" className="bg-[#006AF5] text-white" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar"}
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
      <Toaster position="top-right" />
    </div>
  );
}

export default Soporte;
