import axios from 'axios'

const baseURL = 'https://api.factures.tn/invoice'

const token = localStorage.getItem('accessTokenServer')

const config = { headers: { Authorization: `Bearer ${token}` } }

export const getSalesYears = async () => {
  try {
    return await axios.get(`${baseURL}/year`, config)
  } catch (error) {
    console.log('Error while calling getSalesYears API: ', error)
  }
}

export const getSalesByYear = async (year) => {
  year = year || ''
  try {
    return await axios.get(`${baseURL}/monthly?year=${year}`, config)
  } catch (error) {
    console.log('Error while calling getSalesByYear API: ', error)
  }
}
