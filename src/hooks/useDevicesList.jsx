import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"

export function useDevicesList() {
  const axios = useAxiosProvider()

  const fetchDevices = useCallback(async () => {
    const { data } = await axios.get("/device")
    return data.data
  }, [axios])

  const { data: devices, ...rest } = useQuery(["devices", "list"], fetchDevices)

  return { devices, ...rest }
}
