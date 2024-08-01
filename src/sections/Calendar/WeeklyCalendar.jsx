import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
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
}) {
  const [calendarApis, setCalendarApis] = useState(null);
  const [contentHeight, setContentHeight] = useState(600);

  const adjustContentHeight = () => {
    const height = window.innerHeight;
    if (height < 600) {
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
    console.log("evento clickeado", clickInfo.event);
    /* if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      console.log("evento clickeado", clickInfo.event);
      clickInfo.event.remove();
    } */
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
            updateSize={true}
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
          isVisible={modalModifyIsVisible}
          setModalModifyIsVisible={setModalModifyIsVisible}
        />
      )}
    </>
  );
}

WeeklyCalendar.propTypes = {
  /* setStateCalendarApi: PropTypes.func.isRequired, */
  modalModifyIsVisible: PropTypes.bool.isRequired,
  setModalModifyIsVisible: PropTypes.func.isRequired,
  eventsDB: PropTypes.array.isRequired,
  dateSelected: PropTypes.string.isRequired, // Cambiado a string
};
