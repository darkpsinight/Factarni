import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { CardActions, CardContent, Collapse } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Editor } from 'primereact/editor'
import ContactUsSettingsUpload from '../ContactUsSettingsUpload/ContactUsSettingsUpload'
import { postContactUs } from '../../../../../Service/Settings/apiContactUs'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

/* form validation */
const schema = yup.object().shape({
  title: yup.string().required().min(10).max(60),
})

const ContactUsSettingsForm = () => {
  const [selectedFile, setSelectedFile] = useState(false)

  /* card */
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  /* form */
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(schema) })

  const getFormErrorMessage = (title) => {
    return errors[title] && <small className="p-error">{errors[title].message}</small>
  }

  useEffect(() => {
    register('message', { required: true, minLength: 15, maxLength: 5000 })
  }, [register])

  const onEditorStateChange = (editorState) => {
    setValue('message', editorState)
  }

  const editorContent = watch('message')

  const submitForm = (data) => {
    console.log('data: ', data)
    console.log('data of message: ', data.message.htmlValue)
    let formData = new FormData()
    formData.append('title', data.title)
    formData.append('message', data.message.htmlValue)
    if (selectedFile === true) {
      formData.append('file', data.file?.[0])
    }

    postContactUs(formData)
      .then(function (response) {
        if (response.status === 200) {
          console.log('Message sent successfully!')
          showSuccess()
          reset()
          setExpanded(false)
          setSelectedFile(false)
        } else {
          console.log('error')
          showError()
        }
      })
      .catch(function (error) {
        console.log('Message didnt send. Reason: ', error)
      })
  }

  /* handle toast */
  const toast = useRef(null)

  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Sorry, Please reload page or try again later.',
      life: 5000,
    })
  }

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail:
        'The form has been submitted successfully and a representative will get in touch with you.',
      life: 5000,
    })
  }

  return (
    <>
      <div>
        <Toast ref={toast} />
      </div>
      <div className="flex justify-content-center">
        <div className="card" style={{ padding: '20px' }}>
          <form
            onSubmit={handleSubmit(submitForm)}
            encType="multipart/form-data"
            className="p-fluid"
          >
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i
                  className={`pi ${errors.title ? 'pi-exclamation-circle' : 'pi-bookmark'}`}
                  style={{ color: errors.title ? 'red' : '' }}
                />
                <InputText
                  type="text"
                  name="title"
                  placeholder="Specify shortly your problem or idea"
                  autoFocus
                  {...register('title')}
                  style={{ border: errors.title ? '1px solid red' : '' }}
                />
                <label htmlFor="title" className={classNames({ 'p-error': errors.name })}>
                  Title<span style={{ color: 'red' }}>*</span>
                </label>
              </span>
              {getFormErrorMessage('title')}
            </div>

            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <Editor
                  style={{ height: '320px' }}
                  name="messsage"
                  placeholder="Additionnal info"
                  maxLength={5000}
                  value={editorContent}
                  onTextChange={onEditorStateChange}
                />
              </span>
              {getFormErrorMessage('message')}
            </div>

            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <AttachFileIcon fontSize="large" />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <ContactUsSettingsUpload
                  register={register}
                  setSelectedFile={setSelectedFile}
                  selectedFile={selectedFile}
                />
              </CardContent>
            </Collapse>

            <Button
              type="submit"
              label="Send message"
              className="mt-2"
              icon="pi pi-send"
              iconPos="right"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactUsSettingsForm
