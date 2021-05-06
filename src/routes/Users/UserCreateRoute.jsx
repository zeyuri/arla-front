import { Text } from "@chakra-ui/react"
import { useCustomersList } from "../../hooks"
import { useMutation } from "react-query"
import { UserForm } from "./components"
import { PageContainer } from "../../components"
import api from "../../api"

export function UserCreateRoute() {
  const { data, isLoading } = useCustomersList({
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  const mutation = useMutation((formdata) => api.post("user", { ...formdata }))

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
