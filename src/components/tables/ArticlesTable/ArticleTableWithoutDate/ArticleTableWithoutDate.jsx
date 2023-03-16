import React, { useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import MUIDataTable from 'mui-datatables'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { getArticleSales } from '../../../../Service/Sales/ArticleSales/apiArticleSales'
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

export default function ArticleTableWithoutDate(props) {
  const [articlesSales, setArticlesSales] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        await getArticleSales(props.startDate, props.endDate).then(
          (response) => setArticlesSales(response.data),
          (response) => console.log(response.data),
        )
      } catch (error) {}
    }
    fetchMyAPI()
  }, [props.startDate, props.endDate])
  console.log('props.startDate: ', props.startDate)
  console.log('props.endDate: ', props.endDate)

  const columns = [
    { name: 'Code:' },
    { name: 'Name:' },
    { name: 'Price:' },
    { name: 'Quantity:' },
    { name: 'Discount:' },
    { name: 'Total:' },
  ]
  const data = articlesSales.map((row) => {
    return [row.code, row.name, row.price, row.quantity, row.discount, row.total]
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

ArticleTableWithoutDate.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
}
