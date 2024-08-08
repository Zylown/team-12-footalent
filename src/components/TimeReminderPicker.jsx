import { useState } from "react";
import { IoMdTime } from "react-icons/io";
import PropTypes from "prop-types";

const options = [
  { value: 12, label: "12 horas antes" },
  { value: 24, label: "24 horas antes" },
  { value: 36, label: "36 horas antes" },
  { value: 48, label: "48 horas antes" },
  { value: 72, label: "72 horas antes" },
];

function TimeReminderPicker({ setTimeReminder }) {
  const [selectedTime, setSelectedTime] = useState(options[1].value);
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedTime(value);
    setTimeReminder(value);
  };

  return (
    <div className="flex flex-col w-full gap-2 md:items-end">
      <div className="relative w-full md:w-48">
        <IoMdTime className="absolute transform pointer-events-none left-2 top-2/4 -translate-y-2/4 text-[#1B2B41]/60" />
        <select
          value={selectedTime}
          onChange={handleChange}
          className={`appearance-none cursor-pointer bg-[#F6FBFF] py-2 px-2.5 pl-8 w-full rounded border border-[#193B67] border-opacity-15 text-[#193B67] text-opacity-50`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

TimeReminderPicker.propTypes = {
  setTimeReminder: PropTypes.func.isRequired,
};

export default TimeReminderPicker;
