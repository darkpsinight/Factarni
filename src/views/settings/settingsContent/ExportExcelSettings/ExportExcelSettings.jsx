import React, { useRef, useState } from 'react'
import { Typography } from '@mui/material'
import { Card, Divider } from 'antd'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { postExportExcel } from '../../../../Service/Settings/apiExportExcelSettings'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'

const ExportExcelSettings = () => {
  const [loading1, setLoading1] = useState(false)

  /* Toast */
  const toast = useRef(null)

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Export Excel Successfull',
      detail: 'You successfully exported your data.',
    })
  }

  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Export ERROR!',
      detail:
        'Exporting has failed, please check your network then retry. If problem persist contact us.',
      life: 2000,
    })
  }

  const onLoadingClick1 = () => {
    setLoading1(true)
    postExportExcel()
      .then((response) => {
        // download blob (raw data as response) then convert it to file with .xlsx extension
        const href = URL.createObjectURL(response.data)
        const link = document.createElement('a') // <a> ... </a>
        link.href = href
        link.setAttribute('download', 'Export_Invoice_file.xlsx') //att attribute 'download' + rename file with extention
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) //release memory
        URL.revokeObjectURL(href)
      })
      .then((response) => {
        showSuccess()
      })
      .catch((error) => {
        showError()
      })
    setTimeout(() => {
      setLoading1(false)
    }, 2000)
  }

  return (
    <>
      <div>
        <div>
          <Toast ref={toast} />
        </div>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          Export Excel:
        </Typography>
        <Divider />
        <Card>
          <div className="p-fluid">
            <Typography variant="h7" component="div">
              To export your invoices data to your device, please click on the button below:
            </Typography>
            <Button
              type="submit"
              label="Export Invoice data"
              className="mt-2"
              icon="pi pi-file-export"
              loading={loading1}
              onClick={() => {
                onLoadingClick1()
              }}
              style={{ display: 'flex', flexDirection: 'row-reverse' }}
            />
          </div>
        </Card>
      </div>
    </>
  )
}

export default ExportExcelSettings
