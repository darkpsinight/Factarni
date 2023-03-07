import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { GlobalContext } from 'src/context/Global'
import { getAccountDetails } from '../../../Service/Settings/apiInvoicePreferenceSettings'
import { IoReloadCircleSharp } from 'react-icons/io5'
import { MdError } from 'react-icons/md'
import { CircularProgress, IconButton } from '@mui/material'
import { createTheme } from '@material-ui/core/styles'
import { Tooltip } from 'antd'
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

  const [stamp, setStamp] = useState(0)
  console.log('stamp: ', stamp)

  const [PriceDegits, setPriceDegits] = useState(null)
  console.log('PriceDegits: ', Number(PriceDegits))

  const [quantityDegits, setQuantityDegits] = useState(null)
  console.log('quantityDegits: ', Number(quantityDegits))

  const [networkError, setNetworkError] = useState(false)
  console.log('networkError: ', networkError)

  const [loading, setLoading] = useState(false)

  /* Profile Settings APIs calls */
  const loadProfileSettings = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getAccountDetails()
      setStamp(response.data.company.timbre)
      setPriceDegits(Number(response.data.company.digits).toFixed(0))
      setQuantityDegits(Number(response.data.company.quantity_digits).toFixed(0))
      setNetworkError(false)
    } catch (error) {
      setNetworkError(true) //Make a toast handle error
      console.log('Error API load Profile Settings: ', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProfileSettings()
  }, [loadProfileSettings])

  const sumOfVat = newDataContext.reduce((total, item) => {
    return (
      total +
      (Number(item.price) * Number(item.quantity) - Number(item.discount)) * Number(item.vat.vat)
    )
  }, 0)

  const sumOfHT = newDataContext.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity) - Number(item.discount)
  }, 0)

  const sumOfTTC = newDataContext.reduce((total, item) => {
    return (
      total +
      (Number(item.price) * Number(item.quantity) - Number(item.discount)) *
        (1 + Number(item.vat.vat)) +
      Number(stamp)
    )
  }, 0)

  // toFixed(3) change to API profile get number
  return (
    <>
      <div>
        <h4>Taxes:</h4>
      </div>
      <div>
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <th className="row1">Stamp</th>
              <td className="row2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {typeof stamp === 'string'
                  ? parseFloat(stamp).toFixed(PriceDegits)
                  : stamp.toFixed(PriceDegits)}{' '}
                DT
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
                    <CircularProgress size={25} />
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
              <td className="row4">{sumOfHT.toFixed(PriceDegits)}</td>
            </tr>
            <tr>
              <th className="row5">Total VAT</th>
              <td className="row6">{sumOfVat.toFixed(PriceDegits)}</td>
            </tr>
            <tr>
              <th className="row7">Total TTC</th>
              <td className="row8">{sumOfTTC.toFixed(PriceDegits)}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default TaxesTable
