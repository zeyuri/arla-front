import { Codec, string, GetType } from "purify-ts/Codec"
import api from "../../api"
import { useQuery } from "react-query"
import { Box, Flex, VStack, Link, Button } from "@chakra-ui/react"
import { Card } from "../../components"
import { Link as RouterLink } from "react-router-dom"

const Customer = Codec.interface({
  id: string,
  name: string,
  annotation: string,
  estateId: string,
  cityId: string,
})

type Customer = GetType<typeof Customer>

const fetchCustomerList = async (): Promise<Customer[]> => {
  const { data } = await api.get<{ data: Customer[] }>("/customer")
  return data.data
}

export const CustomerList = (): JSX.Element | null => {
  const { data, isLoading } = useQuery("customer-list", fetchCustomerList)

  return (
    <Box w="100%" pt="10">
      <Flex justify="flex-end" w="100" py="8">
        <Button>
          <Link to="create" as={RouterLink}>
            Criar Novo Cliente
          </Link>
        </Button>
      </Flex>
      {isLoading ? (
        <Box>{"loading"}</Box>
      ) : data ? (
        <VStack as="ul" w="100%" spacing="6">
          {data.map((customer, i) => (
            <Card
              key={`${customer.id}${i}`}
              id={customer.id}
              title={customer.name}
              subtitle={`${customer.cityId} / ${customer.estateId}`}
            />
          ))}
        </VStack>
      ) : null}
    </Box>
  )
}
