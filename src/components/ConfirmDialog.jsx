import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'
import Controls from './Controls/Controls'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  DialogTitle: {
    textAlign: 'center',
  },
  DialogContent: {
    textAlign: 'center',
  },
  DialogActions: {
    justifyContent: 'center',
  },
  titleIcon: {
    backgroundColor: '#E0E0E0',
    color: theme.palette.secondary.main,
    '&:hover': {
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
    },
  },
}))

ConfirmDialog.propTypes = {
  confirmDialog: PropTypes.shape({
    title: PropTypes.string,
    subTitle: PropTypes.string,
    isOpen: PropTypes.bool,
    onConfirm: PropTypes.func,
  }),
  setConfirmDialog: PropTypes.func,
}

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props
  const classes = useStyles()

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.DialogTitle}>
        <IconButton className={classes.titleIcon}>
          <DeleteForeverIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.DialogActions}>
        <Controls.Button
          text="No"
          color="default"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button text="Yes" color="secondary" onClick={confirmDialog.onConfirm} />
      </DialogActions>
    </Dialog>
  )
}
