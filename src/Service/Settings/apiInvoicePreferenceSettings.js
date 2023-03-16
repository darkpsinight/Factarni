import axios from 'axios'

const token = localStorage.getItem('accessTokenServer')

export const getAccountDetails = async () => {
  try {
    return await axios({
      method: 'get',
      baseURL: 'https://api.factures.tn',
      url: '/profile',
      headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.log('Error while calling getAccountDetails API: ', error)
  }
}

export const putInvoicePreference = async (id, data) => {
  try {
    return await axios({
      method: 'put',
      baseURL: 'https://api.factures.tn',
      url: `/company/${id}`,
      data,
      headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.log('Error while calling putInvoicePreference API: ', error)
  }
}
