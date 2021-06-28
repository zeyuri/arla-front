import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"

export function useDevice(id) {
  const axios = useAxiosProvider()

  const fetchDeviceId = useCallback(
    async (id) => {
      const { data } = await axios.get(`/device/${id}`)
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
    },
    [axios]
  )

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
