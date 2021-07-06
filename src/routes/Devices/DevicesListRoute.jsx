import { Box, Flex, VStack, Link, Button } from "@chakra-ui/react"
import { Card, NotFoundBox, PageContainer, SearchBox } from "../../components"
import { Link as RouterLink } from "react-router-dom"
import { useDevicesList } from "../../hooks"

export function DevicesListRoute() {
  const { devices, isLoading } = useDevicesList()
  return (
    <PageContainer title="Dispositivos">
      <Flex justify="flex-end" w="100" py="8">
        <SearchBox placeholder="Pesquisar Dispositivos" />
        <Button colorScheme="green" ml="8" w="48">
          <Link to="create" as={RouterLink}>
            Criar Novo Dispositivo
          </Link>
        </Button>
      </Flex>
      {isLoading ? (
        <Box>{"loading"}</Box>
      ) : devices && devices.length ? (
        <VStack as="ul" w="100%" spacing="6">
          {devices.map((device, i) => (
            <Card
              key={`${device.id}${i}`}
              id={device.id}
              title={device.name}
              subtitle={device.annotation}
              entity="device"
            />
          ))}
        </VStack>
      ) : (
        <NotFoundBox entity="dispositivo" />
      )}
    </PageContainer>
  )
}
