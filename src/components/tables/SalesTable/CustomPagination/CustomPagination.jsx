import React, { useEffect } from 'react'
import { Box, createStyles, withStyles } from '@material-ui/core'
import { ToggleButtonGroup } from '@material-ui/lab'
import { getSalesYears } from '../../../../Service/Sales/apiSales'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import MuiToggleButton from '@mui/material/ToggleButton'
import PropTypes from 'prop-types'

/* styling */
const ToggleButton = styled(MuiToggleButton)(() => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'blue',
    backgroundColor: '#ced3db',
  },
}))

const theme = createTheme({
  palette: {
    text: {
      primary: '#0000FF',
    },
  },
})

const BorderLessToggleButton = withStyles((theme) =>
  createStyles({
    root: {
      border: 'none',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),

      '&:not(:first-of-type)': {
        borderLeft: 'none',
        marginLeft: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
      },
      '&:not(:last-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }),
)(ToggleButton)
/* end styling */

export default function CustomPagination(props) {
  useEffect(() => {
    getSalesYears().then((response) => props.setSalesYears(response.data))
    // eslint-disable-next-line
  }, [])

  const changeValue = (_, v) => {
    if (v !== null) props.setValue(v)
  }

  return (
    <>
      <Box m={1}>
        <ThemeProvider theme={theme}>
          <ToggleButtonGroup
            color="primary"
            size="small"
            exclusive
            value={props.value}
            onChange={changeValue}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {props.salesYears.map((item, index) => (
              <BorderLessToggleButton key={index} value={index}>
                {item}
              </BorderLessToggleButton>
            ))}
          </ToggleButtonGroup>
        </ThemeProvider>
      </Box>
    </>
  )
}

CustomPagination.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
  salesYears: PropTypes.array,
  setSalesYears: PropTypes.func,
}
