import axios from 'axios'

const baseURL = 'https://api.factures.tn/hydratedinvoice'

const token = localStorage.getItem('accessTokenServer')

const config = {
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
}

export const getHydratedInvoice = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
