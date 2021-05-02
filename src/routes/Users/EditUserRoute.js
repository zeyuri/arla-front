import { useCustomersList } from "../../hooks"
import { useMutation, useQuery } from "react-query"
import api from "../../api"
import { useParams } from "react-router-dom"
import { Text } from "@chakra-ui/react"
import { UserForm } from "./components"
import { createResponseComposition } from "msw"

const fetchUserById = async (id) => {
  const { data } = await api.get(`/user/${id}`)
  return data.data
}

export function EditUserRoute() {
  const { userId } = useParams()

  const { data: userData, isLoading: isLoadingUserData } = useQuery(
    ["user", userId],
    () => fetchUserById(userId),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  )
  const {
    data: customersList,
    isLoading: isLoadingCustomersList,
  } = useCustomersList({
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const mutation = useMutation((formdata) =>
    api.put("user", { id: userId, ...formdata })
  )

  const isLoading = isLoadingUserData && isLoadingCustomersList

  return isLoading ? (
    <Text>Loading..</Text>
  ) : userData && customersList ? (
    <UserForm
      mutateFn={mutation.mutateAsync}
      defaultValues={userData}
      customersOptions={customersList}
    />
  ) : null
}
