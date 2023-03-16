import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import EditIcon from '@mui/icons-material/Edit'
import DisabledInputText from '../../../components/InvoiceComponents/DisabledInputText/DisabledInputText'
import CalendarPick from '../../../components/InvoiceComponents/Date/Calendar'
import ClientAutoComplete from '../../../components/InvoiceComponents/AutoComplete/ClientAutoComplete/ClientAutoComplete'
import ArticleAutoComplete from '../../../components/InvoiceComponents/AutoComplete/ArticleAutoComplete/ArticleAutoComplete'
import { DraggableModal } from 'ant-design-draggable-modal'
import 'ant-design-draggable-modal/dist/index.css'
import CardOfTableClient from 'src/components/InvoiceComponents/CardOfTableClient/CardOfTableClient'
import CardOfTableArticle from 'src/components/InvoiceComponents/CardOfTableArticle/CardOfTableArticle'
import TableTTC from 'src/components/InvoiceComponents/TableTaxes/TaxesTable'
import { Divider } from 'antd'
import propTypes from 'prop-types'
import { useGlobal } from '../../../context/Global'

const EditInvoice = () => {
  const [open, setOpen] = useState(false)
  const [toggleFieldSetClient, setToggleFieldSetClient] = useState(false)
  const [toggleFieldSetArticle, setToggleFieldSetArticle] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedArticles, setSelectedArticles] = useState({})
  const { selectedInvoiceById } = useGlobal()

  console.log('selectedInvoiceById: ', selectedInvoiceById)

  const showModal = () => {
    setOpen(true)
  }
  const handleOk = (e) => {
    console.log(e)
    setOpen(false)
  }
  const handleCancel = (e) => {
    console.log(e)
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
        <Button variant="outline-success" onClick={showModal}>
          <EditIcon />
        </Button>
      </div>
      <div>
        <DraggableModal
          visible={open}
          onOk={handleOk}
          onCancel={handleCancel}
          zIndex="1031"
          title={
            <div>
              <h3>Edit Invoice:</h3>
            </div>
          }
        >
          <div style={{ maxWidth: 'calc(100vw)', overflow: 'hidden' }}>
            <DisabledInputText />
          </div>
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
            <TableTTC />
          </div>
        </DraggableModal>
      </div>
    </>
  )
}

export default EditInvoice

EditInvoice.propTypes = {
  rowId: propTypes.func,
}
