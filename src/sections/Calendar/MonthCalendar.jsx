import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Calendar, Button, Typography } from "antd";
import dayLocaleData from "dayjs/plugin/localeData";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

dayjs.extend(dayLocaleData);
dayjs.locale("es");

const MonthCalendar = ({ handleDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const handleDateChange = (value) => {
    if (value.day() !== 0) {
      setCurrentDate(value);
      handleDateSelect(value.format("YYYY-MM-DD"));
    }
  };

  const handleMonthChange = (amount) => {
    const newDate = currentDate.add(amount, "month");
    setCurrentDate(newDate);
    handleDateSelect(newDate.format("YYYY-MM-DD"));
  };

  const customLocale = {
    lang: {
      locale: "es",
      ...dayjs.localeData("es"),
      shortWeekDays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    },
  };

  const disabledDate = (current) => {
    return current && current.day() === 0;
  };

  const fullCellRender = (date) => {
    const isDisabled = date.day() === 0;
    return (
      <div
        className={`ant-picker-cell-inner ${
          isDisabled ? "cursor-not-allowed" : ""
        }`}
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {date.date()}
      </div>
    );
  };

  return (
    <div className="w-full pt-2">
      <Calendar
        fullscreen={false}
        value={currentDate}
        headerRender={({ value }) => {
          const month = value.format("MMMM");
          const year = value.year();

          return (
            <div className="flex items-center justify-between p-2 pb-3">
              <Button
                icon={<LeftOutlined />}
                onClick={() => handleMonthChange(-1)}
                size="small"
              />
              <Typography.Title
                level={5}
                style={{ margin: 0, color: "#005FDB" }}
              >
                {`${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`}
              </Typography.Title>
              <Button
                icon={<RightOutlined />}
                onClick={() => handleMonthChange(1)}
                size="small"
              />
            </div>
          );
        }}
        onChange={handleDateChange}
        locale={customLocale}
        disabledDate={disabledDate}
        fullCellRender={fullCellRender}
      />
    </div>
  );
};

export default MonthCalendar;

MonthCalendar.propTypes = {
  handleDateSelect: PropTypes.func.isRequired,
};
