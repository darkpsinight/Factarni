import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import propTypes from 'prop-types'
import { useForm, useWatch } from 'react-hook-form'
import './BasicFormStyle.css'

export default function BasicForm(props) {
  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: 'all',
  })

  const stateRegister = useWatch({ control })

  React.useEffect(() => {
    console.log(stateRegister)
    //update stateRegister with watch()
    // const stateRegister = watch();
    // setStateRegister(stateRegister);
    // console.log('state: ', stateRegister);
    props.stateOfRegister(stateRegister)
    // const subscription = watch((value, { name, type }) =>
    //   console.log(value, name, type)
    // );
    // return () => subscription.unsubscribe();
  }, [props, stateRegister])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Register your informations
      </Typography>
      <Typography variant="caption" color="red" gutterBottom>
        All champs are required *
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            fullWidth
            autoComplete="username"
            variant="standard"
            {...register('username', {
              /* onChange: (e) => {}, */
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characts long',
              },
              maxLength: {
                value: 30,
                message: 'Username must be at most 30 characts long',
              },
            })}
            helperText={errors.username?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="login"
            name="login"
            label="Email"
            type="email"
            fullWidth
            autoComplete="email"
            variant="standard"
            {...register('login', {
              required: 'Email is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Email must be valid',
              },
            })}
            helperText={errors.login?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            minLength="8"
            fullWidth
            autoComplete="password"
            variant="standard"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                message:
                  'Password must contain At least 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
              },
            })}
            helperText={errors.password?.message}
          />
          {/* {stateRegister?.password} */}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveLogin" value="yes" />}
            label="Keep me logged in"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

BasicForm.propTypes = {
  stateOfRegister: propTypes.func,
}
