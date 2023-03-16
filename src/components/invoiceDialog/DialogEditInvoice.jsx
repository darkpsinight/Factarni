import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import EditIcon from '@mui/icons-material/Edit'
import {
  CButton,
  CForm,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { getUsers, editUser } from 'src/Service/apiArticle'
import { getVats } from 'src/Service/apiVat'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { IconButton } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
import { Card, Form, InputGroup } from 'react-bootstrap'

export default function DialogEditInvoice(props) {
  const [id, setId] = useState('')
  const [ViewEdit, setEditShow] = useState(false)
  const [code, setCode] = useState('')
  const [article, setArticle] = useState('')
  const [price, setPrice] = useState(null)
  const [vat, setVat] = useState(null)
  const [vatselect, setVatSelect] = useState([])
  const [articleData, setArticleData] = useState([])
  let [totalPrice, setTotal] = useState(0)
  const editedArticle = { id, code, article, price, vat } //maybe remove id ?

  const normalize = (v) => ({
    code: String(v.code),
    article: String(v.article),
    price: Number(v.price),
    vat: Number(v.vat),
    status: Number(v.status),
  })

  useEffect(() => {
    setCode(articleData.code)
    setArticle(articleData.article)
    setPrice(articleData.price)
    setVat(articleData.vat?.id)
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

  const handleEdit = () => {
    editUser(props.data, normalize(editedArticle))
  }

  useEffect(() => {
    const loadArticleDetails = async () => {
      const response = await getUsers(id)
      setArticleData(response.data.find((x) => x.id === props.data))
    }
    loadArticleDetails()
  }, [props.data, id])

  const handleEditShow = () => {
    setEditShow(true)
  }
  const handleEditClose = () => {
    setEditShow(false)
  }

  /* Counter Quantity */
  let incNum = () => {
    if (props.num < 10000) {
      props.setArraySelectedArticles(
        props.arraySelectedArticles.map((item) =>
          item.id === props.data ? { ...item, quantity: Number(props.num) + 1 } : item,
        ),
      )
    }
  }
  let decNum = () => {
    if (props.num > 1) {
      props.setArraySelectedArticles(
        props.arraySelectedArticles.map((item) =>
          item.id === props.data ? { ...item, quantity: Number(props.num) - 1 } : item,
        ),
      )
    }
  }
  let maxPercent = (e) => {
    props.setNum(e.target.value)
  }

  /* totalPrice Price before Discount */
  useEffect(() => {
    setTotal(props.num * price)
    /* console.log(totalPrice) */
  }, [price, props.num, totalPrice])

  /* Discount rate Percent Min-Max Value */
  const min = 0
  const max = 100

  const [discount, setDiscount] = useState(0) // = Discount_rate

  const handleChangee = (event) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)))
    setDiscount(value)
    props.setArraySelectedArticles(
      props.arraySelectedArticles.map((item) =>
        item.id === props.data ? { ...item, discount: value / 100 } : item,
      ),
    )
  }

  /* select all when Discount rate egal zero */
  const handleFocus = (event) => event.target.select()

  /* Discount on total */
  const [discountOnTotal, setDiscountOnTotal] = useState(0)

  useEffect(() => {
    let x = (totalPrice / 100) * discount
    setDiscountOnTotal((Math.round(x * 100) / 100).toFixed(3))
  }, [totalPrice, discount])

  /* total */
  const [total, setHT] = useState(0)

  useEffect(() => {
    let x = price * props.num * (1 - discount / 100)
    let y = (Math.round(x * 100) / 100).toFixed(3)
    props.setArraySelectedArticles(
      props.arraySelectedArticles.map((item) =>
        item.id === props.data ? { ...item, total: Number(y) } : item,
      ),
    )
    // eslint-disable-next-line
  }, [price, props.num, discount])

  useEffect(() => {
    let x = price * props.num * (1 - discount / 100)
    let y = (Math.round(x * 100) / 100).toFixed(3)
    setHT(y)
  }, [price, props.num, discount])

  /* TTC */
  const [TTC, setTTC] = useState(0)

  useEffect(() => {
    let x = price * props.num * (1 - discount / 100)
    let y = x * (1 + Number(articleData.vat?.vat))
    let z = (Math.round(y * 100) / 100).toFixed(3)
    setTTC(z)
  }, [price, props.num, discount, articleData.vat?.vat])

  useEffect(() => {
    props.setArraySelectedArticles(
      props.arraySelectedArticles.map((item) =>
        item.id === props.data ? { ...item, TTC: Number(TTC) } : item,
      ),
    )
    // eslint-disable-next-line
  }, [TTC])

  return (
    <>
      <IconButton
        style={{
          border: '1px',
          margin: '-10px',
          height: '50px',
          width: '50px',
        }}
        onClick={() => handleEditShow(setId(props.data.id))}
      >
        <EditIcon style={{ color: '#24d12c' }} />
      </IconButton>
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
          <button onClick={() => console.log(props.arraySelectedArticles)}>aaa</button>
        </CModalHeader>
        <CModalBody>
          <CForm style={{ textAlign: 'left' }}>
            <InputGroup className="mb-3 mt-2">
              <InputGroup.Text id="basic-addon1">Code :</InputGroup.Text>
              <Form.Control
                id="exampleFormControlInput0"
                name="code"
                type="number"
                defaultValue={articleData.code}
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-2">
              <InputGroup.Text id="basic-addon1">Article :</InputGroup.Text>
              <Form.Control
                id="exampleFormControlInput1"
                name="article"
                type="text"
                placeholder="Enter Article..."
                onChange={(e) => setArticle(e.target.value)}
                defaultValue={articleData.article}
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-2">
              <InputGroup.Text id="basic-addon1">Price :</InputGroup.Text>
              <Form.Control
                id="exampleFormControlInput2"
                name="price"
                type="number"
                min="0"
                max="100"
                placeholder="Enter Price ..."
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={articleData.price}
              />
            </InputGroup>
            <div
              style={{
                display: 'flex',
                border: '1px solid #D2D2D5',
                borderRadius: '5px',
                padding: '5px',
              }}
            >
              <span style={{ fontWeight: '500', margin: '10px' }}>Quantity:</span>
              <div className="container">
                <div
                  className="input-group"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="input-group-prepend">
                    <button className="btn btn-outline-primary" type="button" onClick={decNum}>
                      <RemoveIcon />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      marginLeft: '10px',
                      marginRight: '10px',
                      maxWidth: '100px',
                      textAlign: 'center',
                      fontSize: '20px',
                      fontWeight: '600',
                    }}
                    value={props.num}
                    onChange={maxPercent}
                    onFocus={handleFocus}
                  />
                  <div className="input-group-prepend">
                    <button className="btn btn-outline-primary" type="button" onClick={incNum}>
                      <AddIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="input-group" style={{ marginTop: '10px' }}>
              <InputGroup.Text id="basic-addon1">Vat :</InputGroup.Text>
              <CFormSelect
                onChange={(e) => {
                  setVat(e.target.value)
                  setArticleData({
                    ...articleData,
                    // eslint-disable-next-line
                    vat: vatselect.find((i) => i.id == e.target.value),
                  })
                }}
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
            </div>
            <div>
              <InputGroup className="mb-2 mt-2">
                <InputGroup.Text id="basic-addon1">Discount rate :</InputGroup.Text>
                <Form.Control
                  id="exampleFormControlInput1"
                  name="DiscountPercent"
                  type="number"
                  placeholder="Enter Discount rate"
                  value={discount}
                  onChange={handleChangee}
                  onFocus={handleFocus}
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
            </div>
            <div>
              <InputGroup className="mb-2 mt-2">
                <InputGroup.Text id="basic-addon1">Discount on total :</InputGroup.Text>
                <Form.Control
                  id="exampleFormControlInput4"
                  name="DiscountTotal"
                  type="number"
                  placeholder="Enter Discount on total"
                  aria-describedby="exampleFormControlInputHelpInline"
                  value={discountOnTotal}
                />
                <InputGroup.Text>DT</InputGroup.Text>
              </InputGroup>
            </div>
            <Card>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  flexDirection: 'center',
                  alignItems: 'center',
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <MoneyOffIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Total HT:"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        <span
                          style={{
                            fontSize: '20px',
                            backgroundColor: '#D8DBE0',
                            color: 'black',
                            fontWeight: 600,
                          }}
                        >
                          {total}
                        </span>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {` `}DT
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <PriceCheckIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Total TTC:"
                    secondary={
                      <React.Fragment>
                        <span
                          style={{
                            fontSize: '20px',
                            backgroundColor: '#D8DBE0',
                            color: 'black',
                            fontWeight: 600,
                          }}
                        >
                          {TTC}
                        </span>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {` `}DT
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Card>
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

DialogEditInvoice.propTypes = {
  getAllUsers: propTypes.func,
  data: propTypes.any,
  setNum: propTypes.func,
  num: propTypes.any,
  setArraySelectedArticles: propTypes.func,
  arraySelectedArticles: propTypes.any,
  total: propTypes.any,
}
