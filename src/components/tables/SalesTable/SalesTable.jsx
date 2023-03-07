import React, { useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import MUIDataTable from 'mui-datatables'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import CustomPagination from './CustomPagination/CustomPagination'
import { getSalesByYear } from '../../../Service/Sales/apiSales'

const muiCache = createCache({
  key: 'mui-datatables',
  prepend: true,
})

const options = {
  filterType: 'dropdown',
  pagination: false,
  selectableRowsHideCheckboxes: true,
}

const SalesTable = () => {
  const [monthlySales, setMonthlySales] = useState([])
  const [value, setValue] = useState(0) // value of selected button / year
  const [salesYears, setSalesYears] = useState([]) // contain list of years

  /* function */
  const [selectedYear, setSelectedYear] = useState([])

  useEffect(() => {
    setSelectedYear(salesYears[value])
  }, [salesYears, selectedYear, value])

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        await getSalesByYear(selectedYear).then((response) =>
          setMonthlySales(response.data.monthlySales),
        )
      } catch (error) {}
    }
    fetchMyAPI()
  }, [selectedYear])

  /* Month name */
  function getMonthName(monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber - 1)
    return date.toLocaleString('en-US', { month: 'long' })
  }

  const columns = [
    { name: 'Month:' },
    { name: 'Clients:' },
    { name: 'Invoices:' },
    { name: 'Total HT:' },
    { name: 'Total TTC:' },
  ]
  const data = monthlySales.map((row) => {
    return [
      getMonthName(row.month),
      row.client_count,
      row.invoice_count,
      row.total_ht,
      row.total_price,
    ]
  })

  return (
    <>
      <TableContainer component={Paper}>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title={'List of sales:'}
              data={data}
              columns={columns}
              options={options}
              pageSize={12}
            />
          </ThemeProvider>
        </CacheProvider>
      </TableContainer>
      <CustomPagination
        value={value}
        setValue={setValue}
        salesYears={salesYears}
        setSalesYears={setSalesYears}
      />
    </>
  )
}

export default SalesTable
