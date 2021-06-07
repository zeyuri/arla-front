import { Text, useToast } from "@chakra-ui/react"
import { useMutation } from "react-query"
import { CustomerForm } from "./components"
import { useNavigate } from "react-router-dom"
import { useEstateOptions, useDevicesOptions } from "../../hooks"
import api from "../../api"
import { PageContainer } from "../../components"

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
        navigate("/app/customers")
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

  return (
    <PageContainer title="Criação de Cliente">
      {isLoadingStates || isLoadingDevices ? (
        <Text>Loading</Text>
      ) : stateOptions && devicesOptions ? (
        <CustomerForm
          estateOptions={stateOptions}
          devicesOptions={devicesOptions}
          mutateFn={postCostumerMutation.mutateAsync}
        />
      ) : (
        <Text>Algo deu errado</Text>
      )}
    </PageContainer>
  )
}
