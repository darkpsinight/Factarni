import axios from 'axios'

// const baseURL = 'https://api.factures.tn/invoice'

const token = localStorage.getItem('accessTokenServer')

// const config = { headers: { Authorization: `Bearer ${token}` } }

export const postExportExcel = async () => {
  try {
    return await axios({
      method: 'post',
      baseURL: 'https://api.factures.tn/invoice',
      url: '/export',
      responseType: 'blob',
      headers: { authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.log('Error while calling postExportExcel API: ', error)
  }
}
