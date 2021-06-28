import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"

export const useUser = (id) => {
  const axios = useAxiosProvider()

  const fetchUserById = useCallback(
    async (id) => {
      const { data } = await axios.get(`/user/${id}`)
      return data.data
    },
    [axios]
  )

  const { data: userData, isLoading: isLoadingUserData } = useQuery(
    ["user", id],
    () => fetchUserById(id),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  )
  return { userData, isLoadingUserData }
}
