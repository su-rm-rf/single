import axios from 'axios'

axios.defaults.baseURL = '/backend'

export default {
  get(url) {
    return axios.get(url).catch(err => console.error(err))
  },
  post(url, payload) {
    return axios.post(url, payload).catch(err => console.error(err))
  }
}