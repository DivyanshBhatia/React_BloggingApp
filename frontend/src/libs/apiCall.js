import axios from 'axios'

//Keeping axios api request at one common place
const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    Accept: 'application/json',
    Authorization: 'can-be-anything'
  }
})

export default api