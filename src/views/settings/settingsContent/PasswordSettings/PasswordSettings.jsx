import React from 'react'
import { Typography } from '@mui/material'
import { Divider } from 'antd'
import PasswordForm from './PasswordForm'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import './style.css'

const PasswordSettings = () => {
  return (
    <>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        Password and Security:
      </Typography>
      <Divider />
      <PasswordForm />
    </>
  )
}

export default PasswordSettings
