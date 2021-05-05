import { useQuery } from "react-query"
import api from "../../api"
import { Box, Flex, VStack, Link, Button } from "@chakra-ui/react"
import { Card } from "../../components"
import { Link as RouterLink } from "react-router-dom"
import PageContainer from "../../components/PageContainer/PageContainer"

const fetchUserList = async () => {
  const { data } = await api.get("/user")
  return data.data
}

export function UserListRoute() {
  const { data, isLoading } = useQuery("users-list", fetchUserList)
  return (
    <PageContainer title="Úsuarios">
      <Box w="100%" pt="10">
        <Flex justify="flex-end" w="100" py="8">
          <Button>
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
      </Box>
    </PageContainer>
  )
}
