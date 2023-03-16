import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material'
import propTypes from 'prop-types'
import BasicTableClient from './BasicTableClient/BasicTableClient'
import { Collapse } from 'antd'
const { Panel } = Collapse

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
            <Collapse size="small" defaultActiveKey={['1']}>
              <Panel header="Client Information" key="1">
                <BasicTableClient propsSelectedClient={propsSelectedClient} />
              </Panel>
            </Collapse>
          </div>
        </div>
      )
    } else {
      return (
        <>
          <div>
            <Alert sx={{ marginBottom: '10px' }} severity="warning">
              Select a client <span style={{ color: 'red' }}>*</span>
            </Alert>
          </div>
        </>
      )
    }
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
