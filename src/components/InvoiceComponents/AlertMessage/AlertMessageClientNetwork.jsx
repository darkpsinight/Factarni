import React, { useEffect, useRef } from 'react'
import { Messages } from 'primereact/messages'

const AlertMessageClientNetwork = () => {
  const msgs1 = useRef(null)

  useEffect(() => {
    msgs1.current.show([
      {
        severity: 'warn',
        detail: 'Cant load Clients, re-open this window or contact us',
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

export default AlertMessageClientNetwork
