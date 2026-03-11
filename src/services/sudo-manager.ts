type SudoCallback = (token: string | null) => void

let isPrompting = false
let subscribers: SudoCallback[] = []

export const SudoManager = {
  subscribe: (callback: SudoCallback) => {
    subscribers.push(callback)
  },
  prompt: () => {
    if (!isPrompting) {
      isPrompting = true
      window.dispatchEvent(new Event("OPEN_SUDO_MODAL"))
    }
  },
  resolve: (token: string) => {
    isPrompting = false
    subscribers.forEach((callback) => {
      callback(token)
    })
    subscribers = []
  },
  reject: () => {
    isPrompting = false
    subscribers.forEach((callback) => {
      callback(null)
    })
    subscribers = []
  },
}
