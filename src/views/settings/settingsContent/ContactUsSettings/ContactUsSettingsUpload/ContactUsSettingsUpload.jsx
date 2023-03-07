import React from 'react'
import propTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const ContactUsSettingsUpload = (props) => {
  const handleFileChange = () => {
    props.setSelectedFile(!props.selectedFile)
  }

  return (
    <>
      <div>
        <div className="card" style={{ padding: '10px' }}>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label column="lg" lg={5}>
              Upload a screenshot
            </Form.Label>
            <Form.Control type="file" {...props.register('file')} onChange={handleFileChange} />
          </Form.Group>
        </div>
      </div>
    </>
  )
}

export default ContactUsSettingsUpload

ContactUsSettingsUpload.propTypes = {
  register: propTypes.any,
  setSelectedFile: propTypes.func,
  selectedFile: propTypes.bool,
}
