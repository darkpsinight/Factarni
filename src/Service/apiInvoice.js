import axios from 'axios'

const baseURL = 'https://api.factures.tn/invoice'

const token = localStorage.getItem('accessTokenServer')

const config = {
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
}

export const getInvoice = async () => {
  return await axios.get(`${baseURL}`, config)
}
export const deleteInvoice = async (id) => {
  return await axios.delete(`${baseURL}/${id}`, config)
}

export const getHydratedInvoice = async (id) => {
  try {
    const response = await axios.get(`https://api.factures.tn/hydratedinvoice/${id}`, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const addInvoice = async (header, lines) => {
  var bodyFormData = new FormData()
  bodyFormData.append('header', JSON.stringify(header))
  bodyFormData.append('lines', JSON.stringify(lines))

  return await axios({
    method: 'post',
    url: `${baseURL}/create`,
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
  })
}
