import React, { useState } from 'react'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CalendarPick from '../../../components/InvoiceComponents/Date/Calendar'
import ClientAutoComplete from 'src/components/InvoiceComponents/AutoComplete/ClientAutoComplete/ClientAutoComplete'
import ArticleAutoComplete from 'src/components/InvoiceComponents/AutoComplete/ArticleAutoComplete/ArticleAutoComplete'
import { DraggableModal } from 'ant-design-draggable-modal'
import 'ant-design-draggable-modal/dist/index.css'
import CardOfTableClient from '../../../components/InvoiceComponents/CardOfTableClient/CardOfTableClient'
import CardOfTableArticle from '../../../components/InvoiceComponents/CardOfTableArticle/CardOfTableArticle'
import { Divider } from 'antd'
import TaxesTable from 'src/components/InvoiceComponents/TableTaxes/TaxesTable'
import { addInvoice } from 'src/Service/Invoices/apiInvoice.js'

const AddInvoice = () => {
  const [open, setOpen] = useState(false)
  const [toggleFieldSetClient, setToggleFieldSetClient] = useState(false)
  const [toggleFieldSetArticle, setToggleFieldSetArticle] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedArticles, setSelectedArticles] = useState({})

  const showModal = () => {
    setOpen(true)
  }
  const handleOk = (e) => {
    setOpen(false)
    addInvoice()
  }

  const handleCancel = (e) => {
    setOpen(false)
  }

  const handleSelectedArticle = (e) => {
    if (!!e) {
      setSelectedArticles(e)
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Fab color="primary" aria-label="add" onClick={showModal}>
          <AddIcon />
        </Fab>
      </div>
      <div>
        <DraggableModal
          visible={open}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Add"
          zIndex="1031"
          title={
            <div>
              <h3>Add Invoice:</h3>
            </div>
          }
        >
          <div>
            <CalendarPick />
          </div>
          <div>
            <ClientAutoComplete
              setToggleFieldSetClient={setToggleFieldSetClient}
              toggleFieldSetClient={toggleFieldSetClient}
              setSelectedClient={setSelectedClient}
            />
          </div>
          <div>
            <CardOfTableClient
              toggleFieldSetClient={toggleFieldSetClient}
              selectedClient={selectedClient}
            />
          </div>
          <div>
            <ArticleAutoComplete
              setToggleFieldSetArticle={setToggleFieldSetArticle}
              toggleFieldSetArticle={toggleFieldSetArticle}
              setSelectedArticles={(e) => {
                handleSelectedArticle(e)
              }}
              selectedArticles={selectedArticles}
            />
          </div>
          <div>
            <CardOfTableArticle
              toggleFieldSetArticle={toggleFieldSetArticle}
              selectedArticles={selectedArticles}
            />
          </div>
          <Divider style={{ marginTop: '40px' }} />
          <div>
            <TaxesTable />
          </div>
        </DraggableModal>
      </div>
    </>
  )
}

export default AddInvoice
