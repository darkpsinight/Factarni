import React from 'react'
import { Divider } from 'primereact/divider'
import { Typography } from '@mui/material'
import CompanyDetailsForm from './CompanyDetailsForm/CompanyDetailsForm'

const CompanyDetailsSettings = () => {
  return (
    <>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        Company details:
      </Typography>
      <Divider />
      <CompanyDetailsForm />
    </>
  )
}

export default CompanyDetailsSettings
