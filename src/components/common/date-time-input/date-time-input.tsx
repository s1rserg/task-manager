'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  defaultValue?: string;
  name: string;
  errors?: string[];
  isLabelHidden?: boolean;
  label: string;
};

export function DateTimeInput({
  defaultValue,
  name,
  errors,
  label,
  isLabelHidden,
}: Props) {
  const [date, setDate] = useState<Date | null>(
    defaultValue
      ? new Date(defaultValue)
      : new Date(Date.now() + 24 * 60 * 60 * 1000)
  );

  const formattedValue = date ? date.toISOString().slice(0, 16) : '';

  const hasError = errors ? !!errors.length : false;

  return (
    <label className='flex flex-col gap-2 w-full'>
      <span className={isLabelHidden ? 'invisible' : 'text-base/6 font-medium'}>
        {label}
      </span>
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        showTimeSelect
        timeFormat='HH:mm'
        timeIntervals={15}
        dateFormat='yyyy-MM-dd HH:mm'
        className='w-full py-2.5 px-4 border rounded-md bg-neutral-800 border-neutral-700
          focus:outline-none focus:border-violet-500 hover:border-violet-700 transition-all'
        placeholderText='Pick date & time'
      />
      <input type='hidden' name={name} value={formattedValue} />
      {hasError &&
        errors?.map((err) => (
          <span
            key={err}
            className='text-sm leading-[1.3] font-medium text-red-500'
          >
            {err}
          </span>
        ))}
    </label>
  );
}
