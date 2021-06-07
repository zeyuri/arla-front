import { Text, useToast } from "@chakra-ui/react"
import { useMutation } from "react-query"
import { CustomerForm } from "./components"
import { useNavigate, useParams } from "react-router-dom"
import {
  useEstateOptions,
  useDevicesOptions,
  useCustomer,
  useCitys,
} from "../../hooks"
import { PageContainer } from "../../components"
import api from "../../api"

export function CustomersEditRoute() {
  const { customerId } = useParams()
  const { customerData, isLoadingUserData } = useCustomer(customerId)
  const { isLoadingCitys, cityOptions } = useCitys(
    customerData ? customerData.estateId : undefined
  )
  const { stateOptions, isLoadingStates } = useEstateOptions()
  const { devicesOptions, isLoadingDevices } = useDevicesOptions()

  const navigate = useNavigate()
  const toast = useToast()

  const putCostumerMutation = useMutation(
    (payload) => api.put("/customer", { id: customerId, ...payload }),
    {
      onSuccess: () => {
        toast({
          title: "Cliente editado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
        navigate("/app/customers")
      },
      onError: () => {
        toast({
          title: "Oops! Algo deu errado ao editar o cliente",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
      },
    }
  )

  return (
    <PageContainer title="Edição de Usuario">
      {isLoadingStates ||
      isLoadingDevices ||
      isLoadingUserData ||
      isLoadingCitys ? (
        <Text>Loading</Text>
      ) : stateOptions && devicesOptions && customerData && cityOptions ? (
        <CustomerForm
          estateOptions={stateOptions}
          devicesOptions={devicesOptions}
          defaultValues={customerData}
          mutateFn={putCostumerMutation.mutateAsync}
        />
      ) : (
        <Text>Algo deu errado</Text>
      )}
    </PageContainer>
  )
}
