import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import './style.css'

const DisabledInputText = () => {
  const [value, setValue] = useState('')

  return (
    <>
      <span className="p-float-label">
        <InputText
          className="disabledinputtext"
          disabled
          id="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label htmlFor="number">Number</label>
      </span>
    </>
  )
}

export default DisabledInputText
