import React, { useEffect, useRef } from 'react'
import { Messages } from 'primereact/messages'

const AlertMessageArticleNetwork = () => {
  const msgs1 = useRef(null)

  useEffect(() => {
    msgs1.current.show([
      {
        severity: 'warn',
        detail: 'Cant load Articles, re-open this window or contact us',
        sticky: true,
      },
    ])
  }, [])
  return (
    <>
      <div>
        <Messages ref={msgs1} />
      </div>
    </>
  )
}

export default AlertMessageArticleNetwork
