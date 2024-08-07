import React, { useState, useEffect } from "react";
import { IoMdTime } from "react-icons/io";

const TimeInput = ({ maxTime, interval, onChange, className, label }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const generateOptions = () => {
      const times = [];
      let current = interval;
      while (current <= maxTime) {
        const hours = Math.floor(current / 60);
        const minutes = current % 60;
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        times.push({ label: formattedTime, value: formattedTime });
        current += interval;
      }
      return times;
    };

    setOptions(generateOptions());
  }, [maxTime, interval]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor="anticipation"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className={`relative ${className}`}>
        <select
          id="anticipation"
          onChange={handleChange}
          className="bg-[#F6FBFF] rounded-[4px] w-full border border-[#193B67] p-2 border-opacity-15 appearance-none"
        >
          <option value="">Seleccione un Horario</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} hs
            </option>
          ))}
        </select>
        <IoMdTime className="absolute transform pointer-events-none right-2 top-2/4 -translate-y-2/4" />
      </div>
    </div>
  );
};

export default TimeInput;

