import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import propTypes from 'prop-types'
import { useForm, useWatch } from 'react-hook-form'
import './BasicFormStyle.css'

export default function ProfileForm(props) {
  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: 'all',
  })

  const stateProfile = useWatch({ control })

  React.useEffect(() => {
    console.log(stateProfile)
    props.stateOfProfile(stateProfile)
  }, [props, stateProfile])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        More informations about you
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="name"
            variant="standard"
            {...register('name', {
              required: 'name is required',
              minLength: {
                value: 3,
                message: 'name must be at least 3 characts long',
              },
              maxLength: {
                value: 30,
                message: 'name must be at most 30 characts long',
              },
            })}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="telephone"
            name="telephone"
            label="Phone"
            fullWidth
            autoComplete="telephone"
            variant="standard"
            {...register('telephone', {
              minLength: {
                value: 4,
                message: 'phone number must be at least 4 numbers long',
              },
              maxLength: {
                value: 15,
                message: 'phone number must be at most 15 numbers long',
              },
              pattern: {
                value:
                  /((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})/,
                message: 'Phone must be valid',
              },
            })}
            helperText={errors.telephone?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="fax"
            name="fax"
            label="Fax"
            fullWidth
            autoComplete="fax"
            variant="standard"
            {...register('fax', {
              minLength: {
                value: 4,
                message: 'fax number must be at least 4 numbers long',
              },
              maxLength: {
                value: 15,
                message: 'fax number must be at most 15 characts long',
              },
              pattern: {
                value:
                  /((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})/,
                message: 'Phone must be valid',
              },
            })}
            helperText={errors.fax?.message}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

ProfileForm.propTypes = {
  stateOfProfile: propTypes.func,
}
