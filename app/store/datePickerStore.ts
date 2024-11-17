// store/datePickerStore.ts

import { create } from "zustand";
import { CustomOptions, RecurrenceType } from "../utils/generateRecurringDates";


interface DatePickerStore {
  recurrenceType: RecurrenceType;
  customOptions: CustomOptions;
  startDate: Date;
  endDate: Date | null;
  previewDates: Date[];

  setRecurrenceType: (type: RecurrenceType) => void;
  setCustomOptions: (options: CustomOptions) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date | null) => void;
  setPreviewDates: (dates: Date[]) => void;
}

export const useDatePickerStore = create<DatePickerStore>((set) => ({
  recurrenceType: "daily",
  customOptions: {},
  startDate: new Date(),
  endDate: null,
  previewDates: [],

  setRecurrenceType: (type) =>
    set({ recurrenceType: type, customOptions: {} }),
  setCustomOptions: (options) =>
    set((state) => ({
      customOptions: { ...state.customOptions, ...options },
    })),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setPreviewDates: (dates) => set({ previewDates: dates }),
}));
