import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { Divider } from 'antd'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { Password } from 'primereact/password'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '../../../../firebase'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

/* form validation */
const schema = yup.object().shape({
  OldPassword: yup.string().required('Required field'),
  NewPassword: yup
    .string()
    .required('Required field')
    .min(8, 'Value must be at minimum 8')
    .max(20, 'Value must be at maximum 20')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Invalid Password, minimum 8 characters, at least one Uppercase letter, one Lowercase letter, one Number and one special character',
    ),
  RepeatPassword: yup
    .string()
    .required('Required field')
    .min(8, 'Minimum 8 characters')
    .max(20, 'Maximum 20 characters')
    .oneOf([yup.ref('NewPassword'), null], 'Passwords does not match'),
})

const PasswordForm = () => {
  const defaultValues = {
    OldPassword: '',
    NewPassword: '',
    RepeatPassword: '',
  }

  const {
    control,
    formState,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues, resolver: yupResolver(schema) })

  const [showMessage, setShowMessage] = useState(false)
  const [email, setEmail] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setEmail(user.email)
    })
  }, [email])

  const onSubmit = async (data) => {
    await Promise.all(
      onAuthStateChanged(auth, (user) => {
        signInWithEmailAndPassword(auth, user.email, data.OldPassword)
          .then(() => {
            updatePassword(user, data.NewPassword)
              .then(() => {
                showSuccess()
              })
              .then(() => {
                signInWithEmailAndPassword(auth, user.email, data.NewPassword)
              })
              .then(() => {
                reset()
              })
              .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                showError(errorCode, errorMessage)
              })
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            showError(errorCode, errorMessage)
          })
      }),
    )
  }

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  }

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  )
  const passwordHeader = <h6>Pick a password</h6>
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>At least one symbol</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  )

  /* Handle toasts */
  const toast = useRef(null)

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Password updated successfully',
      life: 3000,
    })
  }

  const showInfo = (errorCode, errorMessage) => {
    toast.current.show({
      severity: 'info',
      summary: 'Confirmation',
      detail: 'Email with reset link has been sent. Check your spam if you miss it',
      life: 3000,
    })
  }
  const showError = (errorCode, errorMessage) => {
    toast.current.show({
      severity: 'error',
      summary: errorCode,
      detail: errorMessage,
      life: 3000,
    })
  }

  const confirm1 = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept,
      reject,
    })
  }

  const accept = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        showInfo()
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        showError(errorCode, errorMessage)
      })
  }

  const reject = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Rejected',
      detail: 'You have rejected',
      life: 3000,
    })
  }

  return (
    <>
      <div className="form-demo">
        <Dialog
          visible={showMessage}
          onHide={() => setShowMessage(false)}
          position="top"
          footer={dialogFooter}
          showHeader={false}
          breakpoints={{ '960px': '80vw' }}
          style={{ width: '30vw' }}
        >
          <div className="flex justify-content-center flex-column pt-6 px-3">
            <i
              className="pi pi-check-circle"
              style={{ fontSize: '5rem', color: 'var(--green-500)' }}
            ></i>
            <h5>Password Change Successful!</h5>
            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
              Your Password has been changed successfully. Please click button below to login again
              with your new password.
            </p>
          </div>
        </Dialog>

        <div>
          <Toast ref={toast} />
        </div>
        <div className="flex justify-content-center">
          <div className="card p-2">
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="OldPassword"
                    control={control}
                    render={({ field: { ref, ...field } }) => {
                      return (
                        <Password
                          autoComplete="on"
                          id={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          toggleMask
                          feedback={false}
                          className={classNames({
                            'p-invalid': formState?.errors?.OldPassword,
                          })}
                        />
                      )
                    }}
                  />
                  <label
                    htmlFor="OldPassword"
                    className={classNames({ 'p-error': errors.OldPassword })}
                  >
                    Current Password*
                  </label>
                </span>
                {getFormErrorMessage('OldPassword')}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="NewPassword"
                    control={control}
                    rules={{ required: 'New Password is required.' }}
                    render={({ field: { ref, ...field } }) => {
                      return (
                        <Password
                          id={field.name}
                          {...field}
                          toggleMask
                          maxLength={20}
                          className={classNames({
                            'p-invalid': formState?.errors?.NewPassword,
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                      )
                    }}
                  />
                  <label
                    htmlFor="NewPassword"
                    className={classNames({ 'p-error': errors.NewPassword })}
                  >
                    New Password*
                  </label>
                </span>
                {getFormErrorMessage('NewPassword')}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="RepeatPassword"
                    control={control}
                    rules={{ required: 'Repeat Password is required.' }}
                    render={({ field: { ref, ...field } }) => {
                      return (
                        <Password
                          id={field.name}
                          {...field}
                          feedback={false}
                          toggleMask
                          className={classNames({
                            'p-invalid': formState?.errors?.RepeatPassword,
                          })}
                        />
                      )
                    }}
                  />
                  <label
                    htmlFor="RepeatPassword"
                    className={classNames({ 'p-error': errors.RepeatPassword })}
                  >
                    Repeat Password*
                  </label>
                </span>
                {getFormErrorMessage('RepeatPassword')}
              </div>

              <Button
                type="submit"
                label="Update Password"
                className="mt-2 p-button-raised"
                icon="pi pi-send"
                iconPos="right"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="card m-2">
        <Button
          type="submit"
          label="Reset password"
          className="p-button-raised p-button-danger p-button-text"
          icon="pi pi-wrench"
          iconPos="right"
          onClick={confirm1}
        />
        <ConfirmPopup />
      </div>
    </>
  )
}

export default PasswordForm
