import { useEffect, useState } from 'react'
import React from 'react'
import propTypes from 'prop-types'
import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import Notification from 'src/components/Notification'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { addUser } from 'src/Service/apiArticle'
import { getVats } from 'src/Service/apiVat'

const initialValue = {
  code: '',
  article: '',
  price: '',
  vat: '',
  status: '1',
}

export default function DialogAddArticle(props) {
  const [visible, setVisible] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [user, setUser] = useState(initialValue)
  const [vatselect, setVatSelect] = useState([])
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  // eslint-disable-next-line
  const { code, article, price, vat, status } = user

  const normalize = (v) => ({
    code: v.code,
    article: v.article,
    price: Number(v.price),
    vat: Number(v.vat),
    status: Number(v.status),
  })

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  const addUserDetails = async () => {
    await addUser(normalize(user))
    setNotify({
      isOpen: true,
      message: 'Article Added Successfully.',
      type: 'success',
    })
    props.getAllUsers()
  }

  useEffect(() => {
    const loadvatsdetails = async () => {
      const response = await getVats()
      setVatSelect(response.data)
    }
    loadvatsdetails()
  }, [])

  return (
    <>
      <Notification notify={notify} setNotify={setNotify} />
      <CButton
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        color="success"
        style={{
          float: 'right',
          marginBottom: '10px',
          display: 'flex',
          marginLeft: '16px',
          // marginRight: '20px',
          border: 'none',
          transition: 'box-shadow .3s',
          boxShadow: `3px 3px 4px 0px rgba(0,0,0,${isHover ? 0.3 : 0})`,
        }}
        onClick={() => setVisible(!visible)}
      >
        <span>
          <PostAddIcon style={{ color: 'white', transform: 'scale(1.2)' }} />
        </span>
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop={'static'}>
        <CModalHeader>
          <CModalTitle>Add New Article:</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label="Code :"
              placeholder="Enter Code"
              text=" "
              aria-describedby="exampleFormControlInputHelpInline"
              onChange={(e) => onValueChange(e)}
              value={code}
              name="code"
            />
            <CFormInput
              type="text"
              id="exampleFormControlInput2"
              label="Article :"
              placeholder="Enter Article"
              text=" "
              aria-describedby="exampleFormControlInputHelpInline"
              onChange={(e) => onValueChange(e)}
              value={article}
              name="article"
            />
            <CFormInput
              type="number"
              id="exampleFormControlInput3"
              label="Price :"
              placeholder="Enter Price"
              text=" "
              aria-describedby="exampleFormControlInputHelpInline"
              onChange={(e) => onValueChange(e)}
              value={price}
              name="price"
            />

            {/* ------------------------ vat select ------------------------*/}
            <CFormSelect
              onChange={(e) => onValueChange(e)}
              label="VAT :"
              aria-label="vat select"
              name="vat"
              value={vat}
            >
              <option disabled value={''}>
                -- select an option --
              </option>
              {vatselect.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.vat * 100} %
                </option>
              ))}
            </CFormSelect>
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

DialogAddArticle.propTypes = {
  getAllUsers: propTypes.func,
}
