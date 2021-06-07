import { PageContainer } from "../../components"
import { DevicesForm } from "./components"
import { useMutation } from "react-query"
import { useParams, useNavigate } from "react-router-dom"
import { useDevice } from "../../hooks"
import { useToast } from "@chakra-ui/react"
import api from "../../api"

export function DevicesEditRoute() {
  const { deviceId } = useParams()
  const { deviceData } = useDevice(deviceId)
  const navigate = useNavigate()

  const toast = useToast()

  const postDevicesMutation = useMutation(
    (payload) => api.put("/device", { id: deviceId, ...payload }),
    {
      onSuccess: () => {
        toast({
          title: "Dispositivo editado com sucesso",
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
    <PageContainer title="Editar Dispositivo">
      {deviceData && (
        <DevicesForm
          defaultValues={deviceData}
          mutateFn={postDevicesMutation.mutateAsync}
        />
      )}
    </PageContainer>
  )
}
