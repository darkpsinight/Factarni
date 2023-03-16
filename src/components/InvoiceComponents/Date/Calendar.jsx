import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar'
import './style.css'

const CalendarPick = () => {
  /* get date for API */
  const [date, setDate] = useState(null)

  console.log('date: ', date)

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
