// utils/generateRecurringDates.ts

export type RecurrenceType = "daily" | "weekly" | "monthly" | "yearly";

export interface CustomOptions {
  interval?: number;
  daysOfWeek?: number[];
  nthDay?: number;
}

export const generateRecurringDates = (
  recurrenceType: RecurrenceType,
  customOptions: CustomOptions,
  startDate: Date,
  endDate: Date | null
): Date[] => {
  let dates: Date[] = [];
  const interval = customOptions.interval || 1;
  let currentDate = new Date(startDate);
  const lastDate = endDate
    ? new Date(endDate)
    : new Date(
        startDate.getFullYear() + 1,
        startDate.getMonth(),
        startDate.getDate()
      );

  switch (recurrenceType) {
    case "daily":
      while (currentDate <= lastDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + interval);
      }
      break;

    case "weekly":
      const daysOfWeek = customOptions.daysOfWeek || [];
      // Find the first occurrence of the specified days
      const firstWeekDates: Date[] = [];
      while (currentDate <= lastDate && firstWeekDates.length === 0) {
        if (daysOfWeek.includes(currentDate.getDay())) {
          firstWeekDates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (firstWeekDates.length > 0) {
        const initialDate = new Date(firstWeekDates[0]);
        // Loop through each day of the week selected
        for (const dayOfWeek of daysOfWeek) {
          let date = new Date(initialDate);
          // Set date to the next occurrence of the selected day
          date.setDate(
            date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7)
          );

          while (date <= lastDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + interval * 7);
          }
        }
        // Remove duplicates and sort the dates
        dates.sort((a, b) => a.getTime() - b.getTime());
        dates = dates.filter(
          (date, index) =>
            index === 0 || date.getTime() !== dates[index - 1].getTime()
        );
      }
      break;

    case "monthly":
      if (customOptions.nthDay) {
        while (currentDate <= lastDate) {
          if (currentDate.getDate() === customOptions.nthDay) {
            dates.push(new Date(currentDate));
            currentDate.setMonth(currentDate.getMonth() + interval);
            currentDate.setDate(customOptions.nthDay);
          } else {
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      } else {
        while (currentDate <= lastDate) {
          dates.push(new Date(currentDate));
          currentDate.setMonth(currentDate.getMonth() + interval);
        }
      }
      break;

    case "yearly":
      while (currentDate <= lastDate) {
        dates.push(new Date(currentDate));
        currentDate.setFullYear(currentDate.getFullYear() + interval);
      }
      break;

    default:
      break;
  }

  return dates;
};
