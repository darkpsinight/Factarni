import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import BasicForm from 'src/components/register/BasicForm'
import ProfileForm from 'src/components/register/ProfileForm'
import Review from 'src/components/register/Review'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import propTypes from 'prop-types'
import { addUser } from 'src/Service/apiRegister'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from 'src/firebase'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.bps-tunisie.com/">
        Business Process Solutions
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const steps = ['Basic informations', 'Profile', 'Review your registration']
export default function Register() {
  const [activeStep, setActiveStep] = React.useState(0)
  const theme = createTheme()
  let navigate = useNavigate()
  const [stateRegister, setStateRegister] = useState({})
  const [stateProfile, setStateProfile] = useState({})
  const areAllFieldsFilled =
    stateRegister.username !== '' &&
    stateRegister.login !== '' &&
    stateRegister.password !== '' &&
    stateRegister.name !== ''

  async function registerfirebase() {
    createUserWithEmailAndPassword(auth, stateRegister.login, stateRegister.password)
      .then((data) => {
        /* console.log('User ID :- ', data.user.uid) */
        return data.user.uid
      })
      .then((uid) =>
        addUser({
          username: stateRegister.username,
          login: stateRegister.login,
          password: stateRegister.password,
          name: stateProfile.name,
          telephone: stateProfile.telephone,
          fax: stateProfile.fax,
          role: 'user',
          uid: uid,
        }),
      )
      .then(() => {
        sendEmailVerification(auth.currentUser)
        alert('Email sent')
      })
      .then(() => {
        console.log('Success, you will be redirected to login page')
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <BasicForm stateOfRegister={stateOfRegister} />
      case 1:
        return <ProfileForm stateOfProfile={stateOfProfile} />
      case 2:
        return <Review stateRegister={stateRegister} stateProfile={stateProfile} />
      default:
        throw new Error('Unknown step')
    }
  }

  const stateOfRegister = (props) => {
    setStateRegister(props)
  }
  const stateOfProfile = (props) => {
    setStateProfile(props)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const onNextClick = () => {
    if (activeStep === steps.length - 1) handleSubmit()
    else handleNext()
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNavigate = () => {
    navigate('/')
  }

  const handleSubmit = async () => {
    await registerfirebase()
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Factarni Company
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Register
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your registering and creating your account.
                </Typography>
                <Typography variant="subtitle1">
                  Check your email, we have emailed your registration confirmation link.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  {activeStep !== 0 && (
                    <>
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    </>
                  )}
                  <Button onClick={handleNavigate} sx={{ mt: 3, ml: 1 }} color="error">
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={onNextClick}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={!areAllFieldsFilled}
                  >
                    {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  )
}

Register.propTypes = {
  stateRegister: propTypes.object,
  stateProfile: propTypes.object,
}
