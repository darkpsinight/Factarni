import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import { getVats, deleteVat } from 'src/Service/apiVat'
import ConfirmDialog from 'src/components/ConfirmDialog'
import Notification from 'src/components/Notification'
import DialogAddArticle from 'src/components/vatDialog/DialogAddVat'
import DialogEditArticle from 'src/components/vatDialog/DialogEditVat'
import { useNavigate } from 'react-router-dom'

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #ffffff;
  }
`

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`

const Vat = () => {
  const [vats, setVats] = useState([])
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
  })

  useEffect(() => {
    getAllVats()
  }, [])

  //check authentication
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('accessTokenServer') !== null) {
      console.log(`Logged in`)
    } else {
      console.log(`Logged out`)
      navigate('/login')
    }
  }, [navigate])

  const deleteVatData = async (id) => {
    setConfirmDialog({
      ...setConfirmDialog,
      isOpen: false,
    })
    await deleteVat(id)
    getAllVats()
    setNotify({
      isOpen: true,
      message: 'VAT Deleted Successfully.',
      type: 'error',
    })
  }

  const getAllVats = async () => {
    let response = await getVats()
    setVats(response.data)
  }

  return (
    <>
      <DialogAddArticle getAllVats={getAllVats} />
      <Notification notify={notify} setNotify={setNotify} />
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell style={{ width: '150px', textAlign: 'center' }}>VAT:</TableCell>
            <TableCell style={{ width: '200px', textAlign: 'center' }}> Actions: </TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {vats.map((vat) => (
            <TRow key={vat.id}>
              <TableCell style={{ textAlign: 'center' }}>{vat.vat * 100} %</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <DialogEditArticle data={vat.id} getAllVats={getAllVats} />
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Are you sure to delete this VAT?',
                      subTitle: 'You can`t undo this action!',
                      onConfirm: () => {
                        deleteVatData(vat.id)
                      },
                    })
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  )
}

export default Vat
