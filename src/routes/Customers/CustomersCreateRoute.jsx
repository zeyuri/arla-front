import { Text, useToast } from "@chakra-ui/react"
import { useMutation } from "react-query"
import { CustomerForm } from "./components"
import { useNavigate } from "react-router-dom"
import { useEstateOptions, useDevicesOptions } from "../../hooks"
import api from "../../api"

export function CustomersCreateRoute() {
  const { stateOptions, isLoadingStates } = useEstateOptions()
  const { devicesOptions, isLoadingDevices } = useDevicesOptions()

  const navigate = useNavigate()
  const toast = useToast()

  const postCostumerMutation = useMutation(
    (payload) => api.post("/customer", payload),
    {
      onSuccess: () => {
        toast({
          title: "Cliente criado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
        navigate("/customers")
      },
      onError: () => {
        toast({
          title: "Oops! Algo deu errado ao criar o cliente",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
      },
    }
  )

  return isLoadingStates || isLoadingDevices ? (
    <Text>Loading</Text>
  ) : stateOptions && devicesOptions ? (
    <CustomerForm
      estateOptions={stateOptions}
      devicesOptions={devicesOptions}
      mutateFn={postCostumerMutation.mutateAsync}
    />
  ) : (
    <Text>Algo deu errado</Text>
  )
}

// const CustomerForm = ({ estateOptions }) => {

//   const { data: cityOptions, isIdle, isLoading } = useQuery(
//     ["city-options", estateId],
//     () => fetchCitysByEstateId(estateId),
//     {
//       refetchOnWindowFocus: false,
//       refetchInterval: false,
//       enabled: Boolean(estateId),
//     }
//   )
