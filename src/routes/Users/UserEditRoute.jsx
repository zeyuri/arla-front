import { useCustomersList } from "../../hooks"
import { useMutation, useQuery } from "react-query"
import { useParams, useNavigate } from "react-router-dom"
import { Text, useToast } from "@chakra-ui/react"
import { UserForm } from "./components"
import { PageContainer } from "../../components"
import api from "../../api"

const fetchUserById = async (id) => {
  const { data } = await api.get(`/user/${id}`)
  return data.data
}

export function UserEditRoute() {
  const { userId } = useParams()
  const toast = useToast()
  const navigate = useNavigate()

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

  const mutation = useMutation(
    (formdata) => api.put("user", { id: userId, ...formdata }),
    {
      onSuccess: () => {
        toast({
          title: "Usúario editado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
        navigate("/app/users")
      },
      onError: () => {
        toast({
          title: "Oops! Algo deu errado ao editar seu usuario",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
      },
    }
  )

  const isLoading = isLoadingUserData && isLoadingCustomersList

  return (
    <PageContainer title="Criação de usuario">
      {isLoading ? (
        <Text>Loading..</Text>
      ) : userData && customersList ? (
        <UserForm
          mutateFn={mutation.mutateAsync}
          defaultValues={userData}
          customersOptions={customersList}
        />
      ) : null}
    </PageContainer>
  )
}
