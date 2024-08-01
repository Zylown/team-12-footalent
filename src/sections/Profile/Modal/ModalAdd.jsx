import { useState } from 'react';
import CardWhite from '../../../components/CardWhite';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import reasonSchema from '../../../validations/addReason';
import ModalOk from '../../../components/ModalOk';
import { FiClock } from "react-icons/fi";
import DatePicker, { registerLocale } from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse, setHours, setMinutes, addMinutes , setSeconds} from "date-fns";
import es from "date-fns/locale/es"; // o cualquier otra localización que necesites

registerLocale("es", es); // Registrar la localización

const ModalAdd = ({ isVisible, setModalIsVisible }) => {
  const [modalOk, setModalOk] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(reasonSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setModalOk(true);
  };

  const handleCancel = () => {
    setModalIsVisible(false);
  };

  const generateTimes = () => {
    const times = [];
    let start = setHours(setMinutes(setSeconds(new Date(), 0), 0), 0); // Asegurarse de que los segundos sean 0
    let end = setHours(setMinutes(setSeconds(new Date(), 0), 0), 5); // Asegurarse de que los segundos sean 0
    while (start <= end) {
      times.push(start);
      start = addMinutes(start, 30);
    }
    return times;
  };

  return (
    isVisible && (
      <>
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <CardWhite className="w-[568px] bg-white pt-[48px] p-[24px]">
            <h2 className="text-2xl font-semibold text-[#192739] mb-6">
              Añadir Motivo
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Motivo *
                </label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Ingrese el motivo"
                  className="mt-1 block w-full"
                  {...register("description")}
                />
                {errors.description && <p className="text-error">{errors.description.message}</p>}
              </div>
              <div className="w-full relative">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Tiempo del Motivo *
                </label>
                <Controller
                  control={control}
                  name="time"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      className={`bg-[#F6FBFF] rounded-[4px] w-full border placeholder:text-[#1C3454] placeholder:text-opacity-25 placeholder:text-lg placeholder:font-normal ${
                        errors.time ? "border-red-600 border-2" : "border-[#193B67] border-opacity-15"
                      }`}
                      locale="es"
                      selected={field.value ? parse(field.value, "HH:mm", new Date()) : null}
                      timeCaption="Hora"
                      dateFormat="HH:mm"
                      showTimeSelectOnly
                      showTimeSelect
                      includeTimes={generateTimes()}
                      scrollableTimePicker={"00:00"}
                      onSelect={null}
                      minTime={setHours(setMinutes(new Date(), 0), 0)}
                      maxTime={setHours(setMinutes(new Date(), 0), 5)}
                      placeholderText="Seleccione hora"
                      onChange={(hour) => field.onChange(format(hour, "HH:mm"))}
                      customInput={
                        <div className="relative">
                          <input
                            type="text"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 p-1"
                            placeholder="Seleccione hora"
                            {...register("time")}
                            readOnly
                          />
                          <FiClock className="text-[#1B2B41] text-opacity-70 absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl" />
                        </div>
                      }
                    />
                  )}
                />
                {errors.time && <p className="text-error">{errors.time.message}</p>}
              </div>
              <div className="flex flex-col">
                <Button type="submit" className="flex bg-mainBlue items-center justify-center text-white px-4 py-2 rounded">
                  Añadir motivo
                </Button>
                <Button type="button" onClick={handleCancel} className="flex items-center justify-center text-mainBlue px-4 py-2 rounded">
                  Volver
                </Button>
              </div>
            </form>
          </CardWhite>
        </div>
        {modalOk && (
          <ModalOk isOkVisible={modalOk} setIsOkVisible={setModalOk}>
            Se añadió con éxito
          </ModalOk>
        )}
      </>
    )
  );
};

export default ModalAdd;

