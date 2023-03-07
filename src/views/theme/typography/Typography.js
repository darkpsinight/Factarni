import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import { getUsers, deleteUser } from 'src/Service/apiArticle'
import ConfirmDialog from 'src/components/ConfirmDialog'
import Notification from 'src/components/Notification'
import DialogAddArticle from 'src/components/articleDialog/DialogAddArticle'
import DialogEditArticle from 'src/components/articleDialog/DialogEditArticle'
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

const Typography = () => {
  const [users, setUsers] = useState([])
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
    getAllUsers()
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

  const deleteUserData = async (id) => {
    setConfirmDialog({
      ...setConfirmDialog,
      isOpen: false,
    })
    await deleteUser(id)
    getAllUsers()
    setNotify({
      isOpen: true,
      message: 'Article Deleted Successfully.',
      type: 'error',
    })
  }

  const getAllUsers = async () => {
    let response = await getUsers()
    setUsers(response.data)
  }

  return (
    <>
      <DialogAddArticle getAllUsers={getAllUsers} />
      <Notification notify={notify} setNotify={setNotify} />
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell style={{ width: '150px' }}>Code:</TableCell>
            <TableCell style={{ width: '150px' }}>Description:</TableCell>
            <TableCell style={{ width: '150px' }}>Price:</TableCell>
            <TableCell style={{ width: '150px' }}>VAT:</TableCell>
            <TableCell style={{ width: '150px' }}>Status:</TableCell>
            <TableCell style={{ width: '200px' }}> Actions: </TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TRow key={user.id}>
              <TableCell>{user.code}</TableCell>
              <TableCell>{user.article}</TableCell>
              <TableCell>{user.price}</TableCell>
              <TableCell>{user.vat.vat * 100} %</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <DialogEditArticle data={user.id} getAllUsers={getAllUsers} />
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Are you sure to delete this Article?',
                      subTitle: 'You can`t undo this action!',
                      onConfirm: () => {
                        deleteUserData(user.id)
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

export default Typography
