import React, { useEffect, useState } from 'react'
import { AutoComplete } from 'primereact/autocomplete'
import { getClients } from '../../../../Service/apiClients'
import AlertMessageClientNetwork from '../../AlertMessage/AlertMessageClientNetwork'
import './style.css'
import propTypes from 'prop-types'

const ClientAutoComplete = (props) => {
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState(null)
  const [filteredClients, setFilteredClients] = useState(null)
  const [networkError, setNetworkError] = useState(false)

  /* get client_id + company_id for API */
  let client_id = null
  let company_id = null

  if (selectedClient !== null) {
    company_id = selectedClient.company_id
    client_id = selectedClient.id
    console.log('client_id: ', client_id)
    console.log('company_id: ', company_id)
  }

  useEffect(() => {
    getClients()
      .then((response) => {
        setClients(response.data)
      })
      .catch((error) => {
        if (!error.status) {
          setNetworkError(true)
        }
      })
  }, [])

  // console.log('selectedClient: ', selectedClient)

  useEffect(() => {
    props.setSelectedClient(Array(selectedClient))
    // eslint-disable-next-line
  }, [selectedClient])

  const searchClient = (event) => {
    setTimeout(() => {
      let _filteredClient
      if (!event.query.trim().length) {
        _filteredClient = [...clients]
      } else {
        _filteredClient = clients.filter((item) => {
          return item.name.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }

      setFilteredClients(_filteredClient)
      props.setToggleFieldSetClient(props.toggleFieldSetClient)
    }, 150)
  }

  const itemTemplate = (item) => {
    return (
      <div className="client-item">
        <div>{item.name}</div>
      </div>
    )
  }

  return (
    <>
      <div className="field">
        <h5>Client:</h5>
        <AutoComplete
          value={selectedClient}
          suggestions={filteredClients}
          completeMethod={searchClient}
          field="name"
          dropdown
          forceSelection
          itemTemplate={itemTemplate}
          onChange={(e) => setSelectedClient(e.value)}
          aria-label="clientAutoComplete"
          dropdownAriaLabel="Select Client"
          className="clientAutoComplete"
        />
      </div>
      <div>{networkError && <AlertMessageClientNetwork />}</div>
    </>
  )
}

export default ClientAutoComplete

ClientAutoComplete.propTypes = {
  setToggleFieldSetClient: propTypes.func,
  toggleFieldSetClient: propTypes.bool,
  setSelectedClient: propTypes.func,
}
