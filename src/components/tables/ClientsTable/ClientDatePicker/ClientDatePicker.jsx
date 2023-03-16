import React from 'react'
import { DatePicker, Space } from 'antd'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
/* import moment from 'moment' */

const { RangePicker } = DatePicker

export default function ClientDatePicker(props) {
  const onChange = (dateString) => {
    // console.log('Formatted Selected Time: ', dateString)
    props.setRangeDate(dateString)
  }

  /* var defaultStartDay = new Date()
  defaultStartDay.setDate(defaultStartDay.getDate() - 30)
  console.log('defaultStartDay: ', moment(defaultStartDay).format('YYYY-MM-DD'))
  props.setStartDate(moment(defaultStartDay).format('YYYY-MM-DD'))

  var defaultEndDay = new Date()
  defaultEndDay.setDate(defaultEndDay.getDate())
  console.log('defaultEndDay: ', defaultEndDay)
  props.setEndDate(moment(defaultEndDay).format('YYYY-MM-DD')) */

  return (
    <div>
      <Typography variant="h5">
        Select a Date Range: &nbsp;&nbsp;
        <br />
        <br />
        <Space direction="vertical" size="large">
          <RangePicker
            size="large"
            /* defaultValue={[
              moment(defaultStartDay, 'YYYY-MM-DD'),
              moment(defaultEndDay, 'YYYY-MM-DD'),
            ]} */
            onChange={onChange}
          />
        </Space>
      </Typography>
    </div>
  )
}

ClientDatePicker.propTypes = {
  rangeDate: PropTypes.any,
  setRangeDate: PropTypes.func,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
}
