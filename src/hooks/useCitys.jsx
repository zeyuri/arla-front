import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"

export function useCitys(estateId) {
  const axios = useAxiosProvider()

  const fetchCitysByEstateId = useCallback(
    async (estateId) => {
      const { data } = await axios.get(`/location/city/${estateId}`)
      return data.data
    },
    [axios]
  )

  const { data: cityOptions, isLoading: isLoadingCitys, ...rest } = useQuery(
    ["city-options", estateId],
    () => fetchCitysByEstateId(estateId),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      enabled: Boolean(estateId),
    }
  )

  return { cityOptions, isLoadingCitys, ...rest }
}
