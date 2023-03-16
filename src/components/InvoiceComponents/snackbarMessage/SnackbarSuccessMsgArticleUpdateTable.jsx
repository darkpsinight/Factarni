import React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import propTypes from 'prop-types'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const SnackbarSuccessMsgArticleUpdateTable = (props) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    props.setOpenSuccess(false)
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.openSuccess} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Article updated successfully
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default SnackbarSuccessMsgArticleUpdateTable

SnackbarSuccessMsgArticleUpdateTable.propTypes = {
  openSuccess: propTypes.bool,
  setOpenSuccess: propTypes.func,
}
