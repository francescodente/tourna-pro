import axios from 'axios';
import store from '../../store'

const client = axios.create({
  baseURL: 'http://localhost:3000'
})

client.interceptors.response.use(
  (res) => res,
  (error) => {
    store.dispatch('setError', error.response.data.error || "C'è stato un errore con la tua richiesta al server.")
    return Promise.reject(error)
  }
)

client.interceptors.request.use((config) => {
  if(store.getters.accessToken){
    config.headers.Authorization = `Bearer ${store.getters.accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

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