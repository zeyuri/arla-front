import api from "../api"
import { useQuery } from "react-query"

const fetchDevices = async () => {
  const { data } = await api.get("/device/options")
  return data.data
}
export function useDevicesOptions() {
  const {
    data: devicesOptions,
    isLoading: isLoadingDevices,
    ...rest
  } = useQuery("devices-options", fetchDevices, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return { devicesOptions, isLoadingDevices, ...rest }
}
