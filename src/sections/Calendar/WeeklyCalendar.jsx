import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import EditShift from "../ShiftManager/Modal/EditShift";
import EventsContent from "./EventsContent";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function WeeklyCalendar({
  eventsDB,
  dateSelected,
  setModalModifyIsVisible,
  modalModifyIsVisible,
  data,
}) {
  const [calendarApis, setCalendarApis] = useState(null);
  const [contentHeight, setContentHeight] = useState(600);
  const [eventClickInfo, setEventClickInfo] = useState([]);

  //console.log("Calendario", eventsDB);

  const adjustContentHeight = () => {
    const height = window.innerHeight;
    if (height < 680) {
      setContentHeight(420); // Altura para pantallas pequeñas
    } else if (height < 768) {
      setContentHeight(550); // Altura para pantallas medianas
    } else {
      setContentHeight(600); // Altura para pantallas grandes
    }
  };

  useEffect(() => {
    // Ajusta la altura inicialmente
    adjustContentHeight();

    // Agrega un listener para el evento resize
    window.addEventListener("resize", adjustContentHeight);

    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", adjustContentHeight);
    };
  }, []);

  //Dirije hacie la vista diaria segun la fecha seleccionada en el MiniCalendar
  useEffect(() => {
    if (calendarApis && dateSelected) {
      //calendarApis.gotoDate(dateSelected);
      calendarApis.changeView("timeGridDay", dateSelected);
    }
  }, [calendarApis, dateSelected]);

  const handleDatesSet = useCallback((arg) => {
    setCalendarApis(arg.view.calendar);
  }, []);

  //funcion para añadir eventos
  function handleDateSelect(selectInfo) {
    let title = prompt("Alerta");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        //id: nowStr,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo) {
    setModalModifyIsVisible(true);
    /* console.log("evento clickeado", clickInfo.event); */
    setEventClickInfo(clickInfo.event);
    /* if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      console.log("evento clickeado", clickInfo.event);
      clickInfo.event.remove();
    } */
  }

  if (!eventsDB) {
    return (
      <>
        <img
          src="/assets/wallpaper.jpg"
          alt="wallpaper"
          className="relative flex justify-center object-fill overflow-hidden rounded-sm opacity-50"
        />
        <div className="absolute z-10 p-10 bg-white rounded-lg left-96 top-52 opacity-90">
          <div>
            <h1 className="text-lg text-textBlue">
              Por favor seleccione un dentista para continuar
            </h1>
            <br />
            <ul className="flex flex-col p-2 text-gray-600 rounded-lg">
              <div className="inline-flex items-center gap-1 text-gray-600">
                <IoMdInformationCircleOutline />
                <h2>Info</h2>
              </div>
              <p>Los colores muestran el estado del turno:</p>
              <li className="inline-flex items-center py-1">
                <div className="w-2.5 h-2.5 mr-1 rounded-full items-center bg-[#FF9900]"></div>
                <p className="me-2 text-nowrap">Pendiente</p>
              </li>
              <li className="inline-flex items-center py-1">
                <div className="w-2.5 h-2.5 mr-1 rounded-full items-center bg-[#FF0000]"></div>
                <p className="me-2 text-nowrap">Ausente</p>
              </li>
              <li className="inline-flex items-center py-1">
                <div className="w-2.5 h-2.5 mr-1 rounded-full items-center bg-[#006AF5]"></div>
                <p className="me-2 text-nowrap">Confirmado</p>
              </li>
              <li className="inline-flex items-center py-1">
                <div className="w-2.5 h-2.5 mr-1 rounded-full items-center bg-[#AD00FF]"></div>
                <p className="me-2 text-nowrap">Reprogramar</p>
              </li>
              <li className="inline-flex items-center py-1">
                <div className="w-2.5 h-2.5 mr-1 rounded-full items-center bg-[#34C759]"></div>
                <p className="me-2 text-nowrap">Presente</p>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            locale={esLocale}
            plugins={[timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={false}
            /* events */
            events={eventsDB}
            select={handleDateSelect}
            eventContent={(eventInfo) => (
              <EventsContent eventInfo={eventInfo} />
            )} // custom render function
            eventClick={handleEventClick}
            eventOverlap={false}
            //eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}          
            */
            //dateClick={handleDateClick}
            datesSet={handleDatesSet}
            //CONFIGURACION PARA LAS CELDAS
            slotDuration="00:30:00"
            slotMinTime="08:00:00"
            slotMaxTime="21:00:00"
            allDaySlot={false}
            contentHeight={contentHeight}
            /* height={500} */
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: false,
            }}
          />
        </div>
      </div>
      {modalModifyIsVisible && (
        <EditShift
          data={data}
          eventInfo={eventClickInfo}
          isVisible={modalModifyIsVisible}
          setModalModifyIsVisible={setModalModifyIsVisible}
        />
      )}
    </>
  );
}

WeeklyCalendar.propTypes = {
  data: PropTypes.object.isRequired,
  modalModifyIsVisible: PropTypes.bool.isRequired,
  setModalModifyIsVisible: PropTypes.func.isRequired,
  eventsDB: PropTypes.array,
  dateSelected: PropTypes.string.isRequired, // Cambiado a string
};
