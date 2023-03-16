import axios from 'axios'

const baseURL = 'https://api.factures.tn/client'

const token = localStorage.getItem('accessTokenServer')

const config = { headers: { Authorization: `Bearer ${token}` } }

export const getClients = async (id) => {
  id = id || ''
  try {
    return await axios.get(`${baseURL}`, config)
  } catch (error) {
    console.log('Error while calling getClients api ', error)
  }
}

export const addClient = async (client) => {
  return await axios.post(`${baseURL}/create`, client, config)
}

export const deleteClient = async (id) => {
  return await axios.delete(`${baseURL}/${id}`, config)
}

export const editClient = async (id, client) => {
  return await axios.put(`${baseURL}/${id}`, client, config)
}
