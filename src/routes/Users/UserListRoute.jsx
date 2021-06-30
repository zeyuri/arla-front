import { Box, Flex, VStack, Link, Button } from "@chakra-ui/react"
import { Card, PageContainer } from "../../components"
import { Link as RouterLink } from "react-router-dom"
import { useUsers } from "../../hooks"
import { SearchBox } from "../../components"

export function UserListRoute() {
  const { data, isLoading } = useUsers()

  return (
    <PageContainer title="Usuários">
      <Flex justify="flex-end" w="100" py="8">
        <SearchBox placeholder="Pesquisar Usuário" />
        <Button colorScheme="green" ml="8" w="48">
          <Link to="create" as={RouterLink}>
            Criar Novo Usuario
          </Link>
        </Button>
      </Flex>
      {isLoading ? (
        <Box>{"loading"}</Box>
      ) : data ? (
        <VStack as="ul" w="100%" spacing="6">
          {data.map((user) => (
            <Card
              key={user.id}
              id={user.id}
              title={user.name}
              subtitle={user.email}
              entity="user"
            />
          ))}
        </VStack>
      ) : null}
    </PageContainer>
  )
}
