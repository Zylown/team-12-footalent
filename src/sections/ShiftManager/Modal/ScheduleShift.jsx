import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CardWhite from "../../../components/CardWhite";
import { useForm, Controller } from "react-hook-form"; // controller sirve para manejar inputs que no son nativos de html
import { zodResolver } from "@hookform/resolvers/zod";
import addShiftSchema from "../../../validations/addShift";
import Button from "../../../components/Button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiCalendar, FiClock } from "react-icons/fi";
import { FaChevronDown, FaRegEdit } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { format, parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ModalCancel from "../../../components/ModalCancel";
import PatientsModal from "./AddPatients/AddPatientsModal";
import { createAppointment } from "/src/api/appointments/appointments-services";
import { Toaster, toast } from "react-hot-toast";
import EditReminder from "./EditReminder";
import TimeReminderPicker from "/src/components/TimeReminderPicker";

const locale = es;
registerLocale("es", locale);

export default function ScheduleShift({
  isVisible,
  setModalShiftIsVisible,
  data,
  forceCalendarUpdate,
  dateSelected,
}) {
  // estado para manejar el paciente seleccionado
  const [selectedPatient, setSelectedPatient] = useState(null);
  //estados para manejar la fecha y la hora
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  //estado para cancelar turno y mostrar modal
  const [modalCancelIsVisible, setModalCancelIsVisible] = useState(false);
  //estado para mostrar el modal de agregar paciente
  const [modalAddPatientVisible, setModalAddPatientVisible] = useState(false);
  // estado para mostrar el modal de editar recordatorio
  const [modalReminder, setModalReminder] = useState(false);
  const [timeReminder, setTimeReminder] = useState(24);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addShiftSchema),
  });

  useEffect(() => {
    //En caso de que se quiera agregar turno desde el calendario este traera un horario y fecha del lugar donde se clickeo.
    //Aca se cargar esos datos en el modal.
    if (dateSelected) {
      const startStr = dateSelected.startStr;

      const startDate = parse(startStr, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date());
      const parsedDate = format(startDate, "dd-MM-yyyy");
      const parsedHour = format(startDate, "HH:mm");

      //setea la fecha
      const formattedDate = format(parsedDate, "dd/MM/yyyy");
      setSelectedDate(parsedDate);
      setValue("date", formattedDate);

      //setea la hora
      const formattedTime = parse(parsedHour, "HH:mm", new Date());
      console.log("formattedTime", formattedTime);

      setSelectedHour(formattedTime);
      setValue("hour", parsedHour);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateSelected]);

  const handleOnSubmit = async (data) => {
    try {
      const dateFormatted = format(selectedDate, "yyyy-MM-dd");
      const hourFormatted = format(selectedHour, "HH:mm");
      const dentistID = Number(data.odontologist);
      const reasonID = Number(data.reason);
      const selectedPatientID = Number(selectedPatient.id);

      const formData = {
        patient_id: selectedPatientID,
        dentist_id: dentistID,
        reason_id: reasonID,
        date: dateFormatted,
        time: hourFormatted,
        anticipation_time: timeReminder,
        is_active: data.reminder,
      };
      console.log("formData", formData);
      const response = await createAppointment({
        data: formData,
      });
      if (response) {
        toast.success("Turno creado con éxito");
        forceCalendarUpdate();
        setTimeout(() => {
          setModalShiftIsVisible(false);
        }, 600);
      }
    } catch (error) {
      console.error("Error al crear el turno:", error);
      if (error.response.data.error === "Appointment slot already taken") {
        return toast.error("Ups, este horario ya está ocupado por otro turno.");
      }
      toast.error(
        "No se pudo realizar el cambio. Por favor, intenta nuevamente."
      );
    }
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

  //Funcion para manejar que se muestre el modal de recordatorio
  const handleReminder = () => {
    setModalReminder(true);
  };

  return (
    isVisible && (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 bg-white bg-opacity-50">
          <CardWhite className="bg-white max-w-[568px] p-6 pt-12 w-full relative sm:max-h-max max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="pb-5">
              <h2 className="sm:text-[32px] text-2xl font-semibold text-[#192739]">
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
                className="flex pl-3.5 pr-0 box-border max-w-[250px] w-full text-lg border border-[#005FDB] bg-[#F6FBFF] text-[#005FDB]"
                onClick={() => setModalAddPatientVisible(true)}
              >
                <AiOutlineUserAdd className="mr-1 text-[#005FDB] text-2xl" />
                {selectedPatient
                  ? selectedPatient.patient
                  : "Seleccionar paciente"}
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
              <div className="flex flex-col w-full gap-5 sm:flex-row">
                <div className="flex flex-col w-full sm:w-2/4">
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
                <div className="flex flex-col w-full sm:w-2/4">
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
                    <option value="" disabled hidden>
                      Seleccione el motivo
                    </option>
                    {data.reasons &&
                      data.reasons.map((reason) => (
                        <option key={reason.id} value={Number(reason.id)}>
                          {reason.description}
                        </option>
                      ))}
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
                    {data.dentists &&
                      data.dentists.map((dentist) => (
                        <option key={dentist.id} value={dentist.id}>
                          {dentist.first_name}
                          {dentist.last_name}
                        </option>
                      ))}
                  </select>
                  <FaChevronDown className="text-[#1B2B41] text-opacity-70 absolute right-0 pointer-events-none top-1/2 transform -translate-y-1/2 mr-2.5" />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:items-start sm:items-center sm:gap-1">
                <label
                  htmlFor="anticipation"
                  className="font-semibold text-lg text-[#1B2B41] text-opacity-70"
                >
                  Recordatorio
                </label>
                <div className="flex flex-col items-center justify-between w-full gap-5 mb-1 md:flex-row">
                  <div className="flex items-center order-2 w-full gap-2 md:order-none sm:w-2/4">
                    <label className="inline-flex items-center text-[#192739] text-opacity-95 text-base font-normal text-nowrap select-none">
                      <input
                        className="w-6 h-6 bg-[#193B67] bg-opacity-15 mr-2"
                        type="checkbox"
                        {...register("reminder")}
                      />
                      Envio automático
                    </label>
                  </div>
                  <div className="flex items-center justify-between w-full gap-2 md:justify-end">
                    {/* esto te lleva a otro modal para editar*/}
                    <div className="flex-1 md:flex-none">
                      <TimeReminderPicker setTimeReminder={setTimeReminder} />
                    </div>
                    <button
                      type="button"
                      onClick={handleReminder}
                      className="p-2"
                    >
                      <FaRegEdit className="w-6 h-6" />
                    </button>
                  </div>
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
          <PatientsModal
            onSelectPatient={handleSelectPatient}
            closeModal={() => setModalAddPatientVisible(false)}
          />
        )}
        {modalReminder && (
          <EditReminder
            isVisible={modalReminder}
            setModalIsVisible={setModalReminder}
          />
        )}
        <Toaster position="top-right" />
      </>
    )
  );
}

ScheduleShift.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  data: PropTypes.object,
  dateSelected: PropTypes.object,
  setModalShiftIsVisible: PropTypes.func.isRequired,
  forceCalendarUpdate: PropTypes.func.isRequired,
};

