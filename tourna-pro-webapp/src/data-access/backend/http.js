import axios from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:3000/api'
})

export default {
  get(url, query) {
    return client.get(url, {
      params: query
    })
  },
  post(url, body) {
    return client.post(url, {
      data: body
    })
  },
  put(url, body) {
    return client.put(url, {
      data: body
    })
  },
  delete(url) {
    return client.delete(url)
  }
}