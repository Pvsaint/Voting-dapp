import { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const MyDatePicker = ({ setDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="relative flex items-center">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setDate({ date: date });
        }}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="Select Date"
        className="input-box pl-10"
      />
      <i className="bi bi-calendar absolute left-3 text-gray-500"></i>
    </div>
  );
};

export default MyDatePicker;
MyDatePicker.propTypes = {
  setDate: PropTypes.func,
};
