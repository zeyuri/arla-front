import { useQuery } from "react-query"
import api from "../api"

export const fetchCitysByEstateId = async (estateId) => {
  const { data } = await api.get(`/location/city/${estateId}`)
  return data.data
}

export function useCitys(estateId) {
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
