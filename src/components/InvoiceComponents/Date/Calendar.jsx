import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar'
import './style.css'

const CalendarPick = () => {
  const [date, setDate] = useState(null)

  return (
    <>
      <div className="field">
        <h5>Date:</h5>
        <Calendar
          id="icon"
          value={date}
          onChange={(e) => setDate(e.value)}
          showIcon
          className="calendar"
        />
      </div>
    </>
  )
}

export default CalendarPick
