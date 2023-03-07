import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import './style.css'
import { GlobalContext } from 'src/context/Global'
import { getAccountDetails } from '../../../Service/Settings/apiInvoicePreferenceSettings'
import { IoReloadCircleSharp } from 'react-icons/io5'
import { CircularProgress, IconButton } from '@mui/material'

const TaxesTable = () => {
  /* const updatedData = newDataContext.map((item) => ({
    ...item,
    TTC: 0,
    HT: 0,
    totalPricePerArticle: 0,
  })) */

  const { newDataContext } = useContext(GlobalContext)

  const [stamp, setStamp] = useState(null)
  const [networkError, setNetworkError] = useState(false)
  console.log('networkError: ', networkError)

  const [loading, setLoading] = useState(false)

  const loadStamp = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getAccountDetails()
      setStamp(response.data.company.timbre)
    } catch (error) {
      setNetworkError(true) //Make a toast handle error
      console.log('Error API load stamp: ', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStamp()
  }, [loadStamp])

  const totalPrice = newDataContext.reduce((total, item) => {
    return total + (Number(item.price) - Number(item.discount)) * Number(item.quantity)
  }, 0)

  const sumOfVat = newDataContext.reduce((total, item) => {
    return (
      total +
      (Number(item.price) * Number(item.quantity) - Number(item.discount)) * Number(item.vat.vat)
    )
  }, 0)

  const sumOfHT = newDataContext.reduce((total, item) => {
    return (
      total +
      (Number(item.price) * Number(item.quantity) * (1 - Number(item.discount))) /
        (1 + Number(item.vat.vat))
    )
  }, 0)

  const sumOfTTC = newDataContext.reduce((total, item) => {
    return (
      total +
      (Number(item.price) * Number(item.quantity) - Number(item.discount)) *
        (1 + Number(item.vat.vat))
    )
  }, 0)

  // toFixed(3) change to API profile get number
  return (
    <>
      <p>
        <b>Total Price after discount: </b>
        {totalPrice.toFixed(3)}
      </p>
      <div>
        <h4>Taxes:</h4>
      </div>
      <div>
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <th className="row1">Stamp</th>
              <td className="row2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {stamp} DT
                <IconButton
                  aria-label="update_stamp"
                  style={{ marginTop: '-5px' }}
                  color="primary"
                  size="small"
                  disabled={loading}
                  onClick={loadStamp}
                >
                  {loading ? (
                    <CircularProgress size={25} />
                  ) : (
                    <IoReloadCircleSharp fontSize="25px" />
                  )}
                </IconButton>
              </td>
            </tr>
            <tr>
              <th className="row3">Total HT</th>
              <td className="row4">{sumOfHT.toFixed(3)}</td>
            </tr>
            <tr>
              <th className="row5">Total VAT</th>
              <td className="row6">{sumOfVat.toFixed(3)}</td>
            </tr>
            <tr>
              <th className="row7">Total TTC</th>
              <td className="row8">{sumOfTTC.toFixed(3)}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default TaxesTable
