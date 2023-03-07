import React, { useState } from 'react'
import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { addClient } from '../../Service/apiClients'
import propTypes from 'prop-types'
import { toast } from 'react-toastify'

const initialValue = {
  name: '',
  address: '',
  email: '',
  telephone: '',
  fax: '',
  tax_identification: '',
  timbre: 0,
  vat: 0,
}

const DialogAddClient = (props) => {
  const [visible, setVisible] = useState(false)
  const [client, setclient] = useState(initialValue)

  const { name, address, email, telephone, fax, timbre, vat, tax_identification } = client

  const onValueChange = (e) => {
    setclient({ ...client, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  const normalize = (v) => ({
    name: String(v.name),
    address: String(v.address),
    email: String(v.email),
    telephone: Number(v.telephone),
    fax: Number(v.fax),
    tax_identification: Number(v.tax_identification),
    timbre: Number(v.timbre),
    vat: Number(v.vat),
  })

  const addClientDetails = async () => {
    console.log('sending client data : ', client)
    if (name === '' || tax_identification === '') {
      toast.error(`Please fill the form correctly`)
    } else {
      await addClient(normalize(client))
      toast.success(`${client.name} added successfully !`)
      props.getAllClients()
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row-reverse', marginBottom: '20px' }}>
        <CButton
          color="success"
          style={{
            float: 'right',
            display: 'flex',
            marginLeft: '14px',
            // marginRight: '-10px',
          }}
          onClick={() => setVisible(!visible)}
        >
          <span style={{ textAlign: 'center', color: 'white', fontWeight: '500' }}></span>
          <PersonAddAlt1Icon style={{ color: 'white' }} />
        </CButton>
        <CModal visible={visible} backdrop={'static'} scrollable onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Add new client</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-1">
                <CFormLabel htmlFor="name">Name:</CFormLabel>
                <CFormInput
                  require
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => onValueChange(e)}
                />
              </div>
              <div className="mb-1">
                <CFormLabel htmlFor="address">Address:</CFormLabel>
                <CFormTextarea
                  required
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => onValueChange(e)}
                />
              </div>
              <div className="mb-1">
                <CFormLabel htmlFor="email">Email:</CFormLabel>
                <CFormInput
                  require
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => onValueChange(e)}
                />
              </div>
              <div className="mb-1">
                <CFormLabel htmlFor="telephone">Telephone:</CFormLabel>
                <CFormInput
                  type="text"
                  id="telephone"
                  name="telephone"
                  title="Numbers only"
                  value={telephone}
                  onChange={(e) => onValueChange(e)}
                  onKeyPress={(event) => {
                    if (!/[0-9 +]/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                />
              </div>
              <div className="mb-1">
                <CFormLabel htmlFor="fax">Fax:</CFormLabel>
                <CFormInput
                  type="text"
                  id="fax"
                  name="fax"
                  title="Numbers only"
                  value={fax}
                  onChange={(e) => onValueChange(e)}
                  onKeyPress={(event) => {
                    if (!/[0-9 +]/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="tax_identification">Tax_identification:</CFormLabel>
                <CFormInput
                  require
                  type="text"
                  id="tax_identification"
                  name="tax_identification"
                  value={tax_identification}
                  onChange={(e) => onValueChange(e)}
                />
              </div>
              <CFormCheck
                id="timbre"
                label="Timbre"
                name="timbre"
                value={timbre}
                checked={timbre}
                onChange={() => {
                  setclient({ ...client, timbre: !timbre })
                }}
              />
              <CFormCheck
                id="vat"
                label="Vat"
                name="vat"
                value={vat}
                checked={vat}
                onChange={() => {
                  setclient({ ...client, vat: !vat })
                }}
              />
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancel
            </CButton>
            <CButton
              type="submit"
              color="primary"
              onClick={() => {
                addClientDetails()
                setVisible(false)
              }}
            >
              Add
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </>
  )
}

export default DialogAddClient

DialogAddClient.propTypes = {
  getAllClients: propTypes.any,
}
