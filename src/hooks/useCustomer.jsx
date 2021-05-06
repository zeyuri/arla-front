import api from "../api"
import { useQuery } from "react-query"

const fetchCustomerId = async (id) => {
  const { data } = await api.get(`/customer/${id}`)
  const parsedData = {
    name: data.data.name,
    annotation: data.data.annotation,
    estateId: data.data.estate.id,
    cityId: data.data.city.id,
    devicesId: data.data.devices.map(({ id, name }) => ({
      value: id,
      label: name,
    })),
  }
  return parsedData
}

export function useCustomer(customerId) {
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
