import React, { useState, useEffect } from 'react'
import DialogAddInvoice from '../../../components/invoiceDialog/DialogAddInvoice'
import { getHydratedInvoice, getInvoice, deleteInvoice } from 'src/Service/apiInvoice'
import MUIDataTable from 'mui-datatables'
import createCache from '@emotion/cache'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import './style.css'
import Button from 'react-bootstrap/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import DialogEditInvoice2 from '../../../components/invoiceDialog/DialogEditInvoice2'
import Toastify from 'src/components/notificationToast/Toastify'
import { toast } from 'react-toastify'
import ConfirmDialog from '../../../components/ConfirmDialog'

const muiCache = createCache({
  key: 'mui',
  prepend: true,
})

export default function Select() {
  /* API */
  let [invoiceList, setInvoiceList] = useState([])
  useEffect(() => {
    getInvoice().then((response) => setInvoiceList(response.data))
  }, [])
  // console.log('invoiceList: ', invoiceList)

  function getSelectedInvoiceDetails(params) {
    const selectedInvoiceId = null
    const response = getHydratedInvoice(selectedInvoiceId)
    console.log(response)
  }

  /* Delete API + Dialog + Toast */
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
  })
  const handleDelete = async (data) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to delete this Invoice?',
      subTitle: 'You can`t undo this action!',
      onConfirm: async () => {
        setConfirmDialog({
          ...setConfirmDialog,
          isOpen: false,
        })
        await deleteInvoice(data)
        toast.error('Invoice deleted successfully !')
        setInvoiceList(invoiceList.filter((invoiceList) => invoiceList.id !== data))
      },
    })
  }

  /* MUI datatable */
  const columns = [
    { name: 'id', options: { filterOptions: { fullWidth: true }, display: false } },
    { name: 'Number', options: { filterOptions: { fullWidth: true } } },
    { name: 'TTC', options: { filterOptions: { fullWidth: true } } },
    { name: 'HT', options: { filterOptions: { fullWidth: true } } },
    { name: 'VAT', options: { filterOptions: { fullWidth: true } } },
    { name: 'Name', options: { filterOptions: { fullWidth: true } } },
    { name: 'Date', options: { filterOptions: { fullWidth: true } } },
    {
      name: 'Edit',
      options: {
        filterOptions: { fullWidth: true },
        filter: false,
        sort: false,
        searchable: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData[0]
          return (
            <>
              <div className="editanddeletebuttons">
                <DialogEditInvoice2
                  data={rowId}
                  getSelectedInvoiceDetails={getSelectedInvoiceDetails}
                />
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    handleDelete(rowId)
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </>
          )
        },
      },
    },
  ]

  const options = {
    filterType: 'multiselect',
    rowsPerPageOptions: [5, 15, 50],
    rowsPerPage: 5,
    selectableRowsHideCheckboxes: true,
    print: false,
  }

  const data = invoiceList.map((list) => ({
    id: list.id,
    TTC: list.total_price,
    HT: list.total_ht,
    VAT: list.total_vat,
    Name: list.client.name,
    Date: list.date.split('T')[0],
    Number: list.number,
  }))
  /* to get day name */
  // var dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  // var day = dayName[new Date().getDay()]
  // console.log(day)

  return (
    <div>
      <Toastify />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={createTheme()}>
          <DialogAddInvoice />
          <MUIDataTable title={'Invoice list :'} data={data} columns={columns} options={options} />
        </ThemeProvider>
      </CacheProvider>
    </div>
  )
}
