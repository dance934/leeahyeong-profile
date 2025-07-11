import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ScheduleCalendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function ScheduleCalendar() {
  const [value, onChange] = useState(new Date());
  const [isBeating, setIsBeating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBeating(prev => !prev);
    }, 250); // Toggle every 0.25 seconds for a faster beat cycle

    return () => clearInterval(interval);
  }, []);

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
      return <FontAwesomeIcon icon={faHeart} className={`heart-icon ${isBeating ? 'heart-beat-active' : ''}`} />;
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
