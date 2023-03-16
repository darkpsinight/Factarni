import React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import propTypes from 'prop-types'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const SnackbarFailureMsgArticleUpdateTable = (props) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    props.setOpenError(false)
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.openError} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Can&apos;t update article, please try again!
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default SnackbarFailureMsgArticleUpdateTable

SnackbarFailureMsgArticleUpdateTable.propTypes = {
  openError: propTypes.bool,
  setOpenError: propTypes.func,
}
