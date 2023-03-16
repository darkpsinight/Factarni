import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
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
import { getUsers, editUser } from 'src/Service/apiArticle'
import { getVats } from 'src/Service/apiVat'
import MuiToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/system'

const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: selectedColor,
  },
}))

const theme = createTheme({
  palette: {
    text: {
      primary: '#00ff00',
    },
  },
})

export default function DialogEditArticle(props) {
  const [ViewEdit, setEditShow] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [id, setId] = useState('')
  const [code, setCode] = useState('')
  const [article, setArticle] = useState('')
  const [price, setPrice] = useState(null)
  const [vat, setVat] = useState(null)
  const [status, setStatus] = useState(null)
  const [articleData, setArticleData] = useState([])
  const [vatselect, setVatSelect] = useState([])
  const user = { id, code, article, price, vat, status }

  const handleselected = (event, newselected) => {
    setStatus(newselected)
  }

  const normalize = (v) => ({
    code: String(v.code),
    article: String(v.article),
    price: Number(v.price),
    vat: Number(v.vat),
    status: Number(v.status),
  })

  const handleEditShow = () => {
    setEditShow(true)
  }
  const handleEditClose = () => {
    setEditShow(false)
  }

  const handleEdit = () => {
    editUser(props.data, normalize(user)).then(() => props.getAllUsers())
    setNotify({
      isOpen: true,
      message: 'Article Edited Successfully.',
      type: 'info',
    })
  }

  useEffect(() => {
    const loadArticleDetails = async () => {
      const response = await getUsers(id)
      setArticleData(response.data.find((x) => x.id === props.data))
    }
    loadArticleDetails()
  }, [props.data, id])

  useEffect(() => {
    setCode(articleData.code)
    setArticle(articleData.article)
    setPrice(articleData.price)
    setVat(articleData.vat?.id)
    setStatus(articleData.status)
  }, [
    articleData.code,
    articleData.article,
    articleData.price,
    articleData.vat,
    articleData.status,
  ])

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
        style={{
          marginRight: '10px',
          color: 'info',
          border: 'none',
          boxShadow: `2px 2px 9px -3px rgba(0,0,0,0.6)`,
        }}
        onClick={() => handleEditShow(setId(props.data.id))}
      >
        Edit
      </CButton>
      <CModal
        visible={ViewEdit}
        onClose={handleEditClose}
        backdrop={'static'}
        keyboard={false}
        portal={false}
        scrollable
      >
        <CModalHeader>
          <CModalTitle>Edit Article:</CModalTitle>
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
              name="code"
              onChange={(e) => setCode(e.target.value)}
              defaultValue={articleData.code}
            />
            <CFormInput
              type="text"
              id="exampleFormControlInput2"
              label="Article :"
              placeholder="Enter Article"
              text=" "
              aria-describedby="exampleFormControlInputHelpInline"
              name="article"
              onChange={(e) => setArticle(e.target.value)}
              defaultValue={articleData.article}
            />
            <CFormInput
              type="number"
              id="exampleFormControlInput3"
              label="Price :"
              placeholder="Enter Price"
              aria-describedby="exampleFormControlInputHelpInline"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              defaultValue={articleData.price}
            />
            <CFormSelect
              onChange={(e) => setVat(e.target.value)}
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
            <Box style={{ marginTop: '10px' }}>
              <ThemeProvider theme={theme}>
                <ToggleButtonGroup value={status} exclusive onChange={handleselected}>
                  <ToggleButton
                    value="1"
                    onChange={(e) => setStatus(e.target.value)}
                    selectedColor="green"
                  >
                    Active
                  </ToggleButton>
                  <ToggleButton
                    value="0"
                    onChange={(e) => setStatus(e.target.value)}
                    selectedColor="red"
                  >
                    Not Active
                  </ToggleButton>
                  <ToggleButton
                    value="2"
                    onChange={(e) => setStatus(e.target.value)}
                    selectedColor="gray"
                  >
                    Suspended
                  </ToggleButton>
                </ToggleButtonGroup>
              </ThemeProvider>
            </Box>
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

DialogEditArticle.propTypes = {
  getAllUsers: propTypes.func,
  data: propTypes.any,
}
