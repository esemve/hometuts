import axios from 'axios'

export default axios.create({
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
})
