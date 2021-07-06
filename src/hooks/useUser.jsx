import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"
import { EitherAsync } from "purify-ts"

const fetchUserById = (axios) => (id) =>
  EitherAsync(async ({ fromPromise, throwE }) => {
    let data
    try {
      data = await fromPromise(axios.get(`/user/${id}`))
    } catch (e) {
      throwE(e)
    }
    return data.data.data
  })

export const useUser = (id) => {
  const axios = useAxiosProvider()

  const fetchUser = useCallback(() => fetchUserById(axios).run(), [axios])

  const { data: userData, isLoading: isLoadingUserData } = useQuery(
    ["user", id],
    () => fetchUser(id),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  )
  return { userData, isLoadingUserData }
}
