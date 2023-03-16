import React, { useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import MUIDataTable from 'mui-datatables'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { getClientSales } from '../../../../Service/Sales/ClientSales/apiClientSales'
import PropTypes from 'prop-types'

const muiCache = createCache({
  key: 'mui-datatables',
  prepend: true,
})

const options = {
  filterType: 'dropdown',
  pagination: false,
  selectableRowsHideCheckboxes: true,
}

export default function ClientTableWithoutDate(props) {
  const [clientSales, setClientSales] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        await getClientSales(props.startDate, props.endDate).then(
          (response) => setClientSales(response.data),
          (response) => console.log(response.data),
        )
      } catch (error) {}
    }
    fetchMyAPI()
  }, [props.startDate, props.endDate])
  console.log('props.startDate: ', props.startDate)
  console.log('props.endDate: ', props.endDate)

  const columns = [
    { name: 'Name:' },
    { name: 'Tax Id:' },
    { name: 'Total Price:' },
    { name: 'Total HT:' },
    { name: 'Discount:' },
  ]
  const data = clientSales.map((row) => {
    return [row.name, row.tax_id, row.total_price, row.total_ht, row.discount]
  })

  return (
    <>
      <TableContainer component={Paper}>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title={'List of Articles sales:'}
              data={data}
              columns={columns}
              options={options}
              pageSize={12}
            />
          </ThemeProvider>
        </CacheProvider>
      </TableContainer>
    </>
  )
}

ClientTableWithoutDate.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
}
