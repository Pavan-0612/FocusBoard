import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Calendar({ tasks }) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateKey = (day) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const tasksForSelectedDate = tasks.filter((task) => task.dueDate === selectedDate);

  const changeMonth = (amount) => {
    setCurrentDate(new Date(year, month + amount, 1));
    setSelectedDate("");
  };

  return (
    <section className="page-section">
      <div className="page-heading">
        <div><p className="eyebrow">PLAN YOUR SCHEDULE</p><h1>Calendar</h1><p>Choose a date to see its scheduled tasks.</p></div>
        <div className="month-controls">
          <button className="icon-button" onClick={() => changeMonth(-1)} aria-label="Previous month"><ChevronLeft /></button>
          <strong>{monthNames[month]} {year}</strong>
          <button className="icon-button" onClick={() => changeMonth(1)} aria-label="Next month"><ChevronRight /></button>
        </div>
      </div>

      <div className="calendar-panel">
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div className="calendar-weekday" key={day}>{day}</div>)}
          {Array.from({ length: firstDay }, (_, index) => <div className="calendar-empty" key={`empty-${index}`} />)}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const key = dateKey(day);
            const count = tasks.filter((task) => task.dueDate === key).length;
            return (
              <button key={day} className={`calendar-date ${selectedDate === key ? "chosen" : ""}`} onClick={() => setSelectedDate(key)} aria-pressed={selectedDate === key}>
                <span>{day}</span>
                {count > 0 && <small>{count} {count === 1 ? "task" : "tasks"}</small>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="date-task-panel">
        <div className="section-title"><CalendarDays size={19} /><h2>{selectedDate ? `Tasks for ${selectedDate}` : "Select a date"}</h2></div>
        {!selectedDate ? <p className="muted">Select any calendar date to view its tasks.</p> :
          tasksForSelectedDate.length ? tasksForSelectedDate.map((task) => (
            <article className="calendar-task-row" key={task.id}>
              <div><strong>{task.title}</strong><p>{task.description}</p></div>
              <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
            </article>
          )) : <p className="muted">No tasks scheduled for this date.</p>}
      </div>
    </section>
  );
}

export default Calendar;
