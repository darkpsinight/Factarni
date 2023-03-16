import React, { useRef } from 'react'
import { Typography } from '@mui/material'
import { Divider } from 'antd'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { deleteUser } from '../../../../Service/Settings/apiDeleteAccount'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import './style.css'

const DeleteAccountSettings = () => {
  const toastBC = useRef(null)

  const handleDeleteClick = () => {
    console.log('handle delete action')
    deleteUser()
  }

  const handleCancelClick = () => {
    toastBC.current.clear()
  }

  const showConfirm = () => {
    toastBC.current.show({
      severity: 'error',
      sticky: false,
      content: (
        <div className="flex flex-column" style={{ flex: '1' }}>
          <div className="text-center">
            <i className="pi pi-exclamation-triangle" style={{ fontSize: '7rem' }}></i>
            <h4>
              Are you sure? This is <b>PERMANENT !</b>
            </h4>
            <Typography variant="h6" component="div" style={{ marginBottom: '10px' }}>
              Please note that there is <b>no</b> option to restore the account or its data not
              reuse the email once it&apos;s deleted.
            </Typography>
          </div>
          <div className="grid p-fluid">
            <div className="col-6">
              <Button
                type="button"
                label="Delete"
                className="p-button-danger"
                onClick={() => {
                  handleDeleteClick()
                }}
              />
            </div>
            <div className="col-6">
              <Button
                type="button"
                label="No"
                className="p-button-secondary"
                onClick={() => {
                  handleCancelClick()
                }}
              />
            </div>
          </div>
        </div>
      ),
    })
  }

  return (
    <>
      <div>
        <Toast ref={toastBC} position="bottom-center" />
      </div>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'red' }}>
        <span>
          <WarningAmberOutlinedIcon sx={{ fontSize: '60px' }} />
        </span>
        Delete Account:
      </Typography>
      <Divider />
      <div className="card toast-demo">
        <Button
          label="Delete my account"
          icon="pi pi-exclamation-triangle"
          className="p-button-raised p-button-danger"
          style={{ display: 'flex', flexDirection: 'row-reverse' }}
          onClick={() => showConfirm()}
        />
      </div>
    </>
  )
}

export default DeleteAccountSettings
