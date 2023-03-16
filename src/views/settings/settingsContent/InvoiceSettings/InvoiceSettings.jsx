import React from 'react'
import { Divider } from 'primereact/divider'
import { Typography } from '@mui/material'
import InvoicePreferenceForm from './InvoicePreferenceForm/InvoicePreferenceForm'

const InvoiceSettings = () => {
  return (
    <>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        Invoice Preference:
      </Typography>
      <Divider />
      <InvoicePreferenceForm />
    </>
  )
}

export default InvoiceSettings
