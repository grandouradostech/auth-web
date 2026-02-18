import axios from "axios"

const auth_api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  withCredentials: true,
})

export { auth_api }
