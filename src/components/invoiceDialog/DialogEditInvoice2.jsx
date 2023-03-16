import React, { useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import propTypes from 'prop-types'
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Typography,
  InputLabel,
  Box,
  FormControl,
  TextField,
  CircularProgress,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { getClients } from '../../Service/apiClients'
import { getUsers } from '../../Service/apiArticle'
import './style.css'
import { useNavigate } from 'react-router-dom'
import DialogAddArticle from 'src/components/articleDialog/DialogAddArticle'
import DialogAddClient from 'src/components/clientDialog/DialogAddClient'
import Table from 'react-bootstrap/Table'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Typeahead, Highlighter, Menu, MenuItem } from 'react-bootstrap-typeahead'
import { Form, InputGroup } from 'react-bootstrap'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import _ from 'lodash'
import DialogEditInvoiceLines from 'src/components/invoiceDialog/DialogEditInvoiceLines'
import { addInvoice, getHydratedInvoice } from 'src/Service/apiInvoice'
import EditIcon from '@mui/icons-material/Edit'
import Button from 'react-bootstrap/Button'

/* view more Card */
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

/* DropDown Status data Draft=0 or Paid=1*/
const DATA = [
  {
    Id: 0,
    Ad: `Draft`,
  },
  {
    Id: 1,
    Ad: `Paid`,
  },
]

const DialogEditInvoice2 = (props) => {
  const [date, setDate] = useState(null) //                                    date state
  const [clients, setClients] = useState([]) //                                list of full clients data
  const [timbre, setTimbre] = useState(null)
  const [visible, setVisible] = useState(false) //                             modal visibility (true or false)
  const [expandedDiscount, setExpandedDiscount] = useState(false) //           expand card (Discount) icon status (true or false)
  const [expandedSignature, setExpandedSignature] = useState(false) //         expand card (signature) icon status (true or false)
  const [status, setStatus] = useState(DATA[0].Id) //                          DropDown status (0 or 1)and label=name, id is used for mapping inside comboBox)
  const [articles, setArticles] = useState([]) //                              list of full articles data
  const [arraySelectedArticles, setArraySelectedArticles] = useState([]) //    Array of objects contains list of selected articles
  const [lines, setLines] = useState([])
  const signature = null //                                                    signature
  const [selectedInvoiceId] = useState(props.data) //                          id of selected invoice

  //check authentication
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('accessTokenServer') !== null) {
      console.log(`Logged in`)
    } else {
      console.log(`Logged out`)
      navigate('/login')
    }
  }, [navigate])

  /* ComboBox Client*/
  useEffect(() => {
    //API get clients list and put response in state

    getClients().then((response) => {
      let client_list = []
      for (let i = 0; i < response.data.length; i++) {
        client_list = [
          ...client_list,
          {
            id: response.data[i].id,
            label: response.data[i].name,
            timbre: response.data[i].timbre,
          },
        ]
      }
      setClients(client_list)
    })
  }, [])

  /* Selected client */
  const [client_id, setClient_id] = useState(null)

  /* ComboBox Article*/
  useEffect(() => {
    //API get Article list and put response in state
    getUsers().then((response) => {
      /* console.log(response.data) */
      let article_list = []
      for (let i = 0; i < response.data.length; i++) {
        article_list = [
          ...article_list,
          {
            id: response.data[i].id,
            label: response.data[i].article,
            code: response.data[i].code,
            price: response.data[i].price,
            vat: Number(response.data[i].vat.vat),
          },
        ]
      }
      setArticles(article_list)
    })
  }, [])

  const renderMenu = (results, menuProps, props) => {
    let index = 0

    // Group the results by the "articleItem" key in each option.
    const articleItem = _(results)
      .groupBy('label[0]')
      .map((articleItem, letter) => ({ letter, articleItem }))
      .value()

    const items = articleItem.map(({ letter, articleItem }) => {
      return (
        <React.Fragment key={letter}>
          {index !== 0 && <Menu.Divider />}
          <Menu.Header>{letter}</Menu.Header>
          {articleItem.map((option) => {
            const item = (
              <MenuItem
                key={option.label}
                option={option}
                position={index}
                disabled={option.disabled}
              >
                <Highlighter search={props.text}>{option.label}</Highlighter>
              </MenuItem>
            )

            index += 1
            return item
          })}
        </React.Fragment>
      )
    })

    return <Menu {...menuProps}>{items}</Menu>
  }
  const mapOptions = (options, values) =>
    options.map((v) => (values.includes(v) ? { ...v, disabled: true } : v))

  /* Table Article list */

  const handleDeleteSelecteedArticle = (id) => {
    let newtab = arraySelectedArticles.filter((item) => item.id !== id)
    setArraySelectedArticles(newtab)
    console.log('arraySelectedArticles: ', arraySelectedArticles)
  }

  /* Total prices before discount */
  const [totalArticlesPrice, setTotalArticlesPrice] = useState(0)

  useEffect(
    (id) => {
      let x = 0
      let y = 0
      x = arraySelectedArticles.filter((item) => item.id !== id)
      for (let i = 0; i < x.length; i++) {
        // console.log('x[i]: ', x[i])
        // console.log('x[i].totalArticlesPrice: ', x[i].price)
        y = Number(y) + Number(x[i].price)
      }
      setTotalArticlesPrice(y.toFixed(3))
      // console.log('totalArticlesPrice: ', totalArticlesPrice)
    },
    [arraySelectedArticles, totalArticlesPrice],
  )

  /* Discount */
  let [discountPercent, setDiscountPercent] = useState(0)
  let [discount, setDiscountValue] = useState(0)

  /* select all when mouse focus Discount input */
  const handleFocus = (event) => event.target.select()

  /* convert discountPercent to discount value */
  useEffect(() => {
    setDiscountValue(discountPercent / 100)
    // console.log('discountValue: ', discount)
  }, [discount, discountPercent])

  let discountOnTotal = 0
  // console.log('discountPercent: ', discountPercent)
  // console.log('totalArticlesPrice: ', totalArticlesPrice)

  discountOnTotal = (totalArticlesPrice * discountPercent) / 100
  // console.log('discountOnTotal: ', discountOnTotal)

  /* Discount rate Percent Min-Max Value */
  const [value, setvalue] = useState(0)

  const min = 0
  const max = 100

  useEffect(() => {
    if (discountPercent < min) {
      setvalue(0)
    }
    if (discountPercent > max) {
      setvalue(100)
    }
  }, [discountPercent])

  /* HT */
  let [total_ht, setTotal_ht] = useState(0)

  useEffect(() => {
    let x = 0
    for (let index = 0; index < arraySelectedArticles.length; index++) {
      console.log('total_ht: ', arraySelectedArticles[index].total)
      x = x + arraySelectedArticles[index].total
    }
    setTotal_ht(x)
  }, [arraySelectedArticles])

  /* TTC */
  let [total_price, setTotal_price] = useState(0)

  useEffect(() => {
    let x = 0
    for (let index = 0; index < arraySelectedArticles.length; index++) {
      console.log('total_price: ', arraySelectedArticles[index].TTC)
      x = x + arraySelectedArticles[index].TTC
    }
    setTotal_price(x)
    setLines(
      arraySelectedArticles.map((obj) => {
        const { TTC, id, label, ...rest } = obj
        return rest
      }),
    )
  }, [arraySelectedArticles])
  // console.log('lines: ', lines)

  const handleExpandClickDiscount = () => {
    setExpandedDiscount(!expandedDiscount)
  }

  /* Signature */
  const handleExpandClickSignature = () => {
    setExpandedSignature(!expandedSignature)
  }

  /* DropDown Status */
  function onChange(e) {
    setStatus(e.target.value)
  }

  //this console.log current selected dropbox (draft=0 or paid=1)
  // useEffect(() => {
  //   console.log('status dropdown value: ', status)
  // }, [status])

  /* API */
  const header = { date, signature, timbre, client_id, discount, total_ht, total_price, status }
  const addClientDetails = () => {
    addInvoice(header, lines)
  }
  const [clientName, setClientName] = useState('')

  useEffect(() => {
    ;(async () => {
      const response = await getHydratedInvoice(selectedInvoiceId)
      console.log('response HydratedInvoice API: ', response)
      setDate(response.header.date)
      setClientName(response.header.client.name)
      console.log('response.lines: ', response.lines)
      setArraySelectedArticles(response.lines)
    })()
  }, [selectedInvoiceId])

  /* Loading button Bootstrap */
  const [isLoading, setLoading] = useState(false)

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000))
  }
  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false)
      })
    }
  }, [isLoading])

  const handleClick = () => {
    setLoading(true)
    setVisible(!visible)
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button variant="outline-success" onClick={!isLoading ? handleClick : null}>
          {isLoading ? (
            <CircularProgress
              size={19}
              thickness={6}
              color="success"
              style={{ marginTop: '2px' }}
            />
          ) : (
            <EditIcon />
          )}
        </Button>
        <CModal visible={visible} backdrop={'static'} scrollable onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Edit invoice</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* Date */}
            {/* Date */}
            {/* Date */}
            {/* Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // dateFormat="dd/MM/yyyy"
                // defaultValue={new Date(responseAPIHeader.date).toLocaleDateString('fr-FR')}
                value={date}
                onChange={(date) => {
                  const d = new Date(date).toLocaleDateString('en-US')
                  console.log(d)
                  setDate(d)
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            {/* List of clients */}
            {/* List of clients */}
            {/* List of clients */}
            {/* List of clients */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text>Client: </InputGroup.Text>
                  <Typeahead
                    style={{ width: 'auto' }}
                    clearButton
                    id="grouped-results"
                    defaultInputValue={clientName}
                    options={clients}
                    placeholder="Select a client..."
                    // defaultValue={responseAPIHeader.client?.name}
                    renderMenu={renderMenu}
                    onChange={(newValue) => {
                      if (newValue.length !== 0) {
                        setClient_id(newValue[0].id)
                        console.log('client_id: ', client_id)
                        setTimbre(newValue[0].timbre)
                        console.log('timbre: ', timbre)
                      }
                    }}
                  />
                </InputGroup>
              </Form.Group>
              <div style={{ marginTop: '15px' }}>
                <DialogAddClient />
              </div>
            </Box>
            {/* list of articles */}
            {/* list of articles */}
            {/* list of articles */}
            {/* list of articles */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text>Article: </InputGroup.Text>
                  <Typeahead
                    clearButton
                    id="basic-example"
                    onChange={(newValue) => {
                      if (newValue.length !== 0) {
                        console.log('newValue: ', newValue)
                        setArraySelectedArticles([
                          ...arraySelectedArticles,
                          {
                            ...newValue[0],
                            article_code: newValue[0].code,
                            article_name: newValue[0].label,
                            article_price: newValue[0].price,
                            quantity: 1,
                            discount: 0,
                          },
                        ])
                        console.log('arraySelectedArticles: ', arraySelectedArticles)
                        // setArraySelectedArticles(responseAPILines)
                      }
                    }}
                    options={mapOptions(articles, arraySelectedArticles)}
                    placeholder="Add new article ..."
                    labelKey={(articles) => articles.label}
                  />
                </InputGroup>
              </Form.Group>
              <div style={{ marginTop: '10px' }}>
                <DialogAddArticle />
              </div>
            </Box>
            {/* Table Articles */}
            {/* Table Articles */}
            {/* Table Articles */}
            <div
              style={{
                position: 'relative',
                maxHeight: '200px',
                overflow: 'auto',
                display: 'block',
              }}
            >
              <button onClick={() => console.log('arraySelectedArticle: ', arraySelectedArticles)}>
                eeeeeee
              </button>
              <Table striped bordered hover>
                <thead
                  style={{
                    backgroundColor: '#2196f3',
                    color: 'white',
                    position: 'sticky',
                    top: '0',
                    zIndex: '10',
                  }}
                >
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th style={{ display: 'flex', justifyContent: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {arraySelectedArticles.map((article, index) => (
                    <tr key={index}>
                      <td>{article.article_code}</td>
                      <td>{article.article_name}</td>
                      <td>{article.article_price}</td>
                      <td>{Math.trunc(article.quantity)}</td>
                      <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <DialogEditInvoiceLines
                          data={article.id}
                          num={article.quantity}
                          setArraySelectedArticles={setArraySelectedArticles}
                          arraySelectedArticles={arraySelectedArticles}
                        />
                        <button
                          onClick={() => {
                            console.log(article.id)
                          }}
                        >
                          article.id
                        </button>
                        <IconButton
                          style={{
                            border: '1px',
                            margin: '-10px',
                            height: '50px',
                            width: '50px',
                          }}
                          onClick={() => handleDeleteSelecteedArticle(article.id)}
                        >
                          <DeleteForeverIcon style={{ color: '#e82c1e' }} />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* Discount */}
            {/* Discount */}
            {/* Discount */}
            {/* Discount */}
            <Card
              sx={{
                marginTop: 1,
                border: 1,
                color: '#1976d2',
                boxShadow: '4px 5px 0px -9px rgba(0,0,0,0.51)',
              }}
            >
              <CardActions disableSpacing>
                <InputLabel sx={{ color: '#1976d2' }}>Discount: </InputLabel>
                <ExpandMore
                  expand={expandedDiscount}
                  onClick={handleExpandClickDiscount}
                  aria-expanded={expandedDiscount}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expandedDiscount} timeout="auto" unmountOnExit>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography paragraph>Discount:</Typography>
                    <TextField
                      id="standard-basic"
                      label="Discount:"
                      type="number"
                      variant="standard"
                      className="discount"
                      sx={{ justifyContent: 'flex-end' }}
                      defaultValue={0}
                      value={value}
                      onChange={(e) => {
                        setDiscountPercent(e.target.value)
                        setvalue(e.target.value)
                      }}
                      onFocus={handleFocus}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    {/* ------------------------------------------------------------------------------------------------ */}
                    <Typography paragraph>Discount on total:</Typography>
                    <TextField
                      onBlur={(event) => {
                        const value = event.currentTarget.value
                        if (!value) {
                          event.currentTarget.value = 0
                        }
                      }}
                      id="standard-basic"
                      label="Discount on total:"
                      variant="standard"
                      className="discountOnTotal"
                      sx={{ justifyContent: 'flex-end' }}
                      defaultValue={0}
                      InputLabelProps={{ shrink: true }}
                      value={Number(discountOnTotal).toFixed(3)}
                      // onChange={(e) => setDiscount(e.target.value)}
                    />
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
            {/* Table Discount */}
            <table style={{ width: '100%', marginTop: '20px', border: '1px solid black' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#B0B0B0', border: '1px solid black' }}>
                    Discount
                  </th>
                  <td
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      border: '1px solid black',
                    }}
                  >
                    {Number(discountOnTotal).toFixed(3)} {' DT'}
                  </td>
                </tr>
                <tr>
                  <th style={{ backgroundColor: '#B0B0B0', border: '1px solid black' }}>
                    Total HT
                  </th>
                  <td
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      border: '1px solid black',
                    }}
                  >
                    {Number(total_ht).toFixed(3)} {' DT'}
                  </td>
                </tr>
                <tr>
                  <th style={{ backgroundColor: '#B0B0B0', border: '1px solid black' }}>
                    Total TTC
                  </th>
                  <td
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      border: '1px solid black',
                    }}
                  >
                    {Number(total_price).toFixed(3)} {' DT'}
                  </td>
                </tr>
              </thead>
            </table>
            <Card
              sx={{
                marginTop: 1,
                border: 1,
                color: '#1976d2',
                boxShadow: '4px 5px 0px -9px rgba(0,0,0,0.51)',
              }}
            >
              <CardActions disableSpacing>
                <InputLabel sx={{ color: '#1976d2' }}>Signature: </InputLabel>
                <ExpandMore
                  expand={expandedSignature}
                  onClick={handleExpandClickSignature}
                  aria-expanded={expandedSignature}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expandedSignature} timeout="auto" unmountOnExit>
                <CardContent>{/*Signature content here*/}Signature image here</CardContent>
              </Collapse>
            </Card>
            <Card
              sx={{
                marginTop: 1,
                border: 1,
                color: '#1976d2',
                boxShadow: '4px 5px 0px -9px rgba(0,0,0,0.51)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <InputLabel sx={{ color: '#1976d2', margin: '10px' }}>
                  Mark this invoice as:{' '}
                </InputLabel>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Form.Select
                    size="lg"
                    aria-label="Default select example"
                    onChange={onChange}
                    defaultValue="0"
                  >
                    <option default value="0" style={{ color: 'red' }}>
                      Draft
                    </option>
                    <option value="1" style={{ color: 'lime' }}>
                      Paid
                    </option>
                  </Form.Select>
                </FormControl>
              </Box>
            </Card>
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

export default DialogEditInvoice2

DialogEditInvoice2.propTypes = {
  getAllClients: propTypes.any,
  text: propTypes.any,
  data: propTypes.any,
}
