import React from 'react'
import { Button as MuiButton, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
}))

Button.propTypes = {
  options: PropTypes.shape({
    map: PropTypes.string,
  }),
  text: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
}

export default function Button(props) {
  const { text, size, color, variant, onClick, ...other } = props
  const classes = useStyles()

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  )
}
