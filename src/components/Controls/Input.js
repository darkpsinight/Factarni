import React from 'react'
import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

Input.propTypes = {
  options: PropTypes.shape({
    map: PropTypes.string,
  }),
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
}

export default function Input(props) {
  const { name, label, value, error = null, onChange, ...other } = props
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}
