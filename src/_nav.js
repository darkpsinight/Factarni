import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import PeopleIcon from '@mui/icons-material/People'
import ArticleIcon from '@mui/icons-material/Article'
import PercentIcon from '@mui/icons-material/Percent'
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import BrightnessAutoOutlinedIcon from '@mui/icons-material/BrightnessAutoOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt'
import { FileExcelOutlined } from '@ant-design/icons'
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import PasswordIcon from '@mui/icons-material/Password'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'

//logout
const logout = () => {
  console.log('hello world')
  localStorage.removeItem('accessTokenServer')
  localStorage.removeItem('accessTokenFirebase')
  window.location.reload()
}

const _nav = (isAuthenticated) => [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Clients',
    to: '/clients',
    icon: <PeopleIcon style={{ marginRight: 20, marginLeft: 5 }} />,
  },
  {
    component: CNavItem,
    name: 'Articles',
    to: '/articles',
    icon: <ArticleIcon style={{ marginRight: 20, marginLeft: 5 }} />,
  },
  {
    component: CNavItem,
    name: 'VAT',
    to: '/vat',
    icon: <PercentIcon style={{ marginRight: 20, marginLeft: 5 }} />,
  },
  {
    component: CNavItem,
    name: 'Estimates',
    to: '/devis',
    icon: <CurrencyExchangeTwoToneIcon style={{ marginRight: 20, marginLeft: 5 }} />,
  },
  {
    component: CNavItem,
    name: 'Invoices',
    to: '/invoices',
    icon: <RequestQuoteIcon style={{ marginRight: 20, marginLeft: 5 }} />,
  },
  {
    component: CNavItem,
    name: 'Sales',
    to: '/sales',
    icon: <BarChartIcon style={{ marginRight: 20, marginLeft: 5 }} />,
  },
  {
    component: CNavGroup,
    name: 'Settings',
    icon: <SettingsIcon style={{ marginRight: 20, marginLeft: 5 }} />,
    items: [
      {
        component: CNavGroup,
        name: 'Invoice',
        icon: <DescriptionOutlinedIcon style={{ marginRight: 5, marginLeft: -20 }} />,
        items: [
          {
            component: CNavItem,
            name: 'Invoice Preference',
            to: '/settings/invoicePreference',
            icon: <AppSettingsAltIcon style={{ marginRight: 10, marginLeft: -10 }} />,
          },
          {
            component: CNavItem,
            name: 'Export Excel',
            to: '/settings/exportExcel',
            icon: (
              <FileExcelOutlined style={{ marginRight: 10, marginLeft: -10, fontSize: '22px' }} />
            ),
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Account',
        icon: <AccountCircleOutlinedIcon style={{ marginRight: 5, marginLeft: -20 }} />,
        items: [
          {
            component: CNavItem,
            name: 'Company Details',
            to: '/settings/companyDetails',
            icon: <ApartmentRoundedIcon style={{ marginRight: 10, marginLeft: -10 }} />,
          },
          {
            component: CNavItem,
            name: 'Account Informations',
            to: '/settings/accountinformations',
            icon: <ManageAccountsOutlinedIcon style={{ marginRight: 10, marginLeft: -10 }} />,
          },
          {
            component: CNavItem,
            name: 'Password & Security',
            to: '/settings/passwordandsecurity',
            icon: <PasswordIcon style={{ marginRight: 10, marginLeft: -10 }} />,
          },
          {
            component: CNavItem,
            name: 'Delete Account',
            to: '/settings/deleteaccount',
            icon: <DeleteForeverOutlinedIcon style={{ marginRight: 10, marginLeft: -10 }} />,
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Display',
        icon: <BrightnessAutoOutlinedIcon style={{ marginRight: 5, marginLeft: -20 }} />,
        items: [
          {
            component: CNavItem,
            name: 'Display Settings',
            to: '/settings/displaysettings',
            icon: <DisplaySettingsIcon style={{ marginRight: 10, marginLeft: -10 }} />,
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Support',
        icon: <SupportAgentOutlinedIcon style={{ marginRight: 5, marginLeft: -20 }} />,
        items: [
          {
            component: CNavItem,
            name: 'Contact Us',
            to: '/settings/contactus',
            icon: <EmailOutlinedIcon style={{ marginRight: 10, marginLeft: -10 }} />,
          },
        ],
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Authentication',
  },
  {
    component: CNavItem,
    name: isAuthenticated ? 'Logout' : 'Login',
    to: isAuthenticated ? '/login' : '/',
    icon: isAuthenticated ? (
      <div id="logout-auth-true" onClick={() => logout()}>
        <LogoutIcon style={{ marginRight: 20, marginLeft: 5 }} />
      </div>
    ) : (
      <LoginIcon style={{ marginRight: 20, marginLeft: 5 }} />
    ),
  },
]

export default _nav
