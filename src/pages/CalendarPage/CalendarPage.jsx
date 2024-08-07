import { useEffect, useState } from "react";
import { Spin } from "antd";
import dayjs from "dayjs";
import WeeklyCalendar from "../../sections/Calendar/WeeklyCalendar";
import ShiftSidebar from "../../sections/ShiftManager/ShiftSidebar";
import { FaChevronDown } from "react-icons/fa";
import { getAppointments, getDentists, getAllReasons } from "../../api";
import CardWhite from "../../components/CardWhite";
import { useDecode } from "../../hooks/useDecode";

function CalendarPage() {
  const [eventsDB, setEventsDB] = useState(null);
  const [loading, setLoading] = useState(null);
  const [modalModifyIsVisible, setModalModifyIsVisible] = useState(false);
  const [isDentist, setIsDentist] = useState(null);
  const [dentistID, setDentistID] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [calendarKey, setCalendarKey] = useState(0);
  const [dateSelected, setDateSelected] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  //const { Option } = Select;
  const [data, setData] = useState({
    dentists: null,
    reasons: null,
  });

  const decoded = useDecode(localStorage.getItem("token"));
  useEffect(() => {
    if (decoded && decoded.role === "dentist") {
      setDentistID(decoded.user_id);
      setIsDentist(true);
    }
  }, [decoded]);

  useEffect(() => {
    const getAppointment = async (dentistID) => {
      setLoading(true);
      try {
        const response = await getAppointments({ id: dentistID });
        setEventsDB(response);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (dentistID) {
      getAppointment(dentistID);
    } else {
      setEventsDB(null);
      /* setLoading(false); */
    }
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [dentistID, calendarKey]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [dentistsResponse, reasonsResponse] = await Promise.all([
          getDentists(),
          getAllReasons(),
        ]);

        setData({
          dentists: dentistsResponse.data,
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

  const forceCalendarUpdate = () => {
    setCalendarKey((prevKey) => prevKey + 1);
  };

  function handleDateSelect(date) {
    setDateSelected(date);
  }

  const handleChange = (value) => {
    setDentistID(value);
  };

  const updateEventInState = (updatedEvent) => {
    setEventsDB((prevEvents) => {
      if (!prevEvents) return [updatedEvent];
      return prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
    });
  };

  return (
    <>
      <div className="max-w-7xl relative flex justify-center w-full mx-auto bg-white border-2 border-[#1C3454]/26 border-solid rounded my-6 font-sans">
        <div
          className={`${
            eventsDB && "hidden"
          } absolute z-40 w-full h-full bg-white opacity-60`}
        ></div>
        {loading && (
          <div
            className={`absolute z-50 top-0 justify-center mx-auto w-full flex items-center h-full`}
          >
            <Spin spinning={loading} tip="Cargando" size="large">
              <div
                className="rounded p-14"
                style={{ background: "rgba(0, 0, 0, 0.05)" }}
              />
            </Spin>
          </div>
        )}

        <>
          <WeeklyCalendar
            eventsDB={eventsDB}
            dateSelected={dateSelected}
            modalModifyIsVisible={modalModifyIsVisible}
            setModalModifyIsVisible={setModalModifyIsVisible}
            data={data}
            updateEventInState={updateEventInState}
          />
          <ShiftSidebar
            handleDateSelect={handleDateSelect}
            forceCalendarUpdate={forceCalendarUpdate}
            isDentist={isDentist}
            data={data}
            handleChange={handleChange}
            dentistID={dentistID}
            eventsDB={eventsDB}
          />
        </>
      </div>
      <div
        className={`${
          eventsDB && "hidden"
        } absolute z-40 top-0 justify-center mx-auto w-full flex items-center h-full transition-opacity duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <CardWhite className="mx-auto bg-white w-80 lg:w-[437px] lg:h-80">
          <div className="flex flex-col items-center justify-center h-full gap-2 p-5 text-center lg:px-14">
            <img
              src="/src/assets/CalendarCheck.svg"
              alt="caledar svg"
              className="w-12 h-12 lg:w-24 lg:h-24"
            />
            <h2 className="text-2xl font-semibold text-mainBlue text-nowrap">
              Selecciona un profesional
            </h2>
            <h3 className="text-lg">Para poder comenzar</h3>
            <div className="relative w-full mt-3 lg:text-lg max-w-72">
              <select
                /* placeholder="Seleccionar profesional" */
                defaultValue=""
                className="appearance-none cursor-pointer bg-white py-2 px-2.5 w-full rounded border border-mainBlue text-textBlue focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                onChange={(e) => handleChange(e.target.value)}
              >
                <option value="" disabled hidden>
                  Seleccionar profesional
                </option>
                {data.dentists &&
                  data.dentists.map((dentist) => (
                    <option key={dentist.id} value={dentist.id}>
                      {dentist.first_name}
                      {dentist.last_name}
                    </option>
                  ))}
              </select>
              <FaChevronDown className="text-textBlue absolute right-0 pointer-events-none top-1/2 transform -translate-y-1/2 mr-2.5" />
            </div>
          </div>
        </CardWhite>
      </div>
    </>
  );
}

export default CalendarPage;
