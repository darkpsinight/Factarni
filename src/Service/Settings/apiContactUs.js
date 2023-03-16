import axios from 'axios'

const token = localStorage.getItem('accessTokenServer')

export const postContactUs = async (data) => {
  try {
    return await axios({
      method: 'post',
      baseURL: 'https://api.factures.tn',
      url: '/contact/create',
      data,
      headers: { authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    })
  } catch (error) {
    console.log('Error while calling postContactUs API: ', error)
  }
}
