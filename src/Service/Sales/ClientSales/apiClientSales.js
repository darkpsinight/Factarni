import axios from 'axios'

const baseURL = 'https://api.factures.tn/client/total'

const token = localStorage.getItem('accessTokenServer')

const config = { headers: { Authorization: `Bearer ${token}` } }

export const getClientSales = async (startDate, endDate) => {
  try {
    return await axios.get(`${baseURL}?start_date=${startDate}&end_date=${endDate}`, config)
  } catch (error) {
    console.log('Error while calling getClientSales API: ', error)
  }
}
