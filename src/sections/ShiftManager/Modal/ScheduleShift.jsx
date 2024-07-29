import PropTypes from "prop-types";
import { useState } from "react";
import CardWhite from "../../../components/CardWhite";
import { useForm, Controller } from "react-hook-form"; // controller sirve para manejar inputs que no son nativos de html
import { zodResolver } from "@hookform/resolvers/zod";
import addShiftSchema from "../../../validations/addShift";
import Button from "../../../components/Button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { format, parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ModalCancel from "../../../components/ModalCancel";
import PatientsModal from "./AddPatients/AddPatientsModal";

const locale = es;
registerLocale("es", locale);

export default function ScheduleShift({ isVisible, setModalShiftIsVisible }) {
  // estado para manejar el paciente seleccionado
  const [selectedPatient, setSelectedPatient] = useState(null);
  //estados para manejar la fecha y la hora
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  //estado para cancelar turno y mostrar modal
  const [modalCancelIsVisible, setModalCancelIsVisible] = useState(false);
  //estado para mostrar el modal de agregar paciente
  const [modalAddPatientVisible, setModalAddPatientVisible] = useState(false);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addShiftSchema),
  });

  const handleOnSubmit = (data) => {
    const dateFormatted = format(selectedDate, "yyyy-MM-dd");
    const hourFormatted = format(selectedHour, "HH:mm:ss");

    const formData = {
      ...data,
      title: selectedPatient,
      // formatear la fecha y la hora para que se envie en el formato correcto
      /* date: dateFormatted,
      hour: hourFormatted, */
      startStr: dateFormatted + "T" + hourFormatted,
      endStr: dateFormatted + "T" + hourFormatted,
    };
    console.log(formData);
    /*calendarApi.addEvent({
      id: nowStr,
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      color: "#ef4444",
    }); */
  };

  //manejo de cancelar turno y mostrar modal
  const handleOnCancel = () => {
    setModalCancelIsVisible(true);
  };

  const handleOnClose = () => {
    setModalShiftIsVisible(false);
  };

  // Función para manejar la selección de paciente
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setModalAddPatientVisible(false); //cerrar modal de agregar paciente
  };

  const handleDatePickerChange = (date) => {
    // aca se formatea la fecha para que se muestre en el input y podemos cambiar de formato
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    setValue("date", formattedDate);
    setSelectedDate(date);
  };

  const handleHourChange = (hour) => {
    // aca se formatea la hora para que se muestre en el input y podemos cambiar de formato
    const formattedHour = hour ? format(hour, "HH:mm:ss") : "";
    setValue("hour", formattedHour);
    setSelectedHour(hour);
  };

  //parsear la fecha para que se muestre en el input
  const parsedDate = selectedDate
    ? parse(format(selectedDate, "yyyy-MM-dd"), "yyyy-MM-dd", new Date())
    : null;

  //parsear la hora para que se muestre en el input
  const parsedHour = selectedHour
    ? parse(format(selectedHour, "HH:mm:ss"), "HH:mm:ss", new Date())
    : null;

  return (
    isVisible && (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <CardWhite className="bg-white min-w-[568px] px-6 py-2">
            <div className="pb-5">
              <h2 className="text-[32px] font-semibold text-[#192739]">
                Agendar turno
              </h2>
            </div>
            <div className="flex flex-col gap-1 pb-4">
              <label className="font-semibold text-lg text-[#1B2B41] text-opacity-70">
                Paciente
              </label>
              {/* esto te lleva a otro modal para seleccionar el paciente */}
              <Button
                type="button"
                className="flex pl-3.5 pr-0 box-border w-[250px] text-lg border border-[#005FDB] bg-[#F6FBFF] text-[#005FDB]"
                onClick={() => setModalAddPatientVisible(true)}
              >
                <AiOutlineUserAdd className="mr-1 text-[#005FDB] text-2xl" />
                {selectedPatient ? selectedPatient : "Seleccionar paciente"}
              </Button>
            </div>
            {/* mostrar solo 1 mensaje de campos invalidos*/}
            {Object.keys(errors).length > 0 && (
              <p className="text-sm font-normal text-red-600">
                {"Estos campos son requeridos"}
              </p>
            )}
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              <div className="flex w-full gap-5">
                <div className="flex flex-col w-2/4">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-70">
                    Fecha *
                  </label>
                  <div className="relative w-full">
                    <Controller
                      control={control}
                      name="date"
                      render={({ field }) => (
                        <DatePicker
                          className={`bg-[#F6FBFF] rounded-[4px] w-full border placeholder:text-[#1C3454] placeholder:text-opacity-25 placeholder:text-lg placeholder:font-normal ${
                            errors.date
                              ? "border-red-600 border-2"
                              : "border-[#193B67] border-opacity-15"
                          }`}
                          icon={
                            <FiCalendar className="text-[#1B2B41] text-opacity-70 absolute right-0 pointer-events-none top-1/2 transform -translate-y-1/2 text-2xl" />
                          }
                          selected={
                            field.value
                              ? parse(field.value, "dd/MM/yyyy", new Date())
                              : parsedDate
                          }
                          onChange={(date) => {
                            handleDatePickerChange(date);
                            field.onChange(format(date, "dd/MM/yyyy")); // para cambie el valor del input
                          }}
                          dateFormat={"dd/MM/yyyy"}
                          showIcon={true}
                          minDate={new Date()}
                          locale={locale}
                          placeholderText="Seleccione fecha"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-2/4">
                  <label className="font-semibold text-lg text-[#1B2B41] text-opacity-70">
                    Horario *
                  </label>
                  <div className="relative w-full">
                    <Controller
                      control={control}
                      name="hour"
                      render={({ field }) => (
                        <DatePicker
                          className={`bg-[#F6FBFF] rounded-[4px] w-full border placeholder:text-[#1C3454] placeholder:text-opacity-25 placeholder:text-lg placeholder:font-normal ${
                            errors.hour
                              ? "border-red-600 border-2"
                              : "border-[#193B67] border-opacity-15"
                          }`}
                          locale={locale}
                          selected={
                            field.value
                              ? parse(field.value, "HH:mm", new Date())
                              : parsedHour
                          }
                          timeCaption="Hora"
                          dateFormat="HH:mm"
                          showTimeSelectOnly
                          showTimeSelect
                          timeIntervals={15}
                          showIcon={true}
                          icon={
                            <FiClock className="text-[#1B2B41] text-opacity-70 absolute right-0 pointer-events-none top-1/2 transform -translate-y-1/2 text-2xl" />
                          }
                          placeholderText="Seleccione hora"
                          onChange={(hour) => {
                            handleHourChange(hour);
                            field.onChange(format(hour, "HH:mm")); // para cambie el valor del input
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-lg text-[#1B2B41] text-opacity-70">
                  Motivo de la consulta
                </label>
                <div className="relative">
                  <select
                    className={`appearance-none cursor-pointer bg-[#F6FBFF] py-2 px-2.5 w-full rounded border text-[#193B67] text-opacity-50 ${
                      errors.reason
                        ? "border-red-600 border-2"
                        : "border-[#193B67] border-opacity-15"
                    }`}
                    {...register("reason", { required: true })}
                  >
                    <option value="">Seleccione el motivo</option>
                    <option value="01:00:00">Extracción de molares</option>
                    <option value="00:30:00">Consulta general</option>
                    <option value="00:30:00">Control bucal</option>
                    <option value="01:00:00">Tratamiento Conducto</option>
                  </select>
                  <FaChevronDown className="text-[#1B2B41] text-opacity-70 absolute right-0 pointer-events-none top-1/2 transform -translate-y-1/2 mr-2.5" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-lg text-[#1B2B41] text-opacity-70">
                  Odontólogo
                </label>
                <div className="relative">
                  <select
                    className={`appearance-none cursor-pointer bg-[#F6FBFF] py-2 px-2.5 w-full rounded border text-[#193B67] text-opacity-50 ${
                      errors.odontologist
                        ? "border-red-600 border-2"
                        : "border-[#193B67] border-opacity-15"
                    }`}
                    {...register("odontologist", { required: true })}
                  >
                    <option value="">Seleccione el odontólogo</option>
                    <option value="1">Opcion 1</option>
                    <option value="2">Opcion 2</option>
                    <option value="3">Opcion 3</option>
                  </select>
                  <FaChevronDown className="text-[#1B2B41] text-opacity-70 absolute right-0 pointer-events-none top-1/2 transform -translate-y-1/2 mr-2.5" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center w-2/4 gap-2">
                  <input
                    className="w-6 h-6 bg-[#193B67] bg-opacity-15"
                    type="checkbox"
                    {...register("reminder")}
                  />
                  <label className="text-[#192739] text-opacity-95 text-lg font-normal">
                    Recordatorio automático
                  </label>
                </div>
                <div className="flex-1">
                  {/* esto te lleva a otro modal para editar*/}
                  <Button
                    type="button"
                    className="w-full justify-center flex font-light text-lg border border-[#C3D4FF] bg-[#F6FBFF] text-[#005FDB]"
                  >
                    Editar recordatorio
                  </Button>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Button
                  type="submit"
                  className="bg-[#006AF5] text-white font-semibold"
                >
                  Agendar
                </Button>
                <Button
                  className="bg-white text-[#006AF5] font-normal"
                  type="button"
                  onClick={handleOnCancel}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardWhite>
        </div>
        <ModalCancel
          isVisible={modalCancelIsVisible}
          setIsVisible={setModalCancelIsVisible}
          cancelModal={handleOnClose}
        />
        {modalAddPatientVisible && (
          <PatientsModal onSelectPatient={handleSelectPatient} />
        )}
      </>
    )
  );
}

ScheduleShift.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setModalShiftIsVisible: PropTypes.func.isRequired,
};

