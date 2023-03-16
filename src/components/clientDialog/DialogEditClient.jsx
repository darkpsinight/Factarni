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
import { editClient } from '../../Service/apiClients'
import EditIcon from '@mui/icons-material/Edit'
import propTypes from 'prop-types'
import { toast } from 'react-toastify'

const DialogEditClient = (props) => {
  const [visible, setVisible] = useState(false)
  const [client, setClient] = useState(props.data)

  /* const { ...props.data } = client */

  const onValueChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value })
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

  const editClientDetails = async () => {
    console.log('sending client data : ', client)
    await editClient(client.id, normalize(client))
    toast.warn(`${client.name} edited successfully !`)
    props.getAllClients()
  }

  return (
    <>
      <EditIcon style={{ color: 'green' }} onClick={() => setVisible(!visible)} />
      <CModal visible={visible} backdrop={'static'} scrollable onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Edit client</CModalTitle>
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
                value={client.name}
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
                value={client.address}
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
                value={client.email}
                onChange={(e) => onValueChange(e)}
              />
            </div>
            <div className="mb-1">
              <CFormLabel htmlFor="telephone">Telephone:</CFormLabel>
              <CFormInput
                type="number"
                id="telephone"
                name="telephone"
                value={client.telephone}
                onChange={(e) => onValueChange(e)}
              />
            </div>
            <div className="mb-1">
              <CFormLabel htmlFor="fax">Fax:</CFormLabel>
              <CFormInput
                type="number"
                id="fax"
                name="fax"
                value={client.fax}
                onChange={(e) => onValueChange(e)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="tax_identification">Tax_identification:</CFormLabel>
              <CFormInput
                require
                type="text"
                id="tax_identification"
                name="tax_identification"
                value={client.tax_identification}
                onChange={(e) => onValueChange(e)}
              />
            </div>
            <CFormCheck
              id="timbre"
              label="Timbre"
              name="timbre"
              value={client.timbre}
              checked={client.timbre}
              onChange={() => {
                setClient({ ...client, timbre: !client.timbre })
              }}
            />
            <CFormCheck
              id="vat"
              label="Vat"
              name="vat"
              value={client.vat}
              checked={client.vat}
              onChange={() => {
                setClient({ ...client, vat: !client.vat })
              }}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              editClientDetails()
              setVisible(false)
            }}
          >
            Update
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DialogEditClient

DialogEditClient.propTypes = {
  data: propTypes.any,
  getAllClients: propTypes.any,
}
