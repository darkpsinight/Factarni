import { useState } from 'react'
import React from 'react'
import propTypes from 'prop-types'
import {
  CButton,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import Notification from 'src/components/Notification'
import AddIcon from '@mui/icons-material/Add'
import { addVat } from 'src/Service/apiVat'

const initialValue = {
  vat: '',
}

export default function DialogAddVat(props) {
  const [visible, setVisible] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [user, setUser] = useState(initialValue)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const { vat } = user

  const normalize = (v) => ({
    vat: Number(v.vat) / 100,
  })

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const addUserDetails = async () => {
    await addVat(normalize(user))
    setNotify({
      isOpen: true,
      message: 'VAT Added Successfully.',
      type: 'success',
    })
    props.getAllVats()
  }

  return (
    <>
      <Notification notify={notify} setNotify={setNotify} />
      <CButton
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          float: 'right',
          marginBottom: '15px',
          marginRight: '30px',
          backgroundColor: '#06ac06',
          border: 'none',
          transition: 'box-shadow .3s',
          boxShadow: `5px 5px 0px 0px rgba(0,0,0,${isHover ? 0.18 : 0})`,
        }}
        onClick={() => setVisible(!visible)}
      >
        Add VAT <AddIcon style={{ fontSize: '30px' }} />
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop={'static'}>
        <CModalHeader>
          <CModalTitle>Add New VAT:</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="exampleFormControlInput4"
              label="VAT :"
              placeholder="Enter VAT"
              text="Must be a percent %"
              aria-describedby="exampleFormControlInputHelpInline"
              onChange={(e) => onValueChange(e)}
              value={vat}
              name="vat"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              addUserDetails()
              setVisible(false)
            }}
          >
            Add
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

DialogAddVat.propTypes = {
  getAllVats: propTypes.func,
}
