import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import './css/TabViewDemo.css'
import SalesTable from '../../components/tables/SalesTable/SalesTable'
import ArticlesTable from '../../components/tables/ArticlesTable/ArticlesTable'
import ClientsTable from '../../components/tables/ClientsTable/ClientsTable'

const sales = () => {
  return (
    <>
      <div className="tabview-demo">
        <div className="card">
          <TabView className="tabview-header-icon">
            <TabPanel header="Sales" leftIcon="pi pi-calendar">
              <SalesTable />
            </TabPanel>
            <TabPanel header="Articles" rightIcon="pi pi-user">
              <ArticlesTable />
            </TabPanel>
            <TabPanel header="Clients" leftIcon="pi pi-search" rightIcon="pi pi-cog">
              <ClientsTable />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  )
}

export default sales
