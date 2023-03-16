import React from 'react'
import { Typography } from '@mui/material'
import { Divider } from 'antd'
import AccountInformationFrom from './AccountInformationFrom/AccountInformationFrom'

const AccountInformationSettings = () => {
  return (
    <>
      <div>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          Account Informations:
        </Typography>
        <Divider />
        <div>
          <AccountInformationFrom />
        </div>
      </div>
    </>
  )
}
export default AccountInformationSettings
