import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

export function useUsers() {
  const axios = useAxiosProvider()
  const [params] = useSearchParams()
  const name = params.get("name")

  const fetchUserList = useCallback(async () => {
    const { data } = await axios.get("/user", {
      params: name && { name },
    })
    return data.data
  }, [axios, name])

  return useQuery(["users-list", "name", name], fetchUserList)
}
