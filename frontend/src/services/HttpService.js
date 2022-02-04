import axios from 'axios'
import store from '../store/index'

export default (headers = null, withToken = true) => {
  if (headers == null) {
    headers = {
      'Content-Type': 'application/json'
    }
  }

  if (withToken) {
    headers['x-access-token'] = store.getters['user/getToken']
  }

  return axios.create({
    timeout: 100000,
    baseURL: 'http://localhost:3000',
    headers: headers
  })
}
