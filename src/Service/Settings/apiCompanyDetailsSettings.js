import axios from 'axios'

const token = localStorage.getItem('accessTokenServer')

export const getCompanyDetails = async () => {
  try {
    return await axios({
      method: 'get',
      baseURL: 'https://api.factures.tn',
      url: '/profile',
      headers: { authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    })
  } catch (error) {
    console.log('Error while calling getCompanyDetails API: ', error)
  }
}
export const putCompanyDetails = async (id, data) => {
  id = id || ''
  try {
    return await axios({
      method: 'put',
      baseURL: 'https://api.factures.tn',
      url: `/company/${id}`,
      data,
      headers: { authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    })
  } catch (error) {
    console.log('Error while calling putCompanyDetails API: ', error)
  }
}
