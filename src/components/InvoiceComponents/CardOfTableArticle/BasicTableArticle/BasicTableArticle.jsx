import React, { useState, Fragment, useEffect, useCallback, useContext } from 'react'
import propTypes from 'prop-types'
import Table from 'react-bootstrap/Table'
import EditableRow from './RowEditingBasicTableArticle/EditableRow'
import './styles.css'
import { getVats } from 'src/Service/apiVat'
import AlertMessageVatsNetwork from '../../AlertMessage/AlertMessageVatsNetwork'
import { Alert } from '@mui/material'
import { GlobalContext } from 'src/context/Global'
import Pagination from '@mui/material/Pagination'

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
    const index = newData.findIndex((item) => item.id === articleId.id)
    dataAfterDelete.splice(index, 1)
    setNewData(dataAfterDelete)
  }

  /* pagination table */
  const rowsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const pageCount = Math.ceil(newData.length / rowsPerPage)

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
                {newData?.slice(startIndex, endIndex).map((item, index) => (
                  <Fragment key={item.id}>
                    <EditableRow
                      index={startIndex + index}
                      key={item.id}
                      editFormData={item}
                      handleFormChange={handleFormChange}
                      handleDeleteClick={handleDeleteClick}
                    />
                  </Fragment>
                ))}
              </tbody>
            </Table>
            {newData.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} />
              </div>
            )}
          </div>
        ) : (
          <Alert sx={{ marginBottom: '10px' }} severity="warning">
            Select an article <span style={{ color: 'red' }}>*</span>
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
