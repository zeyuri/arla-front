import { Box, Flex, VStack, Link, Button } from "@chakra-ui/react"
import { Card } from "../../components"
import { Link as RouterLink } from "react-router-dom"
import { useCustomersList } from "../../hooks"

export const CustomerList = () => {
  const { data, isLoading } = useCustomersList()

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
              subtitle={`${customer.city.name} / ${customer.estate.name}`}
              entity="customer"
            />
          ))}
        </VStack>
      ) : null}
    </Box>
  )
}
