import React, { useState } from 'react';
import { format, addMonths, isSameDay, isWithinInterval } from 'date-fns';
import Dropdown from './DropDown.tsx';

interface DateRange {
  startDate: Date | string | null;
  endDate: Date | string | null;
}

interface DateRangePickerProps {
  mode: 'single' | 'range';
  onChange: (dateRange: DateRange) => void;
  value: DateRange;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ mode="range", value, onChange }) => {
  const [range, setRange] = useState<DateRange>(value);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = Array.from({ length: 12 }, (_, i) => format(new Date(0, i), 'MMMM'));
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i);
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const handleDateClick = (date: Date) => {
    if (mode === 'single') {
      setRange({ startDate: date, endDate: null });
      onChange({ startDate: date, endDate: null });
    } else if (mode === 'range') {
      if (!range.startDate || (range.startDate && range.endDate)) {
        setRange({ startDate: date, endDate: null });
        onChange({ startDate: date, endDate: null });
      } else {
        setRange({ startDate: range.startDate, endDate: date < range.startDate ? range.startDate : date });
        onChange({ startDate: range.startDate, endDate: date < range.startDate ? range.startDate : date });
      }
    }
  };

  const handleMonthChange = (newmonth: string) => {
    setCurrentMonth(new Date(`${newmonth} 1, ${currentMonth.getFullYear()}`));
  };

  const handleYearChange = (newyear: number) => {
    setCurrentMonth(new Date(newyear, currentMonth.getMonth()));
  };

  const renderDays = (startDate: Date) => {
    const days: JSX.Element[] = [];
    const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const lastDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    const offset = (firstDayOfMonth.getDay() + 6) % 7;

    for (let i = 0; i < offset; i++) {
      days.push(<div key={`empty-${i}`} className="h-full w-full" />);
    }

    for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
      const dateCopy = new Date(date);

      const isSelected = mode === 'single'
        ? isSameDay(dateCopy, range.startDate)
        : isSameDay(dateCopy, range.startDate) || isSameDay(dateCopy, range.endDate);

      const isInRange =
        mode === 'range' &&
        range.startDate &&
        range.endDate &&
        isWithinInterval(dateCopy, { start: range.startDate, end: range.endDate });

      const isHovered =
        mode === 'range' &&
        range.startDate &&
        !range.endDate &&
        hoverDate &&
        isWithinInterval(dateCopy, {
          start: range.startDate,
          end: hoverDate > range.startDate ? hoverDate : range.startDate,
        });

      days.push(
        <div
          key={date.toDateString()}
          className={`flex items-center justify-center cursor-pointer w-full aspect-square ${
            isSelected
              ? 'bg-secondaryColor text-white rounded-md'
              : isInRange
              ? 'bg-rangeColor h-[60%] self-center'
              : isHovered
              ? 'bg-purple-100'
              : 'hover:bg-gray-100'
          }`}
          onClick={() => handleDateClick(dateCopy)}
          onMouseEnter={() => setHoverDate(dateCopy)}
        >
          {date.getDate()}
        </div>
      );
    }

    return days;
  };

  const [isselectMonth, setSelectMonth] = useState<boolean>(false);
  const [isselectYear, setSelectYear] = useState<boolean>(false);

  const DroperIcon = ({ direction }: { direction: boolean }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200" width="10" height="22" className="mb-2 ml-2">
        {direction ? (
          <polygon points="50,100 90,190 10,190" fill="#F8B1FF" />
        ) : (
          <polygon points="50,190 90,110 10,110" fill="#F8B1FF" />
        )}
      </svg>
    );
  };

  return (
    <div className="absolute w-[15vw] top-full left-0 font-mulish bg-white border rounded-lg shadow-lg p-4 mt-2 z-50">
      <div className="flex justify-center mb-4">
        <div onClick={() => setSelectMonth(!isselectMonth)} className="flex justify-center items-center cursor-pointer relative w-[60%]">
          {format(new Date(0, currentMonth.getMonth()), 'MMMM')}
          <DroperIcon direction={isselectMonth} />
          {isselectMonth && (
            <Dropdown height="h-auto" width="w-[100%]">
              {months.map((month, index) => (
                <div key={index} onClick={() => handleMonthChange(month)} className="px-2 mb-1">
                  {month}
                </div>
              ))}
            </Dropdown>
          )}
        </div>
        <div onClick={() => setSelectYear(!isselectYear)} className="flex justify-center items-center cursor-pointer relative w-[30%]">
          {currentMonth.getFullYear()}
          <DroperIcon direction={isselectYear} />
          {isselectYear && (
            <Dropdown height="h-[30vh]" width="w-[120%]">
              {years.map((year) => (
                <div key={year} onClick={() => handleYearChange(year)} className="text-center">
                  {year}
                </div>
              ))}
            </Dropdown>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold text-sm">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0">{renderDays(currentMonth)}</div>
    </div>
  );
};

export default DateRangePicker;
