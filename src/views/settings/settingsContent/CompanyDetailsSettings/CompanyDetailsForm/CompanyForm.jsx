import React, { useRef, useState } from 'react'
import propTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import CompanyDetailsImageUpload from '../CompanyDetailsImageUpload/CompanyDetailsImageUpload'
import { putCompanyDetails } from '../../../../../Service/Settings/apiCompanyDetailsSettings'
import './style.css'

/* form validation */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Company name is required')
    .min(5, 'Company name must be at least 5 characters')
    .max(70, 'Company name must be at most 70 characters')
    .matches(/^[a-zA-Z ]*$/, 'Only alphabetic characters allowed'),
  address: yup
    .string()
    .required('Adress is required')
    .min(5, 'Address must be at least 5 characters')
    .max(70, 'Address must be at most 70 characters')
    .matches(/^[a-zA-Z0-9 ]*$/, 'Only alphabetic and numeric characters allowed'),
  tax_identification: yup
    .string()
    .required('Matricule fiscal is required')
    .test('len', 'Must be exactly 13 characters', (val) => val.length === 13)
    .matches(/^[a-zA-Z0-9 ]*$/, 'Only alphabetic and numeric characters allowed'),
  telephone: yup
    .string()
    .required('Telephone is required')
    .test('len', 'Must be exactly 8 characters', (val) => val.length === 8)
    .matches(/^\d+$/, 'Only numeric characters allowed'),
  fax: yup
    .string()
    .required('Fax is required')
    .test('len', 'Must be exactly 8 characters', (val) => val.length === 8)
    .matches(/^\d+$/, 'Only numeric characters allowed'),
  rib: yup
    .string()
    .required('RIB is required')
    .test('len', 'Must be exactly 20 numbers', (val) => val.length === 20)
    .matches(/^\d+$/, 'Only numeric characters allowed'),
})

const CompanyForm = ({ preloadedValues }) => {
  /* form */
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ defaultValues: preloadedValues, resolver: yupResolver(schema) })

  const [selectedFile, setSelectedFile] = useState(false)

  const getFormErrorMessage = (title) => {
    return errors[title] && <small className="p-error">{errors[title].message}</small>
  }

  const [visible, setVisible] = useState(false)

  const submitForm = (data) => {
    console.log('data: ', data)
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('address', data.address)
    formData.append('tax_identification', data.tax_identification)
    formData.append('telephone', data.telephone)
    formData.append('fax', data.fax)
    formData.append('rib', data.rib)
    if (selectedFile === true) {
      formData.append('file', data.file?.[0])
    }

    putCompanyDetails(preloadedValues.id, formData)
      .then(function (response) {
        if (response.status === 200) {
          console.log('Message sent successfully!')
          showSuccess()
          setSelectedFile(false)
          setVisible(false)
        } else {
          console.log('error')
          showError()
        }
      })
      .catch(function (error) {
        console.log('Message didnt send. Reason: ', error)
        showError()
      })
  }

  /* handle toast */
  const toast = useRef(null)

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'You successfully updated your company details.',
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
            <CompanyDetailsImageUpload
              register={register}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              preloadedValues={preloadedValues}
              visible={visible}
              setVisible={setVisible}
            />
            <div className="card" style={{ padding: '10px' }}>
              <form
                onSubmit={handleSubmit(submitForm)}
                encType="multipart/form-data"
                className="p-fluid"
              >
                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${errors.name ? 'pi-exclamation-circle' : 'pi-tag'}`}
                      style={{ color: errors.name ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      maxLength={70}
                      name="name"
                      placeholder=""
                      {...register('name')}
                      style={{ border: errors.name ? '1px solid red' : '' }}
                    />
                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>
                      Company name
                    </label>
                  </span>
                  {getFormErrorMessage('name')}
                </div>

                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${errors.address ? 'pi-exclamation-circle' : 'pi-map-marker'}`}
                      style={{ color: errors.address ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      maxLength={70}
                      name="address"
                      placeholder=""
                      {...register('address')}
                      style={{ border: errors.address ? '1px solid red' : '' }}
                    />
                    <label htmlFor="address" className={classNames({ 'p-error': errors.name })}>
                      Address
                    </label>
                  </span>
                  {getFormErrorMessage('address')}
                </div>

                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${
                        errors.tax_identification ? 'pi-exclamation-circle' : 'pi-hashtag'
                      }`}
                      style={{ color: errors.tax_identification ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      maxLength={13}
                      name="tax_identification"
                      {...register('tax_identification')}
                      style={{ border: errors.tax_identification ? '1px solid red' : '' }}
                    />
                    <label
                      htmlFor="tax_identification"
                      className={classNames({ 'p-error': errors.name })}
                    >
                      Matricule Fiscal
                    </label>
                  </span>
                  {getFormErrorMessage('tax_identification')}
                </div>

                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${errors.telephone ? 'pi-exclamation-circle' : 'pi-mobile'}`}
                      style={{ color: errors.telephone ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      maxLength={8}
                      name="telephone"
                      placeholder=""
                      {...register('telephone')}
                      style={{ border: errors.telephone ? '1px solid red' : '' }}
                    />
                    <label htmlFor="telephone" className={classNames({ 'p-error': errors.name })}>
                      Telephone
                    </label>
                  </span>
                  {getFormErrorMessage('telephone')}
                </div>

                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${errors.fax ? 'pi-exclamation-circle' : 'pi-phone'}`}
                      style={{ color: errors.fax ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      maxLength={8}
                      name="fax"
                      placeholder=""
                      {...register('fax')}
                      style={{ border: errors.fax ? '1px solid red' : '' }}
                    />
                    <label htmlFor="fax" className={classNames({ 'p-error': errors.name })}>
                      Fax
                    </label>
                  </span>
                  {getFormErrorMessage('fax')}
                </div>

                <div className="field">
                  <span className="p-float-label p-input-icon-left">
                    <i
                      className={`pi ${errors.rib ? 'pi-exclamation-circle' : 'pi-credit-card'}`}
                      style={{ color: errors.rib ? 'red' : '' }}
                    />
                    <InputText
                      type="text"
                      maxLength={20}
                      name="rib"
                      placeholder=""
                      {...register('rib')}
                      style={{ border: errors.rib ? '1px solid red' : '' }}
                    />
                    <label htmlFor="rib" className={classNames({ 'p-error': errors.name })}>
                      RIB
                    </label>
                  </span>
                  {getFormErrorMessage('rib')}
                </div>

                {isValid ? (
                  <Button
                    type="submit"
                    label="Update company details"
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
