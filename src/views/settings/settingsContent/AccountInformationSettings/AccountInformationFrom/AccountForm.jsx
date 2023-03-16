import React, { useRef } from 'react'
import propTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { putAccountDetails } from '../../../../../Service/Settings/apiAccountInformationSettings'
import './style.css'

/* form validation */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(30, 'Company name must be at most 30 characters')
    .matches(/^[a-zA-Z ]*$/, 'Only alphabetic characters allowed'),
  login: yup
    .string()
    .required('Email is required')
    .min(4, 'Email must be at least 4 characters')
    .max(30, 'Email name must be at most 30 characters')
    .email('Email is not valid'),
})

const AccountForm = ({ preloadedValues }) => {
  /* form */
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ defaultValues: preloadedValues, resolver: yupResolver(schema) })

  const getFormErrorMessage = (title) => {
    return errors[title] && <small className="p-error">{errors[title].message}</small>
  }

  console.log('preloadedValues: ', preloadedValues)

  const submitForm = (data) => {
    console.log('data: ', data)
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('login', data.login)

    putAccountDetails(formData)
      .then(function (response) {
        if (response.status === 200) {
          console.log('Account Form sent successfully!')
          showSuccess()
        } else {
          console.log('error')
          showError()
        }
      })
      .catch(function (error) {
        console.log('Account Form didnt send. Reason: ', error)
        showError()
      })
  }

  /* handle toast */
  const toast = useRef(null)

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'You successfully updated your account details.',
      life: 5000,
    })
  }

  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error Message',
      detail: 'Sorry, Please reload page or try again later.',
      life: 5000,
    })
  }

  return (
    <>
      <div>
        <Toast ref={toast} />
      </div>
      <div className="form-demo">
        <div className="flex justify-content-center">
          <div>
            <div className="card" style={{ padding: '10px' }}>
              <form
                onSubmit={handleSubmit(submitForm)}
                encType="multipart/form-data"
                className="p-fluid"
              >
                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${errors.name ? 'pi-exclamation-circle' : 'pi-id-card'}`}
                      style={{ color: errors.name ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      maxLength={30}
                      name="name"
                      placeholder=""
                      {...register('name')}
                      style={{ border: errors.name ? '1px solid red' : '' }}
                    />
                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>
                      User name
                    </label>
                  </span>
                  {getFormErrorMessage('name')}
                </div>

                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${errors.login ? 'pi-exclamation-circle' : 'pi-at'}`}
                      style={{ color: errors.login ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      disabled
                      maxLength={70}
                      name="login"
                      placeholder=""
                      {...register('login')}
                      style={{ border: errors.login ? '1px solid red' : '' }}
                    />
                    <label htmlFor="login" className={classNames({ 'p-error': errors.name })}>
                      Email
                    </label>
                  </span>
                  {getFormErrorMessage('login')}
                </div>

                {isValid ? (
                  <Button
                    type="submit"
                    label="Update account details"
                    className="p-button-raised mt-2"
                    icon="pi pi-send"
                    iconPos="right"
                  />
                ) : (
                  <Button
                    type="submit"
                    disabled
                    label="Please enter a valid name"
                    className="p-button-warning mt-2"
                    icon="pi pi-exclamation-triangle"
                    iconPos="right"
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountForm

AccountForm.propTypes = {
  preloadedValues: propTypes.any,
}
