import React, { useState, useEffect } from 'react'
import { getHydratedInvoice, getInvoice, deleteInvoice } from 'src/Service/apiInvoice'
import MUIDataTable from 'mui-datatables'
import createCache from '@emotion/cache'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmDialog from '../../../components/ConfirmDialog'
// import DialogAddInvoice from '../../../components/invoiceDialog/DialogAddInvoice'
// import DialogEditInvoice2 from '../../../components/invoiceDialog/DialogEditInvoice2'
import AddInvoice from './AddInvoice'
import EditInvoice from './EditInvoice'
import Toastify from 'src/components/notificationToast/Toastify'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import './style.css'
import { useGlobal } from '../../../context/Global'

const muiCache = createCache({
  key: 'mui',
  prepend: true,
})

export default function Select() {
  const { setSelectedInvoiceById } = useGlobal()

  /* API */
  let [invoiceList, setInvoiceList] = useState([])
  useEffect(() => {
    getInvoice().then((response) => setInvoiceList(response.data))
  }, [])
  console.log('invoiceList: ', invoiceList)

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
    { name: 'id', options: { filterOptions: { fullWidth: true }, display: true } }, //change "display: true" to remove id or remove this row (better) and (id: list.id) down too
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
          const selectedInvoice = invoiceList.find((invoice) => invoice.id === rowId)
          setSelectedInvoiceById(selectedInvoice)

          return (
            <>
              <div className="editanddeletebuttons">
                <EditInvoice getSelectedInvoiceDetails={getSelectedInvoiceDetails} />
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
          <AddInvoice />
          <MUIDataTable title={'Invoice list :'} data={data} columns={columns} options={options} />
        </ThemeProvider>
      </CacheProvider>
    </div>
  )
}
