import PropTypes from "prop-types";
import { useState } from "react";
import CardWhite from "../../../components/CardWhite";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import addPatientSchema from "../../../validations/addPatient";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalOk from "../../../components/ModalOk";
import { postPatient } from "../../../api/patients/apiPatients";
export default function AddPatients({ isVisible, setModalIsVisible }) {
  const [modalOkIsVisible, setModalOkIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      birth_date: "",
      dni: "",
      email: "",
      phone_number: "",
      alternative_phone_number: " ",
    },
    resolver: zodResolver(addPatientSchema),
  });
  const convertToISODate = (date) => {
    const [day, month, year] = date.split("/").map(Number);
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  };
  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      birth_date: convertToISODate(data.birth_date), // Convertir a formato ISO 8601
      alternative_phone_number: data.alternative_phone_number || "NO", // Si no hay teléfono alternativo, enviar null
    };

    console.log(formattedData);
    // Llamar a la API para añadir un paciente
    try {
      const res = await postPatient(formattedData);
      console.log(res);
      if (res.status === 201) {
        setModalOkIsVisible(true);
        reset();
      } else {
        console.error("Error al añadir un paciente:", res);
      }
    } catch (error) {
      console.error("Error al añadir un paciente:", error);
    }
  };

  const handleOnCancel = () => {
    setModalIsVisible(false);
  };

  // Formatear la fecha de nacimiento en el input
  const formatBirthdate = (value) => {
    const cleanedValue = value.replace(/\D/g, ""); // Eliminar cualquier carácter no numérico
    let formattedValue = cleanedValue;
    if (cleanedValue.length >= 3 && cleanedValue.length <= 4) {
      formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    } else if (cleanedValue.length >= 5 && cleanedValue.length <= 6) {
      formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(
        2,
        4
      )}/${cleanedValue.slice(4)}`;
    } else if (cleanedValue.length > 6) {
      formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(
        2,
        4
      )}/${cleanedValue.slice(4, 8)}`;
    }
    return formattedValue;
  };

  // Para formatear la fecha de nacimiento mientras se escribe en el input
  const handleBirthdateChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatBirthdate(value);
    setValue("birth_date", formattedValue); // Actualizar el valor del input
  };

  return (
    isVisible && (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2">
          <CardWhite className="bg-white max-w-[568px] w-full p-6 relative sm:max-h-max max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="pb-6">
              <h2 className="sm:text-[32px] text-2xl font-semibold text-[#192739]">
                Añadir paciente
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
              <div className="flex-row flex sm:gap-6 gap-3 flex-wrap">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Nombre *
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
               placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
               ${errors.first_name && "border-red-600 border-2"}
               `}
                    type="text"
                    placeholder="Ingrese el nombre"
                    {...register("first_name", { required: true })}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Apellido *
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
               placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
                ${errors.last_name && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="Ingrese el apellido"
                    {...register("last_name", { required: true })}
                  />
                </div>
              </div>
              <div className="flex-row flex sm:gap-6 gap-3 flex-wrap">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Fecha de nacimiento *
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
               placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
               ${errors.birth_date && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="Seleccione fecha"
                    {...register("birth_date", { required: true })}
                    onChange={handleBirthdateChange}
                    value={watch("birth_date")}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    DNI *
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
               placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
               ${errors.dni && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="Ingrese el DNI"
                    {...register("dni", { required: true })}
                  />
                </div>
              </div>
              <div className="flex-row w-full flex gap-4">
                <div className="flex flex-col w-full gap-2">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Correo electrónico *
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
              <div className="flex-row flex sm:gap-6 gap-3 flex-wrap">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Teléfono 1 *
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
               placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
               ${errors.phone_number && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="ejemplo: 11 5585-2901"
                    {...register("phone_number", { required: true })}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Teléfono 2
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
               placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
               ${errors.alternative_phone_number && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="ejemplo: 11 5585-2901"
                    {...register("alternative_phone_number", {
                      required: false,
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <Button type="submit" className="bg-[#006AF5] text-white">
                  Añadir paciente
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
        {
          <ModalOk
            isOkVisible={modalOkIsVisible}
            setIsOkVisible={setModalOkIsVisible}
          >
            Se añadió un paciente con éxito
          </ModalOk>
        }
      </>
    )
  );
}

AddPatients.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setModalIsVisible: PropTypes.func.isRequired,
};
