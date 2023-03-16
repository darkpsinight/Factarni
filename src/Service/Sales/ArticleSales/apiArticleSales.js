import axios from 'axios'

const baseURL = 'https://api.factures.tn/article/total'

const token = localStorage.getItem('accessTokenServer')

const config = { headers: { Authorization: `Bearer ${token}` } }

export const getArticleSales = async (startDate, endDate) => {
  try {
    return await axios.get(`${baseURL}?start_date=${startDate}&end_date=${endDate}`, config)
  } catch (error) {
    console.log('Error while calling getArticleSales API: ', error)
  }
}
