import { PageContainer } from "../../components"
import { DevicesForm } from "./components"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { useToast } from "@chakra-ui/react"
import { useAxiosProvider } from "../../providers"

export function DevicesCreateRoute() {
  const axios = useAxiosProvider()
  const navigate = useNavigate()

  const toast = useToast()

  const postDevicesMutation = useMutation(
    (payload) => axios.post("/device", payload),
    {
      onSuccess: () => {
        toast({
          title: "Dispositivo criado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
        navigate("/devices")
      },
      onError: () => {
        toast({
          title: "Oops! Algo deu errado ao criar o dispositivo",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
      },
    }
  )
  return (
    <PageContainer title="Cadastrar Dispositivo">
      <DevicesForm mutateFn={postDevicesMutation.mutateAsync} />
    </PageContainer>
  )
}
