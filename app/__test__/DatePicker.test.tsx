// app/__test__/DatePicker.test.tsx

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DatePicker from '@/components/DatePicker';
import { useDatePickerStore } from '../store/datePickerStore';


test('updates preview dates when recurrence settings change', () => {
  render(<DatePicker />);

  // Select "Weekly" recurrence
  fireEvent.change(screen.getByLabelText(/Recurrence Type/i), {
    target: { value: 'weekly' },
  });

  // Set interval to 2
  fireEvent.change(screen.getByPlaceholderText(/Every X weeks/i), {
    target: { value: '2' },
  });

  // Click on Monday and Wednesday
  fireEvent.click(screen.getByText('Mon'));
  fireEvent.click(screen.getByText('Wed'));

  // Assert that previewDates in the store have been updated
  const { previewDates } = useDatePickerStore.getState();
  expect(previewDates.length).toBeGreaterThan(0);
});
