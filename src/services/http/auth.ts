import axios from "axios"

const auth_api = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
})

export { auth_api }
