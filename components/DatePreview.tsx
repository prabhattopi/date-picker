// components/DatePreview.tsx

"use client";

import { useDatePickerStore } from "@/app/store/datePickerStore";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const DatePreview: React.FC = () => {
  const { previewDates } = useDatePickerStore();

  return (
    <div>
      <h3 className="font-semibold mb-2">Preview Recurring Dates:</h3>
      <Calendar
        tileClassName={({ date }) =>
          previewDates.some(
            (d) => d.toDateString() === date.toDateString()
          )
            ? "highlight"
            : undefined
        }
      />
    </div>
  );
};

export default DatePreview;
