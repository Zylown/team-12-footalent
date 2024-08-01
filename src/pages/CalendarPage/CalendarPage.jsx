import { useEffect, useState } from "react";
import dayjs from "dayjs";
import WeeklyCalendar from "../../sections/Calendar/WeeklyCalendar";
import ShiftSidebar from "../../sections/ShiftManager/ShiftSidebar";
/* import { getAppointments } from "../../api/appointments/appointments-services"; */
import { useParams } from "react-router-dom";
import {
  getAppointments,
  getDentists,
  getAllPatients,
  getAllReasons,
} from "../../api";

function CalendarPage() {
  const [eventsDB, setEventsDB] = useState([]);
  const [loading, setLoading] = useState(null);
  const [modalModifyIsVisible, setModalModifyIsVisible] = useState(false);
  const [dateSelected, setDateSelected] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [data, setData] = useState({
    dentists: null,
    patients: null,
    reasons: null,
  });

  const id = Number(useParams().id);

  useEffect(() => {
    const getAppointment = async (id) => {
      /* setLoading(true); */
      try {
        const response = await getAppointments({ id });
        setEventsDB(response);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getAppointment(id);
    } else {
      setEventsDB(null);
      /* setLoading(false); */
    }
  }, [id]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [dentistsResponse, patientsResponse, reasonsResponse] =
          await Promise.all([getDentists(), getAllPatients(), getAllReasons()]);

        setData({
          dentists: dentistsResponse.data,
          patients: patientsResponse.data,
          reasons: reasonsResponse.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  /*  if (!loading) {
    console.log("Eventos seteados", data);
  } */

  function handleDateSelect(date) {
    setDateSelected(date);
  }

  /* function handleEvents(events) {
    console.log("pasa por aca");
    setCurrentEvents(events);
  } */

  return (
    <div className="max-w-7xl flex justify-center w-full mx-auto bg-white border-2 border-[#1C3454]/26 border-solid rounded my-6 font-sans">
      {loading === false && (
        <>
          <WeeklyCalendar
            eventsDB={eventsDB}
            dateSelected={dateSelected}
            modalModifyIsVisible={modalModifyIsVisible}
            setModalModifyIsVisible={setModalModifyIsVisible}
            data={data}
          />
          <ShiftSidebar handleDateSelect={handleDateSelect} />
        </>
      )}
    </div>
  );
}

export default CalendarPage;
