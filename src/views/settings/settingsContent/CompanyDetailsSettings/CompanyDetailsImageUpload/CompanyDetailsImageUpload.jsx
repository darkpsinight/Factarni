import React from 'react'
import { Image } from 'primereact/image'
import { Button } from 'primereact/button'
import { Form } from 'react-bootstrap'
import propTypes from 'prop-types'

const CompanyDetailsImageUpload = (props) => {
  const onLoadingClick = () => {
    props.setVisible(!props.visible)
  }

  const handleFileChange = () => {
    props.setSelectedFile(!props.selectedFile)
  }

  console.log('preloadedValues:', props.preloadedValues)
  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(props.preloadedValues.logo?.attachment.data)),
  )

  return (
    <>
      <div className="card">
        <h5 className="text-center pt-3">Company Logo</h5>
        <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '10px' }}>
          <Image
            src={`data:image/*;charset=utf-8;base64,${base64String}`}
            alt="Image"
            width="250"
            preview
          />
        </div>
        <Button
          label={!props.visible ? 'Upload New Logo' : 'Cancel'}
          icon={!props.visible ? 'pi pi-upload' : 'pi pi-times'}
          iconPos="right"
          onClick={onLoadingClick}
          style={{
            margin: '10px',
            marginBottom: '10px',
            backgroundColor: props.visible ? '#d9534f' : '',
          }}
        />
        <div>
          {props.visible ? (
            <div style={{ margin: '10px' }}>
              <div className="card" style={{ padding: '10px' }}>
                <Form.Group controlId="formFileLg" className="mb-3">
                  <Form.Label column="lg" lg={5}>
                    Upload a Logo
                  </Form.Label>
                  <Form.Control
                    type="file"
                    {...props.register('file')}
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}

export default CompanyDetailsImageUpload

CompanyDetailsImageUpload.propTypes = {
  register: propTypes.func,
  selectedFile: propTypes.any,
  setSelectedFile: propTypes.func,
  preloadedValues: propTypes.any,
  setVisible: propTypes.func,
  visible: propTypes.any,
}
