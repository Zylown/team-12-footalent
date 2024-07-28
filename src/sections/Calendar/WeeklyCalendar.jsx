import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

export default function WeeklyCalendar({
  handleEvents,
  eventsDB,
  dateSelected,
}) {
  const [calendarApis, setCalendarApis] = useState(null);

  let nowStr = new Date().toISOString().slice(0, 19);
  console.log("Calendario", eventsDB);

  //Dirije hacie la vista diaria segun la fecha seleccionada en el MiniCalendar
  useEffect(() => {
    if (calendarApis && dateSelected) {
      //calendarApis.gotoDate(dateSelected);
      calendarApis.changeView("timeGridDay", dateSelected);
    }
  }, [calendarApis, dateSelected]);

  //Toma la referencia de la api del calendario cuando este listo
  const handleDatesSet = (arg) => {
    setCalendarApis(arg.view.calendar);
  };

  //funcion para añadir eventos
  function handleDateSelect(selectInfo) {
    let title = prompt("Alerta");
    let calendarApi = selectInfo.view.calendar;
    console.log(calendarApi);

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: nowStr,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  return (
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
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}          
          */
          /* eventContent={(eventInfo) => (
            <EventContent
              eventInfo={eventInfo}
              handleChangeState={handleChangeState}
              handleOpenUpdateWindow={handleOpenUpdateWindow}
            />
          )} */
          //dateClick={handleDateClick}
          datesSet={handleDatesSet}
          //CONFIGURACION PARA LAS CELDAS
          slotDuration="00:30:00"
          slotMinTime="08:00:00"
          slotMaxTime="21:00:00"
          allDaySlot={false}
          contentHeight={600}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: false,
          }}
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  /* console.log(eventInfo.view.type);
  if (eventInfo.view.type === "timeGridDay") {
    return (
      <div className="inline-flex items-center text-sm font-medium text-textBlue">
        <i>{eventInfo.event.title}</i>
      </div>
    );
  } */
  /* let diary = eventInfo.view.type === "timeGridDay"; */
  const week = " text-sm text-textBlue";
  const diary = "text-sm  font-medium text-textBlue";
  return (
    <div
      className={`flex items-center ${
        eventInfo.view.type === "timeGridDay" ? week : diary
      }`}
      /* className={`flex items-center text-sm text-textBlue ${
        eventInfo.view.type === "timeGridDay" ? "" : "font-normal "
      }`} */
    >
      {eventInfo.view.type === "timeGridDay" && (
        <>
          <div
            /* style={{ backgroundColor: statusColor }} */
            className={`w-2.5 h-2.5 rounded-full mr-2 bg-green-500`}
          />
          <b className="me-2">{eventInfo.timeText}</b>
        </>
      )}

      <i>{eventInfo.event.title}</i>
    </div>
  );
}

WeeklyCalendar.propTypes = {
  handleEvents: PropTypes.func.isRequired,
  eventsDB: PropTypes.array.isRequired,
  dateSelected: PropTypes.string.isRequired, // Cambiado a string
};
