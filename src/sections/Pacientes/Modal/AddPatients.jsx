import PropTypes from "prop-types";
import { useState } from "react";
import CardWhite from "../../../components/CardWhite";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import addPatientSchema from "../../../validations/addPatient";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalOk from "../../../components/ModalOk";
export default function AddPatients({ isVisible, setModalIsVisible }) {
  const [modalOkIsVisible, setModalOkIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addPatientSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setModalOkIsVisible(true);
    reset();
  };

  const handleOnCancel = () => {
    setModalIsVisible(false);
  };

  return (
    isVisible && (
      <>
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <CardWhite className="bg-white min-w-[568px] p-6">
            <div className="pb-6">
              <h2 className="text-[32px] font-semibold text-[#192739]">
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
              <div className="flex-row flex gap-6">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Fecha de nacimiento *
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
               placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
               ${errors.birthdate && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="Seleccione fecha"
                    {...register("birthdate", { required: true })}
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
              <div className="flex-row flex gap-6">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Teléfono 1 *
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
               placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
               ${errors.phone1 && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="ejemplo: 11 5585-2901"
                    {...register("phone1", { required: true })}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-65">
                    Teléfono 2
                  </label>
                  <Input
                    className={`bg-white placeholder:text-[#c4cbd3] 
               placeholder:text-lg placeholder:font-normal border border-[#DAE0E7] outline-none
               ${errors.phone2 && "border-red-600 border-2"}`}
                    type="text"
                    placeholder="ejemplo: 11 5585-2901"
                    {...register("phone2", { required: false })}
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
