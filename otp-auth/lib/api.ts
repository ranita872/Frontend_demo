import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // allows cookies to be sent with requests
})

export default api
