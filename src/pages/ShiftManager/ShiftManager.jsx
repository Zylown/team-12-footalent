import { useEffect, useState } from "react";
import dayjs from "dayjs";
import WeeklyCalendar from "../../sections/Calendar/WeeklyCalendar";
import ShiftSidebar from "../../sections/ShiftManager/ShiftSidebar";
import { getAppointments } from "../../api/appointments-services";

function ShiftManager() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [eventsDB, setEventsDB] = useState([]);
  const [loading, setLoading] = useState([null]);
  const [dateSelected, setDateSelected] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    const getAppointment = async () => {
      setLoading(true);
      try {
        const response = await getAppointments();
        setEventsDB(response);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    getAppointment();
  }, []);

  if (!loading) {
    console.log("Eventos seteados", eventsDB);
  }

  function handleDateSelect(date) {
    setDateSelected(date);
  }

  function handleEvents(events) {
    console.log("pasa por aca");
    setCurrentEvents(events);
  }

  return (
    <div className="container flex justify-center w-full px-2 mx-auto bg-white border-2 border-red-500 border-solid">
      {loading === false && (
        <>
          <WeeklyCalendar
            handleEvents={handleEvents}
            eventsDB={eventsDB}
            dateSelected={dateSelected}
          />
          <ShiftSidebar
            currentEvents={currentEvents}
            handleDateSelect={handleDateSelect}
          />
        </>
      )}
    </div>
  );
}

export default ShiftManager;
