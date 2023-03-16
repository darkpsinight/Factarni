import React, { useEffect, useRef } from 'react'
import { Toast } from 'primereact/toast'

const AlertMessageArticleNetwork = () => {
  const toast = useRef(null)

  useEffect(() => {
    toast.current.show({
      severity: 'warn',
      summary: 'Network error',
      detail: 'Cant load VATs, check your network or contact us',
    })
  }, [])

  return (
    <>
      <div>
        <Toast ref={toast} position="top-left" />
      </div>
    </>
  )
}

export default AlertMessageArticleNetwork
