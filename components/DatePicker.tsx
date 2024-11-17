// components/DatePicker.tsx

"use client";

import React, { useEffect } from "react";
import RecurrenceOptions from "./RecurrenceOptions";
import DateRangeSelector from "./DateRangeSelector";
import DatePreview from "./DatePreview";
import CustomizationOptions from "./CustomizationOptions";
import { useDatePickerStore } from "@/app/store/datePickerStore";
import { generateRecurringDates } from "@/app/utils/generateRecurringDates";


const DatePicker: React.FC = () => {
  const {
    recurrenceType,
    customOptions,
    startDate,
    endDate,
    setPreviewDates,
  } = useDatePickerStore();

  useEffect(() => {
    if (startDate) {
      const dates = generateRecurringDates(
        recurrenceType,
        customOptions,
        startDate,
        endDate
      );
      setPreviewDates(dates);
    }
  }, [recurrenceType, customOptions, startDate, endDate, setPreviewDates]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">Select Recurrence</h2>
      <RecurrenceOptions />
      <CustomizationOptions recurrenceType={recurrenceType} />
      <DateRangeSelector />
      <DatePreview />
    </div>
  );
};

export default DatePicker;
