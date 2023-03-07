import axios from 'axios'

const baseURL = 'https://api.factures.tn/article'

const token = localStorage.getItem('accessTokenServer')

const config = { headers: { Authorization: `Bearer ${token}` } }

export const getUsers = async (id) => {
  id = id || ''
  try {
    return await axios.get(`${baseURL}`, config)
  } catch (error) {
    console.log('Error while calling getArticles api ', error)
  }
}

export const addUser = async (user) => {
  return await axios.post(`${baseURL}/create`, user, config)
}

export const deleteUser = async (id) => {
  return await axios.delete(`${baseURL}/${id}`, config)
}

export const editUser = async (id, user) => {
  return await axios.put(`${baseURL}/${id}`, user, config)
}
