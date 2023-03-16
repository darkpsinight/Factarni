import React, { useRef } from 'react'
import propTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { putInvoicePreference } from '../../../../../Service/Settings/apiInvoicePreferenceSettings'
import './style.css'

/* form validation */
const schema = yup.object().shape({
  timbre: yup.number().typeError('Value must be a number').min(0, 'Value must be at least 0'),
  digits: yup
    .number()
    .typeError('Value must be a number')
    .required('Number of price Degits is required')
    .integer('Only integer number allowed')
    .min(0, 'Value must be at minimum 0')
    .max(3, 'Value must be at maximum 3'),
  quantity_digits: yup
    .number()
    .typeError('Value must be a number')
    .required('Quantity Degits is required')
    .integer('Only integer number allowed')
    .min(0, 'Value must be at minimum 0')
    .max(9, 'Value must be at maximum 9'),
  footer: yup.string().max(255, 'Maximum of 255 characters allowed'),
})

const CompanyForm = ({ preloadedValues }) => {
  /* form */
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ defaultValues: preloadedValues, resolver: yupResolver(schema) })

  const getFormErrorMessage = (title) => {
    return errors[title] && <small className="p-error">{errors[title].message}</small>
  }

  const submitForm = (data) => {
    let newData = { ...data }
    console.log('data: ', newData)
    if (newData.discount === false) {
      newData.discount = 0
    } else {
      newData.discount = 1
    }
    if (newData.article_edition === false) {
      newData.article_edition = 0
    } else {
      newData.article_edition = 1
    }

    putInvoicePreference(preloadedValues.id, newData)
      .then(function (response) {
        if (response.status === 200) {
          console.log('Data sent successfully!')
          showSuccess()
        } else {
          console.log('error')
          showError()
        }
      })
      .catch(function (error) {
        console.log('Data didnt send. Reason: ', error)
        showError()
      })
  }

  /* handle toast */
  const toast = useRef(null)

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'You successfully updated your invoice preferences.',
      life: 5000,
    })
  }

  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error Occured',
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
              <form onSubmit={handleSubmit(submitForm)} className="p-fluid">
                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${errors.digits ? 'pi-exclamation-circle' : 'pi-calculator'}`}
                      style={{ color: errors.digits ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      maxLength={1}
                      name="digits"
                      placeholder=""
                      {...register('digits')}
                      style={{ border: errors.digits ? '1px solid red' : '' }}
                    />
                    <label htmlFor="digits" className={classNames({ 'p-error': errors.name })}>
                      Number of price&apos;s digits
                    </label>
                  </span>
                  {getFormErrorMessage('digits')}
                </div>

                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${
                        errors.quantity_digits ? 'pi-exclamation-circle' : 'pi-filter'
                      }`}
                      style={{ color: errors.quantity_digits ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      maxLength={1}
                      name="quantity_digits"
                      placeholder=""
                      {...register('quantity_digits')}
                      style={{ border: errors.quantity_digits ? '1px solid red' : '' }}
                    />
                    <label
                      htmlFor="quantity_digits"
                      className={classNames({ 'p-error': errors.name })}
                    >
                      Number of quantity degits
                    </label>
                  </span>
                  {getFormErrorMessage('quantity_digits')}
                </div>

                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${errors.timbre ? 'pi-exclamation-circle' : 'pi-percentage'}`}
                      style={{ color: errors.timbre ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      maxLength={13}
                      name="timbre"
                      {...register('timbre')}
                      style={{ border: errors.timbre ? '1px solid red' : '' }}
                    />
                    <label htmlFor="timbre" className={classNames({ 'p-error': errors.name })}>
                      Stamp
                    </label>
                  </span>
                  {getFormErrorMessage('timbre')}
                </div>

                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${errors.footer ? 'pi-exclamation-circle' : 'pi-align-left'}`}
                      style={{ color: errors.footer ? 'red' : '' }}
                    />
                    <InputTextarea
                      type="text"
                      maxLength={255}
                      rows={5}
                      cols={30}
                      autoResize
                      name="footer"
                      placeholder=""
                      {...register('footer')}
                      style={{ border: errors.footer ? '1px solid red' : '' }}
                    />
                    <label htmlFor="footer" className={classNames({ 'p-error': errors.name })}>
                      Footer
                    </label>
                  </span>
                  {getFormErrorMessage('footer')}
                </div>

                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '20px',
                      }}
                    >
                      <label className="container">
                        Invoice Discount
                        <input type="checkbox" placeholder="Discount" {...register('discount')} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '20px',
                      }}
                    >
                      <label className="container">
                        Edit Item in Invoice
                        <input
                          type="checkbox"
                          placeholder="article_edition"
                          {...register('article_edition')}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>

                {isValid ? (
                  <Button
                    type="submit"
                    label="Update invoice preference"
                    className="mt-2 p-button-raised"
                    icon="pi pi-send"
                    iconPos="right"
                  />
                ) : (
                  <Button
                    type="submit"
                    disabled
                    label="You have entred an invalid data. Please fix it"
                    className=" mt-2 p-button-raised p-button-warning"
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

export default CompanyForm

CompanyForm.propTypes = {
  preloadedValues: propTypes.any,
}
