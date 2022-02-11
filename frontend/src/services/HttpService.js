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
    baseURL: `${process.env.VUE_APP_BACKEND_SCHEME}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}`,
    headers: headers
  })
}
