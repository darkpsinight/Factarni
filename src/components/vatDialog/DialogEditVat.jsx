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
import { getVats, editVat } from 'src/Service/apiVat'
import { useEffect } from 'react'

export default function DialogEditVat(props) {
  console.log(props.data)
  //...
  const [ViewEdit, setEditShow] = useState(false)
  const [id, setId] = useState('')
  const [vat, setVat] = useState(null)
  const [articleData, setArticleData] = useState([])
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const user = { vat }

  const normalize = (v) => ({
    vat: Number(v.vat) / 100,
  })

  const handleEditShow = () => {
    setEditShow(true)
  }
  const handleEditClose = () => {
    setEditShow(false)
  }

  const handleEdit = () => {
    editVat(props.data, normalize(user)).then(() => props.getAllVats())
    setNotify({
      isOpen: true,
      message: 'VAT Edited Successfully.',
      type: 'info',
    })
  }

  useEffect(() => {
    const loadArticleDetails = async () => {
      const response = await getVats(id)
      setArticleData(response.data.find((x) => x.id === props.data))
    }
    loadArticleDetails()
  }, [props.data, id])

  return (
    <>
      <Notification notify={notify} setNotify={setNotify} />
      <CButton
        style={{
          marginRight: '10px',
          color: 'info',
          border: 'none',
          boxShadow: `2px 2px 9px -3px rgba(0,0,0,0.6)`,
        }}
        onClick={() => handleEditShow(setId(props.data.id))}
      >
        EDIT
      </CButton>
      <CModal
        visible={ViewEdit}
        onClose={handleEditClose}
        backdrop={'static'}
        keyboard={false}
        portal={false}
      >
        <CModalHeader>
          <CModalTitle>Edit VAT:</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="exampleFormControlInput4"
              label="VAT :"
              placeholder="Enter VAT"
              text="Must be a pourcentage %"
              aria-describedby="exampleFormControlInputHelpInline"
              name="vat"
              onChange={(e) => setVat(e.target.value)}
              defaultValue={articleData.vat * 100}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditShow(false)}>
            Cancel
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              handleEdit()
              setEditShow(false)
            }}
          >
            Update
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

DialogEditVat.propTypes = {
  getAllVats: propTypes.func,
  data: propTypes.any,
}
