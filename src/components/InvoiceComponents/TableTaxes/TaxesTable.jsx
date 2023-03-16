import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Table } from 'react-bootstrap'
import { GlobalContext, useGlobal } from '../../../context/Global'
import { getAccountDetails } from '../../../Service/Settings/apiInvoicePreferenceSettings'
import { IoReloadCircleSharp } from 'react-icons/io5'
import { MdError } from 'react-icons/md'
import { GiConfirmed } from 'react-icons/gi'
import { CiCalculator2 } from 'react-icons/ci'
import { IconButton } from '@mui/material'
import { createTheme } from '@material-ui/core/styles'
import { Button, Input, Tooltip, Switch } from 'antd'
import { useSpring, animated } from 'react-spring'
import { Toast } from 'primereact/toast'
import './style.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff9100',
    },
    error: {
      main: '#f44336',
    },
  },
})

const TaxesTable = () => {
  const { newDataContext } = useContext(GlobalContext)
  const { stampIncluded, vatIncluded } = useGlobal()

  const [stamp, setStamp] = useState(0)

  const [PriceDegits, setPriceDegits] = useState(null)

  const [quantityDegits, setQuantityDegits] = useState(null) //use this quantity setting (not used yet like price Degits)
  console.log('quantityDegits: ', Number(quantityDegits))

  const [networkError, setNetworkError] = useState(false)

  const [loading, setLoading] = useState(false)

  console.log('stamp: ', stamp)

  /* Profile Settings APIs calls */
  const { setDisabledDiscountInput } = useGlobal()
  const loadProfileSettings = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getAccountDetails()
      if (stampIncluded === false) {
        setStamp(0)
      } else if (stampIncluded === true) {
        setStamp(response.data.company.timbre)
      } else {
        setStamp(NaN)
      }
      setPriceDegits(Number(response.data.company.digits).toFixed(0))
      setQuantityDegits(Number(response.data.company.quantity_digits).toFixed(0))
      setNetworkError(false)
      if (Number(response.data.company.discount) === 0) {
        setDisabledDiscountInput(true)
      } else if (Number(response.data.company.discount) === 1) {
        setDisabledDiscountInput(false)
      } else {
        show_Toast_Invalid_Company_Discount()
      }
    } catch (error) {
      setNetworkError(true)
      show_Toast_API_Load_Profile()
    } finally {
      setLoading(false)
    }
  }, [setDisabledDiscountInput, stampIncluded])

  useEffect(() => {
    loadProfileSettings()
  }, [loadProfileSettings])

  const [isVatCounted, setIsVatCounted] = useState(true)

  useEffect(() => {
    if (vatIncluded) {
      setIsVatCounted(true)
    } else setIsVatCounted(false)
  }, [vatIncluded])

  const sumOfVat = newDataContext.reduce((total, item) => {
    const discount = (Number(item.discount) / 100) * Number(item.price) * Number(item.quantity)
    const finalPrice = Number(item.price) * Number(item.quantity) - discount
    const vatAmount = finalPrice * Number(isVatCounted ? item.vat.vat : 0)
    return total + vatAmount
  }, 0)

  const sumOfHT = newDataContext.reduce((total, item) => {
    const price = Number(item.price) * Number(item.quantity)
    const discount = (price * Number(item.discount)) / 100
    return total + price - discount
  }, 0)

  /* totaldiscount (discount) in DT for API */

  const [sumOfTTC, setSumOfTTC] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)

  const calculateSumOfTTC = () => {
    const newSumOfTTC =
      newDataContext.reduce((total, item) => {
        const discount = (Number(item.discount) / 100) * Number(item.price) * Number(item.quantity)
        const finalPrice = Number(item.price) * Number(item.quantity) - discount
        const vatAmount = finalPrice * Number(isVatCounted ? item.vat.vat : 0)
        return total + (finalPrice + vatAmount)
      }, 0) +
      Number(stamp) -
      totalDiscount

    setSumOfTTC(Math.max(newSumOfTTC, 0))
  }

  const discountTotal = (event) => {
    const defaultValueRegex = /^(?:0|[1-9]\d*)(?:\.\d+)?$/
    const newValue = event.target.value.trim()
    if (defaultValueRegex.test(newValue)) {
      setTotalDiscount(newValue)
      if (newValue === '0') {
        setIsDiscount(false)
      }
    } else if (/^0\d+$/.test(newValue)) {
      setTotalDiscount(newValue.replace(/^0+/, ''))
    } else {
      setTotalDiscount('0')
    }
  }

  const [isDiscount, setIsDiscount] = useState(false)

  const handleDiscountButtonClick = () => {
    calculateSumOfTTC()
    setIsDiscount(true)
    setTimeout(() => {
      setIsDiscount(false)
    }, 3000)
  }

  /* toasts */
  const toast = useRef(null)

  const show_Toast_API_Load_Profile = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error load Profile Settings',
      detail: 'Check network availability or contact us',
    })
  }

  const show_Toast_Invalid_Company_Discount = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Invalid Company discount',
    })
  }

  return (
    <>
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
      <div>
        <h4>Taxes:</h4>
      </div>
      <div>
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <th className="row3">Discount Total</th>
              <td className="row4" style={{ display: 'flex' }}>
                <Input
                  name="discount_total"
                  placeholder="Empty"
                  min={0}
                  max={Number(sumOfTTC)}
                  type="number"
                  suffix={
                    <Tooltip title="Dinar Tunisian currency">
                      {' '}
                      <strong>DT</strong>
                    </Tooltip>
                  }
                  onChange={discountTotal}
                  value={totalDiscount}
                  required
                  style={{
                    width: '100%',
                  }}
                />
                <Button
                  style={{ display: 'flex', marginLeft: '5px', width: '130px' }}
                  onClick={handleDiscountButtonClick}
                >
                  {totalDiscount === 0 ? (
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Calculate TTC &nbsp; <CiCalculator2 fontSize={20} />
                    </span>
                  ) : (
                    <span>
                      {isDiscount ? (
                        <Tooltip color="green" title="Discount Applied">
                          Applied <GiConfirmed fontSize={20} color="#52C41A" />
                        </Tooltip>
                      ) : (
                        <span>Apply Discount</span>
                      )}
                    </span>
                  )}
                </Button>
              </td>
            </tr>
            <tr>
              <th className="row1">Stamp</th>
              <td className="row2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {isNaN(stamp) ? (
                  <>
                    <span>NaN</span>
                    <span style={{ color: 'red' }}>Check client Stamp status</span>
                  </>
                ) : typeof stamp === 'string' ? (
                  `${parseFloat(stamp).toFixed(PriceDegits)} DT`
                ) : (
                  `${stamp.toFixed(PriceDegits)} DT`
                )}

                <IconButton
                  aria-label="update_stamp"
                  style={{
                    marginTop: '-5px',
                    color: networkError ? theme.palette.error.main : theme.palette.primary.main,
                  }}
                  size="small"
                  disabled={loading}
                  onClick={loadProfileSettings}
                >
                  {loading ? (
                    <i className="pi pi-spin pi-cog" style={{ fontSize: '1.8rem' }}></i>
                  ) : networkError ? (
                    <Tooltip
                      color="red"
                      title="Failed to load Stamp data. Click again or check network"
                    >
                      <MdError fontSize="25px" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Click to load the latest stamp data">
                      <IoReloadCircleSharp fontSize="25px" />
                    </Tooltip>
                  )}
                </IconButton>
              </td>
            </tr>
            <tr>
              <th className="row3">Total HT</th>
              <td className="row4">
                <animated.div>
                  {useSpring({ number: sumOfHT }).number.to((n) => `${n.toFixed(PriceDegits)} DT`)}
                </animated.div>
              </td>
            </tr>
            <tr>
              <th className="row5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                Total VAT
                <Switch
                  checkedChildren="VAT active"
                  unCheckedChildren="VAT inactive"
                  checked={isVatCounted}
                  disabled
                />
              </th>
              <td className="row6">
                <animated.div>
                  {useSpring({ number: sumOfVat }).number.to((n) => `${n.toFixed(PriceDegits)} DT`)}
                </animated.div>
              </td>
            </tr>
            <tr>
              <th className="row7">Total TTC</th>
              <td className="row8">
                <animated.div>
                  {useSpring({ number: sumOfTTC }).number.to((n) => `${n.toFixed(PriceDegits)} DT`)}
                </animated.div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default TaxesTable
