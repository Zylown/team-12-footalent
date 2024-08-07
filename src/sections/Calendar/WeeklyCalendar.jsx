import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import EditShift from "../ShiftManager/Modal/EditShift";
import EventsContent from "./EventsContent";

export default function WeeklyCalendar({
  eventsDB,
  dateSelected,
  setModalModifyIsVisible,
  modalModifyIsVisible,
  data,
  forceCalendarUpdate,
}) {
  const [calendarApis, setCalendarApis] = useState(null);
  const [contentHeight, setContentHeight] = useState(600);
  const [eventClickInfo, setEventClickInfo] = useState([]);

  const calendarRef = useRef(null);

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

  //funcion para mostrar modal a hacer click en evento
  function handleEventClick(clickInfo) {
    setModalModifyIsVisible(true);
    /* console.log("evento clickeado", clickInfo.event); */
    setEventClickInfo(clickInfo.event);
  }

  return (
    <>
      <div className="relative p-2 pb-3 demo-app">
        <div className="demo-app-main">
          <FullCalendar
            ref={calendarRef}
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
              <EventsContent
                eventInfo={eventInfo}
                forceCalendarUpdate={forceCalendarUpdate}
              />
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
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: false,
            }}
          />
        </div>
        <div
          className={`absolute top-0 left-0 z-40 w-full h-full backdrop-blur-sm ${
            eventsDB && "hidden"
          }`}
        ></div>
      </div>
      {modalModifyIsVisible && (
        <EditShift
          data={data}
          eventInfo={eventClickInfo}
          isVisible={modalModifyIsVisible}
          setModalModifyIsVisible={setModalModifyIsVisible}
          forceCalendarUpdate={forceCalendarUpdate}
        />
      )}
    </>
  );
}

WeeklyCalendar.propTypes = {
  data: PropTypes.object.isRequired,
  modalModifyIsVisible: PropTypes.bool.isRequired,
  setModalModifyIsVisible: PropTypes.func.isRequired,
  forceCalendarUpdate: PropTypes.func.isRequired,
  eventsDB: PropTypes.array,
  dateSelected: PropTypes.string.isRequired, // Cambiado a string
};
