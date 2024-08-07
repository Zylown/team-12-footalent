import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CardWhite from "../../../components/CardWhite";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/Button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import editShiftSchema from "../../../validations/editShift";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { format, parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ModalCancel from "../../../components/ModalCancel";
import { updateAppointment } from "/src/api/appointments/appointments-services";
import { Toaster, toast } from "react-hot-toast";

const locale = es;
registerLocale("es", locale);

// todo lo de este componente tiene que mostrar datos previos y poder modificarlos
export default function EditShift({
  isVisible,
  setModalModifyIsVisible,
  eventInfo,
  data,
  forceCalendarUpdate,
}) {
  //estados para manejar la fecha y la hora
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  //estado para cancelar turno y mostrar modal
  const [modalCancelIsVisible, setModalCancelIsVisible] = useState(false);

  const { control, setValue, register, handleSubmit } = useForm({
    resolver: zodResolver(editShiftSchema),
  });

  const SHIFT_ID = Number(eventInfo.id);
  useEffect(() => {
    if (eventInfo.extendedProps) {
      //setea la fecha
      const parsedDate = parse(
        eventInfo.extendedProps.date,
        "dd-MM-yyyy",
        new Date()
      );
      const formattedDate = format(parsedDate, "dd/MM/yyyy");
      setSelectedDate(parsedDate);
      setValue("date", formattedDate);
      //setea la hora

      const parsedHour = parse(
        eventInfo.extendedProps.time,
        "HH:mm",
        new Date()
      );
      setSelectedHour(parsedHour);
      setValue("hour", eventInfo.extendedProps.time);
      //setea el dentista
      setValue("odontologist", eventInfo.extendedProps.dentistId);
    }
  }, [eventInfo, setValue]);

  //boton guardar cambios
  const handleOnSubmit = async (data) => {
    try {
      //se le da formato correcto para hacer la peticion al back
      const dateFormatted = selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : "";
      const hourFormatted = selectedHour ? format(selectedHour, "HH:mm") : "";
      const dentistID = Number(data.odontologist);
      const reasonID = Number(data.reason);
      //const state = data.reminder ? "pending" : "confirmed";
      const selectedPatientID = eventInfo.extendedProps.patientId;

      //informacion formateada solicitada por el back
      const formData = {
        /* ...data, */
        patient_id: selectedPatientID,
        dentist_id: dentistID,
        reason_id: reasonID,
        date: dateFormatted,
        time: hourFormatted,
        is_active: data.reminder,
      };
      //peticion put
      const response = await updateAppointment({
        id: SHIFT_ID,
        data: formData,
      });
      if (response) {
        forceCalendarUpdate();
        toast.success("Turno modificado con éxito");
        setTimeout(() => {
          setModalModifyIsVisible(false);
        }, 600);
      }
    } catch (error) {
      console.error("Error al modificar el turno:", error);
      alert("No se pudo realizar el cambio. Por favor, intenta nuevamente.");
    }
  };

  //manejo de cancelar turno y mostrar modal
  const handleOnCancel = () => {
    setModalCancelIsVisible(true);
  };

  const handleOnClose = () => {
    setModalModifyIsVisible(false);
  };

  const handleDatePickerChange = (date) => {
    // aca se formatea la fecha para que se muestre en el input y podemos cambiar de formato
    const formattedDate = date ? format(date, "dd/MM/yyyy") : "";
    setValue("date", formattedDate);
    setSelectedDate(date);
  };

  const handleHourChange = (hour) => {
    // aca se formatea la hora para que se muestre en el input y podemos cambiar de formato
    const formattedHour = hour ? format(hour, "HH:mm") : "";
    setValue("hour", formattedHour);
    setSelectedHour(hour);
  };

  const handleDelete = () => {
    SHIFT_ID;
  };

  //parsear la fecha para que se muestre en el input
  const parsedDate = selectedDate
    ? parse(format(selectedDate, "dd/MM/yyyy"), "dd/MM/yyyy", new Date())
    : null;

  //parsear la hora para que se muestre en el input
  const parsedHour = selectedHour
    ? parse(format(selectedHour, "HH:mm"), "HH:mm", new Date())
    : null;

  return (
    isVisible && (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 bg-white bg-opacity-50">
          <CardWhite className="bg-white max-w-[568px] px-6 py-2 w-full relative sm:max-h-max max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="pb-5">
              <h2 className="sm:text-[32px] text-2xl font-semibold text-[#192739]">
                Modificar turno
              </h2>
            </div>
            <div className="flex flex-col gap-1 pb-4">
              <label className="font-semibold text-lg text-[#1B2B41] text-opacity-70">
                Paciente
              </label>
              <Button
                type="button"
                className="flex pl-3.5 pr-0 box-border max-w-[250px] w-full text-lg border border-[#005FDB] bg-[#F6FBFF] text-[#005FDB]"
              >
                <AiOutlineUserAdd className="mr-1 text-[#005FDB] text-2xl" />
                {eventInfo.title}
              </Button>
            </div>
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
                      defaultValue={""}
                      render={({ field }) => (
                        <DatePicker
                          className={`bg-[#F6FBFF] rounded-[4px] border-[#193B67] border-opacity-15 w-full border placeholder:text-[#1C3454] placeholder:text-opacity-25 placeholder:text-lg placeholder:font-normal`}
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
                      defaultValue={selectedHour}
                      render={({ field }) => (
                        <DatePicker
                          className={`bg-[#F6FBFF] rounded-[4px] w-full border placeholder:text-[#1C3454] placeholder:text-opacity-25 placeholder:text-lg placeholder:font-normal border-[#193B67] border-opacity-15`}
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
                          placeholderText={eventInfo.extendedProps.time}
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
                    className={`appearance-none cursor-pointer bg-[#F6FBFF] py-2 px-2.5 w-full rounded border border-[#193B67] border-opacity-15 text-[#193B67] text-opacity-50`}
                    {...register("reason")}
                  >
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
                    className={`appearance-none cursor-pointer bg-[#F6FBFF] py-2 px-2.5 w-full rounded border border-[#193B67] border-opacity-15 text-[#193B67] text-opacity-50`}
                    {...register("odontologist")}
                  >
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
              <div className="flex flex-col gap-2 sm:items-center sm:gap-1 sm:flex-row">
                <div className="flex items-center w-full gap-2 sm:w-2/4">
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
                <div className="flex w-full gap-2">
                  <Button
                    className="bg-white border border-[#E21D12] text-[#E21D12] font-semibold w-1/2"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#006AF5] text-white font-semibold w-1/2"
                  >
                    Guardar
                  </Button>
                </div>
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
        <Toaster position="top-right" />
      </>
    )
  );
}

EditShift.propTypes = {
  eventInfo: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setModalModifyIsVisible: PropTypes.func.isRequired,
  forceCalendarUpdate: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

