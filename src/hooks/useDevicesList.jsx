import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

export function useDevicesList() {
  const axios = useAxiosProvider()
  const [params] = useSearchParams()
  const name = params.get("name")

  const fetchDevices = useCallback(async () => {
    const { data } = await axios.get("/device", {
      params: name && { name },
    })
    return data.data
  }, [axios, name])

  const { data: devices, ...rest } = useQuery(
    ["devices", "list", "name", name],
    fetchDevices
  )

  return { devices, ...rest }
}
