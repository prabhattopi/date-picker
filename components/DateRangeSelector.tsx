// components/DateRangeSelector.tsx

"use client";

import { useDatePickerStore } from "@/app/store/datePickerStore";
import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeSelector: React.FC = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePickerStore();

  // Handler for Start Date
  const handleStartDateChange = (
    date: Date | null,

  ) => {
    if (date) {
      setStartDate(date);
    }
  };

  // Handler for End Date
  const handleEndDateChange = (
    date: Date | null,
  ) => {
    setEndDate(date);
  };

  return (
    <div className="flex gap-4 mb-4">
      <div>
      <label className="font-semibold" htmlFor="start-date">
  Start Date:
</label>
<DatePicker
  id="start-date"
  selected={startDate}
  onChange={handleStartDateChange}
  className="block w-full mt-1"
  dateFormat="yyyy-MM-dd"
/>
      </div>
      <div>
      <label className="font-semibold" htmlFor="end-date">
  End Date:
</label>
<DatePicker
  id="end-date"
  selected={endDate}
  onChange={handleEndDateChange}
  className="block w-full mt-1"
  dateFormat="yyyy-MM-dd"
  isClearable
/>

      </div>
    </div>
  );
};

export default DateRangeSelector;
