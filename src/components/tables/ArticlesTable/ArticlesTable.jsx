import React, { useEffect, useState } from 'react'
import { Divider } from 'antd'
import moment from 'moment'
import ArticleDatePicker from './ArticleDatePicker/ArticleDatePicker'
import ArticleTableWithoutDate from './ArticleTableWithoutDate/ArticleTableWithoutDate'

const ArticlesTable = () => {
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
        <ArticleDatePicker
          rangeDate={rangeDate}
          setRangeDate={setRangeDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
      <Divider />
      <div>
        <ArticleTableWithoutDate startDate={startDate} endDate={endDate} />
      </div>
    </>
  )
}

export default ArticlesTable
