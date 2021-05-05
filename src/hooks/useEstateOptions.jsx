import api from "../api"
import { useQuery } from "react-query"
const fetchEstates = async () => {
  const { data } = await api.get("/location/estate")
  return data.data
}
export function useEstateOptions() {
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
