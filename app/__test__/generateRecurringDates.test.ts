// __tests__/generateRecurringDates.test.ts

import { generateRecurringDates } from "../utils/generateRecurringDates";



describe("generateRecurringDates", () => {
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-01-31");

  test("generates daily recurring dates", () => {
    const dates = generateRecurringDates("daily", { interval: 2 }, startDate, endDate);
    expect(dates).toEqual([
      new Date("2023-01-01"),
      new Date("2023-01-03"),
      new Date("2023-01-05"),
      new Date("2023-01-07"),
      new Date("2023-01-09"),
      new Date("2023-01-11"),
      new Date("2023-01-13"),
      new Date("2023-01-15"),
      new Date("2023-01-17"),
      new Date("2023-01-19"),
      new Date("2023-01-21"),
      new Date("2023-01-23"),
      new Date("2023-01-25"),
      new Date("2023-01-27"),
      new Date("2023-01-29"),
      new Date("2023-01-31"),
    ]);
  });

  test("generates weekly recurring dates with interval", () => {
    const dates = generateRecurringDates(
      "weekly",
      { interval: 2, daysOfWeek: [1, 3] }, // Mondays and Wednesdays
      new Date("2023-01-02"), // Start on a Monday
      endDate
    );
    expect(dates).toEqual([
      new Date("2023-01-02"),
      new Date("2023-01-04"),
      new Date("2023-01-16"),
      new Date("2023-01-18"),
      new Date("2023-01-30"),
    ]);
  });

  test("generates monthly recurring dates on the nth day", () => {
    const dates = generateRecurringDates(
      "monthly",
      { nthDay: 5, interval: 1 },
      startDate,
      new Date("2023-04-01")
    );
    expect(dates).toEqual([
      new Date("2023-01-05"),
      new Date("2023-02-05"),
      new Date("2023-03-05"),
    ]);
  });

  test("generates yearly recurring dates", () => {
    const dates = generateRecurringDates(
      "yearly",
      { interval: 1 },
      startDate,
      new Date("2025-01-01")
    );
    expect(dates).toEqual([
      new Date("2023-01-01"),
      new Date("2024-01-01"),
      new Date("2025-01-01"),
    ]);
  });
});
