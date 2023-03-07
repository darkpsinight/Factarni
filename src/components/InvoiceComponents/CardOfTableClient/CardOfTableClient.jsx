import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material'
import propTypes from 'prop-types'
import BasicTableClient from './BasicTableClient/BasicTableClient'
import { Panel } from 'primereact/panel'
import { Ripple } from 'primereact/ripple'

const CardOfTableClient = (props) => {
  const [propsSelectedClient, setPropsSelectedClient] = useState(null)
  console.log('propsSelectedClient: ', propsSelectedClient)

  useEffect(() => {
    setPropsSelectedClient(props.selectedClient)
  }, [props.selectedClient])

  const renderBasicTableClient = () => {
    if (propsSelectedClient !== null && propsSelectedClient[0] !== null) {
      return (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <h5>Client details:</h5>
            {/* <p>{JSON.stringify(propsSelectedClient)}</p> */}
            <Panel
              headerTemplate={template}
              toggleable
              className="showHide"
              collapsed={props.toggleFieldSetClient}
            >
              <BasicTableClient propsSelectedClient={propsSelectedClient} />
            </Panel>
          </div>
        </div>
      )
    } else {
      return (
        <>
          <div>
            <Alert sx={{ marginBottom: '10px' }} severity="warning">
              Select a client
            </Alert>
          </div>
        </>
      )
    }
  }

  const template = (options) => {
    const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up'
    const className = `${options.className} justify-content-start`
    const titleClassName = `${options.titleClassName} pl-1`

    return (
      <div className={className}>
        <button className={options.togglerClassName} onClick={options.onTogglerClick}>
          <span className={toggleIcon}></span>
          <Ripple />
        </button>
        <span className={titleClassName}>Toggle Client Details</span>
      </div>
    )
  }

  return (
    <>
      <div>{renderBasicTableClient()}</div>
    </>
  )
}

export default CardOfTableClient

CardOfTableClient.propTypes = {
  toggleFieldSetClient: propTypes.bool,
  selectedClient: propTypes.any,
}
