import React, { useEffect, useState } from 'react'
import { Divider } from 'antd'
import moment from 'moment'
import ClientDatePicker from './ClientDatePicker/ClientDatePicker'
import ClientTableWithoutDate from './ClientTableWithoutDate/ClientTableWithoutDate'

const ClientsTable = () => {
  const [rangeDate, setRangeDate] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    var x = moment(rangeDate[0]).format('YYYY-MM-DD')
    setStartDate(x)
    var y = moment(rangeDate[1]).format('YYYY-MM-DD')
    setEndDate(y)
  }, [rangeDate])

  return (
    <>
      <div>
        <ClientDatePicker
          rangeDate={rangeDate}
          setRangeDate={setRangeDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
      <Divider />
      <div>
        <ClientTableWithoutDate startDate={startDate} endDate={endDate} />
      </div>
    </>
  )
}

export default ClientsTable
