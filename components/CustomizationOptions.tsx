// components/CustomizationOptions.tsx

"use client";

import { useDatePickerStore } from "@/app/store/datePickerStore";
import React from "react";


interface CustomizationOptionsProps {
  recurrenceType: string;
}

const CustomizationOptions: React.FC<CustomizationOptionsProps> = ({
  recurrenceType,
}) => {
  const { customOptions, setCustomOptions } = useDatePickerStore();

  return (
    <div className="mb-4">
      <label className="font-semibold">
        Customize{" "}
        {recurrenceType.charAt(0).toUpperCase() + recurrenceType.slice(1)}{" "}
        Recurrence:
      </label>

      {/* Interval */}
      <div className="mt-2">
        <label htmlFor="interval-input">
          Every{" "}
          {recurrenceType === "weekly"
            ? "X weeks"
            : recurrenceType === "daily"
            ? "X days"
            : recurrenceType === "monthly"
            ? "X months"
            : "X years"}
          :
        </label>
        <input
          id="interval-input"
          type="number"
          min="1"
          className="block w-full mt-1 border border-gray-300 rounded"
          placeholder={`Every X ${
            recurrenceType === "weekly"
              ? "weeks"
              : recurrenceType === "daily"
              ? "days"
              : recurrenceType === "monthly"
              ? "months"
              : "years"
          }`}
          value={customOptions.interval || ""}
          onChange={(e) =>
            setCustomOptions({ interval: Number(e.target.value) })
          }
        />
      </div>

      {/* Specific Days of the Week for Weekly Recurrence */}
      {recurrenceType === "weekly" && (
        <div className="mt-2">
          <label>Select Days of the Week:</label>
          <div className="flex gap-2 mt-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 border rounded ${
                    customOptions.daysOfWeek?.includes(index)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    const daysOfWeek = customOptions.daysOfWeek || [];
                    if (daysOfWeek.includes(index)) {
                      setCustomOptions({
                        daysOfWeek: daysOfWeek.filter((d) => d !== index),
                      });
                    } else {
                      setCustomOptions({
                        daysOfWeek: [...daysOfWeek, index],
                      });
                    }
                  }}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Nth Day of the Month for Monthly Recurrence */}
      {recurrenceType === "monthly" && (
        <div className="mt-2">
          <label>Select Nth Day of the Month:</label>
          <input
            type="number"
            min="1"
            max="31"
            className="block w-full mt-1 border border-gray-300 rounded"
            placeholder="e.g., 2 for the second day of the month"
            value={customOptions.nthDay || ""}
            onChange={(e) =>
              setCustomOptions({ nthDay: Number(e.target.value) })
            }
          />
        </div>
      )}
    </div>
  );
};

export default CustomizationOptions;
