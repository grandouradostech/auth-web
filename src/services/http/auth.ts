import axios from "axios"

const auth_api = axios.create({
  baseURL: "http://72.62.140.205:3333",
  withCredentials: true,
})

export { auth_api }
