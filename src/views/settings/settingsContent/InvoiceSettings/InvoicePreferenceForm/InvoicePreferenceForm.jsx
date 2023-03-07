import React, { useEffect, useState } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'
import { getAccountDetails } from '../../../../../Service/Settings/apiInvoicePreferenceSettings'
import InvoiceForm from './InvoiceForm'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import './style.css'

const InvoicePreferenceForm = () => {
  /* get Account details */
  const [invoicePrefDetails, setInvoicePrefDetails] = useState({})
  const [data, setData] = useState(null)

  useEffect(() => {
    getAccountDetails().then((response) => setData(response.data.company))
  }, [])

  console.log('invoicePrefDetails: ', invoicePrefDetails)

  useEffect(() => {
    setInvoicePrefDetails(data)
  }, [data])

  return invoicePrefDetails ? (
    <>
      <div className="form-demo">
        <div>
          <InvoiceForm preloadedValues={invoicePrefDetails} />
        </div>
      </div>
    </>
  ) : (
    <div>
      <ProgressSpinner />
      <h2>Loading your data, please wait ...</h2>
    </div>
  )
}

export default InvoicePreferenceForm
