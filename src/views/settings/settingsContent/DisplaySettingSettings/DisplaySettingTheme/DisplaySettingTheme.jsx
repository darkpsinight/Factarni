import React, { useState } from 'react'
import clsx from 'clsx'
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle'
import './style.css'

const DisplaySettingTheme = () => {
  const [mode, setMode] = useState('dark')

  return (
    <>
      <div
        className={clsx('DisplaySettingTheme', {
          dark: mode === 'dark',
        })}
      >
        <DarkModeToggle
          mode={mode}
          dark="Dark"
          light="Light"
          size="md"
          onChange={(mode) => {
            setMode(mode)
          }}
        />
      </div>
    </>
  )
}

export default DisplaySettingTheme
