import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { getClients, deleteClient } from '../../../Service/apiClients'
import { IconButton } from '@mui/material'
import DialogAddClient from '../../../components/clientDialog/DialogAddClient'
import DialogEditClient from '../../../components/clientDialog/DialogEditClient'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import ConfirmDialog from '../../../components/ConfirmDialog'
import LinearProgress from '@mui/material/LinearProgress'
import { Spin, Popover } from 'antd'
// import 'antd/dist/antd.min.css'
import './style.css'
import Toastify from 'src/components/notificationToast/Toastify'
import { toast } from 'react-toastify'

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}))

const Colors = () => {
  const [clients, setClients] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [pageSize, setPageSize] = useState(6)
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
  })

  const getAllClients = async () => {
    let response = await getClients()
    setClients(response.data)
  }

  useEffect(() => {
    setIsLoading(true)
    getAllClients()
    setIsLoading(false)
  }, [])

  const handleEdit = (data) => {
    console.log(data)
  }

  const handleDelete = async (data) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to delete this Client?',
      subTitle: 'You can`t undo this action!',
      onConfirm: async () => {
        setConfirmDialog({
          ...setConfirmDialog,
          isOpen: false,
        })
        setIsLoading(true)
        await deleteClient(data.id)
        toast.error('Client deleted successfully !')
        setClients(clients.filter((client) => client.id !== data.id))
        setIsLoading(false)
      },
    })
  }

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

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Popover content={params.value} title={params.field}>
          <span type="primary">{params.value}</span>
        </Popover>
      ),
    },
    {
      field: 'telephone',
      headerName: 'Telephone',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Popover content={params.value} title={params.field}>
          <span type="primary">{params.value}</span>
        </Popover>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Popover content={params.value} title={params.field}>
          <span type="primary">{params.value}</span>
        </Popover>
      ),
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Popover content={params.value} title={params.field}>
          <span type="primary">{params.value}</span>
        </Popover>
      ),
    },
    {
      field: 'fax',
      headerName: 'Fax',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Popover content={params.value} title={params.field}>
          <span type="primary">{params.value}</span>
        </Popover>
      ),
    },
    {
      field: 'timbre',
      headerName: 'Timbre',
      type: 'boolean', //convert 1 and 0 to checkmark
      width: 80,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'vat',
      headerName: 'VAT',
      type: 'boolean',
      width: 80,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 40,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell-edit',
      renderCell: (params) => {
        return (
          <IconButton
            style={{
              border: '1px',
              margin: '-10px',
              height: '50px',
              width: '50px',
            }}
            onClick={() => handleEdit(params.row)}
          >
            <DialogEditClient data={params.row} getAllClients={getAllClients} />
          </IconButton>
        )
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 60,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell-delete',
      renderCell: (params) => {
        return (
          <IconButton
            style={{
              border: '1px',
              margin: '-5px',
              height: '50px',
              width: '50px',
            }}
            onClick={() => handleDelete(params.row)}
          >
            <DeleteForeverIcon style={{ color: 'red' }} />
          </IconButton>
        )
      },
    },
  ]

  const rows = clients.map((client) => ({
    id: client.id,
    name: client.name,
    address: client.address,
    email: client.email,
    telephone: client.telephone,
    fax: client.fax,
    timbre: client.timbre,
    vat: client.vat,
  }))

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <div
          style={{
            margin: '20px 0',
            marginBottom: '20px',
            padding: '30px 50px',
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.03)',
            borderRadius: '4px',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 184 152" aria-hidden focusable="false">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(24 31.67)">
                <ellipse
                  className="ant-empty-img-5"
                  cx="67.797"
                  cy="106.89"
                  rx="67.797"
                  ry="12.668"
                />
                <path
                  className="ant-empty-img-1"
                  d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                />
                <path
                  className="ant-empty-img-2"
                  d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                />
                <path
                  className="ant-empty-img-3"
                  d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                />
              </g>
              <path
                className="ant-empty-img-3"
                d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
              />
              <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
              </g>
            </g>
          </svg>
          <Box sx={{ mt: 1, color: '#BFBFBF' }}>Please check your network or Reload page</Box>
          <Spin style={{ marginTop: '10px' }} tip="Loading..."></Spin>
        </div>
      </StyledGridOverlay>
    )
  }

  return (
    <div style={{ height: 500, width: '100%' }}>
      <Toastify />
      <DialogAddClient getAllClients={getAllClients} />
      {isLoading ? <LinearProgress color="inherit" /> : ''}
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <DataGrid
        sx={{
          backgroundColor: 'white',
          boxShadow: 5,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          '& .super-app-theme--header': {
            backgroundColor: '#99CFEC',
          },
          '& .super-app-theme--cell-edit': {
            backgroundColor: 'rgba(157, 255, 118, 0.49)',
          },
          '& .super-app-theme--cell-delete': {
            backgroundColor: '#ffb3b3',
          },
          // MUI striped rows (different background row color each two rows)
          '.MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: 'aliceblue',
          },
        }}
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[6, 10, 20, 50, 60, 80, 100]}
        pagination
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          Toolbar: GridToolbar,
        }}
      />
    </div>
  )
}

export default Colors
