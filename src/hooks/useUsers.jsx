import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"

export function useUsers() {
  const axios = useAxiosProvider()

  const fetchUserList = useCallback(async () => {
    const { data } = await axios.get("/user")
    return data.data
  }, [axios])

  return useQuery("users-list", fetchUserList)
}
