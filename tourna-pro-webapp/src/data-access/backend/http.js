import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  get(url, query) {
    return client.get(url, {
      params: query,

    })
  },
  post(url, body) {
    return client.post(url, body)
  },
  put(url, body) {
    return client.put(url, body)
  },
  delete(url) {
    return client.delete(url)
  }
}