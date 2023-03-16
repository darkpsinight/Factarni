import axios from 'axios'

const token = localStorage.getItem('accessTokenServer')

export const deleteUser = async () => {
  try {
    return await axios({
      method: 'delete',
      baseURL: 'https://api.factures.tn',
      url: '/deleteuser',
      headers: { authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.log('Error while calling deleteUser API: ', error)
  }
}
