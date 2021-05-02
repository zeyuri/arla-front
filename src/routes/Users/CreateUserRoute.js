import { Text } from "@chakra-ui/react"
import { useCustomersList } from "../../hooks"
import { useMutation } from "react-query"
import api from "../../api"
import { UserForm } from "./components"

export function UserCreateRoute() {
  const { data, isLoading } = useCustomersList({
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  const mutation = useMutation((formdata) => api.post("user", { ...formdata }))

  return isLoading ? (
    <Text>Loading..</Text>
  ) : (
    <UserForm customersOptions={data} mutateFn={mutation.mutateAsync} />
  )
}
