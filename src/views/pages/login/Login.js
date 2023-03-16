import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cibMailRu } from '@coreui/icons'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'src/firebase'
import { login } from './../../../Service/apiLogin'
import { Alert } from '@mui/material'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleClick = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const accessToken = userCredential.user.accessToken
        return accessToken
      })
      .then((accessToken) => {
        localStorage.setItem('accessTokenFirebase', accessToken)
      })
      .then((response) => {
        login()
          .then((response) => localStorage.setItem('accessTokenServer', response.data.user.token))
          .then(() => navigate('/dashboard'))
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode:', errorCode)
        console.log('errorMessage:', errorMessage)
        setError(errorCode)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cibMailRu} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="Email"
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <div style={{ margin: '10px', marginTop: '-10px' }}>
                      {error && (
                        <Alert severity="error" style={{ marginButtom: '50px' }}>
                          {error}
                        </Alert>
                      )}
                    </div>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleClick}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Create account to gain access to Factarni dashboard.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
