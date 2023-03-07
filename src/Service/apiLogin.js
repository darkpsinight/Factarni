import axios from 'axios'

const baseURL = 'https://api.factures.tn/login'

export const login = async () => {
  try {
    const token = localStorage.getItem('accessTokenFirebase')
    const config = { headers: { Authorization: `Bearer ${token}` } }
    return await axios.post(`${baseURL}`, {}, config)
  } catch (error) {
    console.log(error)
  }
}
