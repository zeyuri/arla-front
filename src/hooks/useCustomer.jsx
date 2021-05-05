import api from "../api"
import { useQuery, useQueryClient } from "react-query"
import { fetchCitysByEstateId } from "./useCitys"

// "data": {
//   "id": "aabdc1d0-807e-4ad0-be46-f47f38f3d1e3",
//   "name": "Batata E Cia lda",
//   "annotation": "dsadasdsadas",
//   "estate": {
//     "id": "a10dce11-e81b-445f-8dff-8118f628a429",
//     "name": "RIO DE JANEIRO"
//   },
//   "city": {
//     "id": "b5920d83-b6a0-4779-a7be-ee779fc01715",
//     "name": "PARATI"
//   },
//   "devices": [
//     {
//       "id": "58fea670-9468-4df4-82c3-62b5067a9369",
//       "name": "test2",
//       "annotation": "teste",
//       "primaryKey": "",
//       "telemetry": [
//         {
//           "id": "e8e6dbdc-75e1-4432-a4d4-40c6868afd92",
//           "node": "teste",
//           "typeTelemetry": 1,
//           "minValue": 0,
//           "maxValue": 0
//         }
//       ]
//     }
//   ]
// }

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

  const queryClient = useQueryClient()

  if (customerData) {
    queryClient.prefetchQuery(["citys-options"], () =>
      fetchCitysByEstateId(customerData.estateId)
    )
  }

  return { customerData, isLoadingUserData, ...rest }
}
