import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ScheduleCalendar.css';

function ScheduleCalendar() {
  const [value, onChange] = useState(new Date());

  // Define the working days for July
  const workingDays = [
    new Date(2025, 6, 23).toDateString(), // Month is 0-indexed, so 6 is July
    new Date(2025, 6, 24).toDateString(),
    new Date(2025, 6, 29).toDateString(),
    new Date(2025, 6, 30).toDateString(),
  ];

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && workingDays.includes(date.toDateString())) {
      return 'working-day-bg';
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && workingDays.includes(date.toDateString())) {
      return <span className="heart-icon">❤️</span>;
    }
    return null;
  };

  return (
    <div className="schedule-calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
        tileContent={tileContent}
        locale="zh-TW"
        activeStartDate={new Date(2025, 6, 1)} // Set calendar to July 2025
      />
    </div>
  );
}

export default ScheduleCalendar;
