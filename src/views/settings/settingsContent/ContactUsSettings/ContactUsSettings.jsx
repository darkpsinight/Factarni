import React from 'react'
import { Typography } from '@mui/material'
import { Divider } from 'antd'
import ContactUsSettingsForm from './ContactUsSettingsForm/ContactUsSettingsForm'

const ContactUsSettings = () => {
  return (
    <>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        Contact Us:
      </Typography>
      <Divider />
      <div className="form-demo">
        <div>
          <ContactUsSettingsForm />
        </div>
      </div>
    </>
  )
}

export default ContactUsSettings
