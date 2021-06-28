import { useMemo, createContext, useContext } from "react"
import Axios from "axios"
import { useSession } from "./SessionProvider"

export const AxiosContext = createContext()

export const useAxiosProvider = () => useContext(AxiosContext)

export function AxiosProvider({ children }) {
  const { session } = useSession()

  console.log(session)

  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    axios.interceptors.request.use((config) => {
      // Read token for anywhere, in this case directly from localStorage

      if (session.token) {
        config.headers.Authorization = `Bearer ${session.token}`
      }

      return config
    })

    return axios
  }, [session.token])

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
}
