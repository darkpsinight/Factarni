import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import './BasicTableClient.css'
import propTypes from 'prop-types'
import { editClient } from '../../../../Service/apiClients'

const BasicTableClient = (props) => {
  const [client, setClient] = useState(null)

  const statuses = [
    { label: 'Inactive', value: 0 },
    { label: 'Active', value: 1 },
    { label: 'Suspended', value: 2 },
  ]

  const getStatusLabelStamp = (status) => {
    switch (status) {
      case 0:
        return <Tag value="Inactive" severity="danger" icon="pi pi-times"></Tag>

      case 1:
        return <Tag value="Active" severity="success" icon="pi pi-check"></Tag>

      case 2:
        return <Tag value="Suspended" severity="warning" icon="pi pi-stopwatch"></Tag>

      default:
        return <Tag value="NA" severity="info" icon="pi pi-info-circle"></Tag>
    }
  }

  const getStatusLabelTva = (status) => {
    switch (status) {
      case 0:
        return <Tag value="Inactive" severity="danger" icon="pi pi-times"></Tag>

      case 1:
        return <Tag value="Active" severity="success" icon="pi pi-check"></Tag>

      case 2:
        return <Tag value="Suspended" severity="warning" icon="pi pi-stopwatch"></Tag>

      default:
        return <Tag value="NA" severity="info" icon="pi pi-info-circle"></Tag>
    }
  }

  useEffect(() => {
    setClient(props.propsSelectedClient)
  }, [props.propsSelectedClient])

  const onRowEditComplete = (data) => {
    let client2 = [...client]
    let { newData, index } = data

    client2[index] = newData

    //api update client
    console.log('client2: ', client2)
    editClient(client2[0].id, Object.assign({}, ...client2))
      .then(setClient(client2))
      .catch(console.log('Cant update client, please try again'))
  }

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    )
  }

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <span className={`status-${option.value}`}>{option.label}</span>
        }}
      />
    )
  }

  const phoneEditor = (options) => {
    return (
      <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} />
    )
  }

  const statusBodyTemplateStamp = (rowData) => {
    return getStatusLabelStamp(rowData.timbre)
  }

  const statusBodyTemplateTva = (rowData) => {
    return getStatusLabelTva(rowData.vat)
  }

  return (
    <>
      {/* <p>{JSON.stringify(client)}</p> */}
      <div className="datatable-editing-demo">
        <div className="card p-fluid">
          <DataTable
            showGridlines
            type="search"
            value={client}
            editMode="row"
            dataKey="id"
            onRowEditComplete={onRowEditComplete}
            responsiveLayout="scroll"
          >
            <Column field="name" header="Name" editor={(options) => textEditor(options)}></Column>
            <Column field="email" header="Email" editor={(options) => textEditor(options)}></Column>
            <Column
              field="telephone"
              header="Phone"
              editor={(options) => phoneEditor(options)}
            ></Column>
            <Column
              field="tax_identification"
              header="Matricule fiscale"
              editor={(options) => textEditor(options)}
            ></Column>
            <Column
              field="timbre"
              header="Stamp"
              body={statusBodyTemplateStamp}
              editor={(options) => statusEditor(options)}
            ></Column>
            <Column
              field="vat"
              header="TVA"
              body={statusBodyTemplateTva}
              editor={(options) => statusEditor(options)}
            ></Column>
            <Column
              rowEditor
              headerStyle={{ minWidth: '7rem' }}
              bodyStyle={{ textAlign: 'center' }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  )
}

export default BasicTableClient

BasicTableClient.propTypes = {
  propsSelectedClient: propTypes.any,
}
