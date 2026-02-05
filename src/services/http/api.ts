import axios from "axios"

const api = axios.create({
  baseURL: process.env.SERVER_URL,
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer `
  return config
})

export { api }
