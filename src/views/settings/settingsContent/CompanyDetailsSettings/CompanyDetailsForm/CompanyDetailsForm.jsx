import React, { useEffect, useState } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'
import { getCompanyDetails } from '../../../../../Service/Settings/apiCompanyDetailsSettings'
import CompanyForm from './CompanyForm'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import './style.css'

const CompanyDetailsForm = () => {
  /* get company details */
  const [companyDetails, setCompanyDetails] = useState({})
  const [data, setData] = useState(null)

  useEffect(() => {
    getCompanyDetails().then((response) => setData(response.data.company))
  }, [])

  useEffect(() => {
    setCompanyDetails(data)
  }, [data])

  return companyDetails ? (
    <>
      <div className="form-demo">
        <div>
          <CompanyForm preloadedValues={companyDetails} />
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

export default CompanyDetailsForm
