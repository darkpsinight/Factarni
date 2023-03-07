//newData => contacts
//item => contact

import React, { useState, Fragment, useEffect, useCallback, useContext } from 'react'
import propTypes from 'prop-types'
import Table from 'react-bootstrap/Table'
import EditableRow from './RowEditingBasicTableArticle/EditableRow'
import './styles.css'
import { getVats } from 'src/Service/apiVat'
import AlertMessageVatsNetwork from '../../AlertMessage/AlertMessageVatsNetwork'
import { Alert } from '@mui/material'
import { GlobalContext } from 'src/context/Global'

const BasicTableArticle = (props) => {
  const [newData, setNewData] = useState([])

  const { newDataContext, setNewDataContext } = useContext(GlobalContext)
  setNewDataContext(newData)
  console.log('newDataContext: ', newDataContext)

  useEffect(() => {
    if (!!props.propsSelectedArticle?.id) {
      setNewData((prevData) => {
        if (prevData?.length > 0) {
          return [...prevData, { ...props.propsSelectedArticle, quantity: 1, discount: 0 }]
        } else {
          if (!!props.propsSelectedArticle?.id) {
            return [{ ...props.propsSelectedArticle, quantity: 1, discount: 0 }]
          }
        }
      })
    }
  }, [props.propsSelectedArticle])

  const handleFormChange = (event) => {
    setNewData((prevData) => {
      const newDataCopy = [...prevData]
      newDataCopy[event.index] = event.value
      console.log('newDataCopy: ', newDataCopy)
      return newDataCopy
    })
  }

  // /* sum price */
  // let sumPrice = 0

  // for (let i = 0; i < newData.length; i++) {
  //   sumPrice = sumPrice + Number(newData[i].price)
  //   console.log('sumPrice: ', sumPrice)
  //   console.log('Number(newData[i].price: ', Number(newData[i].price))
  // }

  // /* sum VAT */
  // let sumVAT = 0

  // for (let i = 0; i < newData.length; i++) {
  //   sumVAT = sumVAT + Number(newData[i].vat.vat)
  //   console.log('sumVat', sumVAT)
  //   console.log('Number(newData[i].vat.vat: ', Number(newData[i].vat.vat))
  // }

  // /* sum Discount */
  // let sumDiscount = 0

  // for (let i = 0; i < newData.length; i++) {
  //   console.log('sumDiscount', sumDiscount)
  // }

  console.log('newData: ', newData)

  /* vat */
  const [vats, setVats] = useState()
  const [networkError, setNetworkError] = useState(false)

  const loadVats = useCallback(async () => {
    try {
      const response = await getVats()
      setVats(response.data)
    } catch (error) {
      setNetworkError(true)
    }
  }, [])

  useEffect(() => {
    loadVats()
  }, [loadVats])

  console.log('vats: ', vats)

  const handleDeleteClick = (articleId) => {
    const dataAfterDelete = [...newData]
    const index = newData.findIndex((item) => item.id === articleId)
    dataAfterDelete.splice(index, 1)
    setNewData(dataAfterDelete)
  }

  return (
    <>
      {networkError && <AlertMessageVatsNetwork />}
      <div>
        {!!newData?.length && newData?.length > 0 ? (
          <div>
            <h5>Article details:</h5>
            <Table
              className="app-container"
              striped
              bordered
              hover
              responsive
              style={{
                display: 'block',
                height: '100%',
                maxHeight: '350px',
                overflowY: 'scroll',
              }}
            >
              <thead style={{ backgroundColor: '#F8F9FA' }}>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>VAT</th>
                  <th>Discount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {newData?.map((item, index) => (
                  <Fragment key={item.id}>
                    <EditableRow
                      index={index}
                      key={item.id}
                      editFormData={item}
                      handleFormChange={handleFormChange}
                      handleDeleteClick={handleDeleteClick}
                    />
                  </Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <Alert sx={{ marginBottom: '10px' }} severity="warning">
            Select an article
          </Alert>
        )}
      </div>
    </>
  )
}

/*
 <ReadOnlyRow
                  //       item={item}
                  //       index={index}
                  //       handleEditClick={handleEditClick}
                  //       handleDeleteClick={handleDeleteClick}
                  //     />
*/
export default BasicTableArticle

BasicTableArticle.propTypes = {
  propsSelectedArticle: propTypes.any,
  setPropsSelectedArticle: propTypes.func,
  editing: propTypes.any,
}
