import api from "../api"
import { useQuery } from "react-query"

const fetchDevices = async () => {
  const { data } = await api.get("/device")
  return data.data
}
export function useDevicesList() {
  const { data: devices, ...rest } = useQuery(["devices", "list"], fetchDevices)

  return { devices, ...rest }
}
