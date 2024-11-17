// components/RecurrenceOptions.tsx

"use client";

import { useDatePickerStore } from "@/app/store/datePickerStore";
import { RecurrenceType } from "@/app/utils/generateRecurringDates";
import React from "react";


const RecurrenceOptions: React.FC = () => {
  const { recurrenceType, setRecurrenceType } = useDatePickerStore();

  const handleRecurrenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as RecurrenceType;
    setRecurrenceType(type);
  };

  return (
    <div className="mb-4">
      <label className="font-semibold" htmlFor="recurrence-type">
        Recurrence Type:
      </label>
      <select
        id="recurrence-type"
        className="block w-full mt-1 border border-gray-300 rounded"
        value={recurrenceType}
        onChange={handleRecurrenceChange}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};

export default RecurrenceOptions;
