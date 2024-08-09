import { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import CardWhite from "../../../components/CardWhite";
import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import editClinicalSchema from "../../../validations/editClinical";

export default function EditClinical({
  isVisible,
  setIsVisible,
  valueData,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editClinicalSchema),
  });

  useEffect(() => {
    setValue("data", valueData.data);
    setValue("description", valueData.description);
    // limpíar el campo de descripcion luego de cerrar el modal
    return () => {
      setValue("description", "");
    };
  }, [valueData, setValue]);
  // const onSubmit = (data) => {
  //   console.log(data);
  //   setIsVisible(false);
  // };

  const handleBack = () => {
    setIsVisible(false);
  };

  const valueInputSpanish =
    (valueData.data === "name" && "Nombre") ||
    (valueData.data === "address" && "Dirección") ||
    (valueData.data === "phone_number" && "Teléfono") ||
    (valueData.data === "email" && "Correo Electrónico") ||
    (valueData.data === "opening_hours" && "Hora de Apertura") ||
    (valueData.data === "closing_hours" && "Hora de Cierre");

  return (
    isVisible && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 sm:p-0 p-2">
        <CardWhite className="max-w-[568px] w-full bg-white gap-6 pt-12 p-6">
          <div>
            <h2 className="text-[32px] font-medium text-[#192434]">
              Editar información
            </h2>
          </div>
          <form
            className="flex flex-col gap-6"
            // ese onSubmit pasa 1 porque es el id, pero de manera hardcodeada (hasta que sepa como manejarlo)
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <div className="flex flex-col gap-2.5">
              <label className="font-semibold text-lg text-[#1B2B41] text-opacity-70">
                Dato *
              </label>
              <Input
                className="border border-[#1C304A] border-opacity-50"
                type="text"
                placeholder="Dato"
                value={valueInputSpanish}
                disabled
              />
              <input
                type="hidden"
                {...register("data")}
                value={valueData.data}
              />

              {errors.data && (
                <p className="text-error">{errors.data.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="font-semibold text-lg text-[#1B2B41] text-opacity-70">
                Descripción *
              </label>
              <Input
                className="border border-[#1C304A] border-opacity-50"
                type="text"
                placeholder="Ingrese una descripción"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-error">{errors.description.message}</p>
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <Button
                className="bg-[#006AF5] text-white font-semibold text-lg"
                type="submit"
              >
                Guardar
              </Button>
              <Button
                className="font-normal text-lg text-[#006AF5]"
                type="button"
                onClick={handleBack}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardWhite>
      </div>
    )
  );
}

EditClinical.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  valueData: PropTypes.shape({
    data: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
