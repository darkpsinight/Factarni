import axios from 'axios'

const baseURL = 'https://api.factures.tn/vat'

const token = localStorage.getItem('accessTokenServer')

const config = { headers: { Authorization: `Bearer ${token}` } }

export const getVats = async (id) => {
  id = id || ''
  try {
    return await axios.get(`${baseURL}`, config)
  } catch (error) {
    console.log('Error while calling getVats API ', error)
  }
}

export const addVat = async (vat) => {
  return await axios.post(`${baseURL}/create`, vat, config)
}

export const deleteVat = async (id) => {
  return await axios.delete(`${baseURL}/${id}`, config)
}

export const editVat = async (id, vat) => {
  return await axios.put(`${baseURL}/${id}`, vat, config)
}
