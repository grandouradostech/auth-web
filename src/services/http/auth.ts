import axios from "axios"
import { SudoManager } from "../sudo-manager"

const auth_api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  withCredentials: true,
})

auth_api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 403) {
      if (
        error.response?.data?.code === "SUDO_REQUIRED" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true

        return new Promise((resolve, reject) => {
          SudoManager.subscribe((sudoToken) => {
            if (sudoToken) {
              originalRequest.headers["X-Sudo-Token"] = sudoToken
              resolve(auth_api(originalRequest))
            } else {
              reject(error)
            }
          })
          SudoManager.prompt()
        })
      }

      if (
        error.response?.data?.code === "FORBIDDEN" ||
        error.response?.data?.message === "FORBIDDEN"
      ) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("APP_FORBIDDEN_ERROR"))
        }
      }
    }

    return Promise.reject(error)
  },
)

export { auth_api }
