import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"

export function useEstateOptions() {
  const axios = useAxiosProvider()

  const fetchEstates = useCallback(async () => {
    const { data } = await axios.get("/location/estate")
    return data.data
  }, [axios])

  const { data: stateOptions, isLoading: isLoadingStates, ...rest } = useQuery(
    "estate-options",
    fetchEstates,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  )

  return { stateOptions, isLoadingStates, ...rest }
}
