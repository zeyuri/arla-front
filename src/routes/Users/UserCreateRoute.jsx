import { Text, useToast } from "@chakra-ui/react"
import { useCustomersList } from "../../hooks"
import { useMutation } from "react-query"
import { UserForm } from "./components"
import { PageContainer } from "../../components"
import { useNavigate } from "react-router-dom"
import api from "../../api"

export function UserCreateRoute() {
  const { data, isLoading } = useCustomersList({
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  const navigate = useNavigate()
  const toast = useToast()
  const mutation = useMutation(
    (formdata) => api.post("user", { ...formdata }),
    {
      onSuccess: () => {
        toast({
          title: "Usúario criado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
        navigate("/app/users")
      },
      onError: () => {
        toast({
          title: "Oops! Algo deu errado ao criar seu usuario",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
      },
    }
  )

  return (
    <PageContainer title="Criação de usuario">
      {isLoading ? (
        <Text>Loading..</Text>
      ) : (
        <UserForm customersOptions={data} mutateFn={mutation.mutateAsync} />
      )}
    </PageContainer>
  )
}
