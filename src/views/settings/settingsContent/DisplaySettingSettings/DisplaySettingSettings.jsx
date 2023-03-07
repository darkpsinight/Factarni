import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { Card, Divider } from 'antd'
import { Dropdown } from 'primereact/dropdown'
import DisplaySettingTheme from './DisplaySettingTheme/DisplaySettingTheme'

const DisplaySettingSettings = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const countries = [
    { name: 'English', code: 'EN' },
    { name: 'Français', code: 'FR' },
    { name: 'العربية', code: 'AR' },
  ]

  const onCountryChange = (e) => {
    setSelectedCountry(e.value)
  }

  console.log('selectedCountry: ', selectedCountry)

  return (
    <>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        Display settings:
      </Typography>
      <Divider />
      <Card>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Language:
        </Typography>
        <Dropdown
          value={selectedCountry}
          options={countries}
          onChange={onCountryChange}
          optionLabel="name"
          placeholder="Select a Language"
          style={{ marginTop: '10px' }}
        />
      </Card>
      <Card>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Theme Mode:
        </Typography>
        <DisplaySettingTheme />
      </Card>
    </>
  )
}

export default DisplaySettingSettings
