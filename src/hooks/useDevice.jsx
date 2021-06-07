import api from "../api"
import { useQuery } from "react-query"

const fetchDeviceId = async (id) => {
  const { data } = await api.get(`/device/${id}`)
  const parsedData = {
    name: data.data.name,
    annotation: data.data.annotation,
    primaryKey: data.data.primaryKey,
    telemetry: data.data.telemetry.map((telemetry) => ({
      ...telemetry,
      telemetryId: telemetry.id,
    })),
  }
  return parsedData
}

export function useDevice(id) {
  const { data: deviceData, ...rest } = useQuery(
    ["device", id],
    () => fetchDeviceId(id),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  )

  return { deviceData, ...rest }
}
