import { Snackbar } from '@mui/material'
import React from 'react'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(8),
  },
}))

Notification.propTypes = {
  notify: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
    isOpen: PropTypes.bool,
  }),
  setNotify: PropTypes.func,
}

export default function Notification(props) {
  const { notify, setNotify } = props
  const classes = useStyles()

  const handleClose = (event, reason) => {
    setNotify({
      ...notify,
      isOpen: false,
    })
  }

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  )
}
