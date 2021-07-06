import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"

export function useCustomer(customerId) {
  const axios = useAxiosProvider()

  const fetchCustomerId = useCallback(
    async (id) => {
      const { data } = await axios.get(`/customer/${id}`)
      const parsedData = {
        name: data.data.name,
        annotation: data.data.annotation,
        estateId: data.data.estate.id,
        cityId: data.data.city.id,
        devicesId: data.data.devices.map(({ deviceName, deviceId }) => ({
          value: deviceId,
          label: deviceName,
        })),
      }
      return parsedData
    },
    [axios]
  )

  const {
    data: customerData,
    isLoading: isLoadingUserData,
    ...rest
  } = useQuery(["customer", customerId], () => fetchCustomerId(customerId), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return { customerData, isLoadingUserData, ...rest }
}
