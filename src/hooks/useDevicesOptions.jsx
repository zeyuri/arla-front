import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"

export function useDevicesOptions() {
  const axios = useAxiosProvider()

  const fetchDevices = useCallback(async () => {
    const { data } = await axios.get("/device/options")
    return data.data
  }, [axios])

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
