import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { landingContactSchema } from "../../validations/landingContact";
import { toast, Toaster } from "react-hot-toast";
import { createMessage } from "../../api/support/apiSupport";

export default function LContact() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(landingContactSchema),
  });

  const onSubmit = async (data) => {
    try {
      // enviar data a la API
      const response = await createMessage(data);
      console.log(response);
      if (response.status === 201) {
        toast.success("Mensaje enviado correctamente");
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar el mensaje");
      return;
    }
  };

  return (
    <div className="bg-[#DBE5FF]">
      <div className="bg-[#143D72] flex justify-center py-[70px] border-b-2 rounded-tl-[20px] rounded-tr-[20px]">
        <form
          className="card__contact max-w-[544px] w-full flex flex-col rounded-lg pt-12 pb-6 px-6 gap-6"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 158, 220, 0.6) 9%, rgba(1, 73, 227, 0.6))",
          }}
        >
          <h2 className="text-start text-[#E6F7FF] font-medium text-[32px]">
            Contactanos
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 w-full sm:flex-row flex-col">
              <div className="flex flex-col gap-2.5 sm:w-2/4">
                <label className="text-[#E6F7FF] font-semibold text-lg">
                  Nombre
                </label>
                <input
                  className="px-2.5 py-2 rounded border border-[#1C304A] border-opacity-50 outline-none"
                  type="text"
                  placeholder="Ingrese su nombre"
                  {...register("first_name")}
                />
                {errors.first_name && (
                  <span className="text-error text-base font-medium">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2.5 sm:w-2/4">
                <label className="text-[#E6F7FF] font-semibold text-lg">
                  Apellido (opcional)
                </label>
                <input
                  className="px-2.5 py-2 rounded border border-[#1C304A] border-opacity-50 outline-none"
                  type="text"
                  placeholder="Ingrese su apellido"
                  {...register("last_name")}
                />
                {errors.last_name && (
                  <span className="text-error text-base font-medium">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[#E6F7FF] font-semibold text-lg">
                Correo electrónico
              </label>
              <input
                className="px-2.5 py-2 rounded border border-[#1C304A] border-opacity-50 outline-none"
                type="email"
                placeholder="Ingrese su correo electrónico"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-error text-base font-medium">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[#E6F7FF] font-semibold text-lg">
                Teléfono
              </label>
              <input
                className="px-2.5 py-2 rounded border border-[#1C304A] border-opacity-50 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                placeholder="Ingrese su número de teléfono"
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <span className="text-error text-base font-medium">
                  {errors.phone_number.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[#E6F7FF] font-semibold text-lg">
                Mensaje (opcional)
              </label>
              <textarea
                className="px-2.5 py-2 rounded border border-[#1C304A] border-opacity-50 max-h-[82px] h-full outline-none"
                placeholder="Escriba un mensaje..."
                rows="4"
                {...register("issue_detail")}
              />
              {errors.issue_detail && (
                <span className="text-error text-base font-medium">
                  {errors.issue_detail.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <button
                className="bg-[#006AF5] text-white w-full px-[14px] py-3 rounded text-lg font-medium hover:opacity-70 transition-all"
                type="submit"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
