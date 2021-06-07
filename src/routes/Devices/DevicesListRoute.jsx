import { Box, Flex, VStack, Link, Button } from "@chakra-ui/react"
import { Card, PageContainer } from "../../components"
import { Link as RouterLink } from "react-router-dom"
import { useDevicesList } from "../../hooks"

export function DevicesListRoute() {
  const { devices, isLoading } = useDevicesList()
  return (
    <PageContainer title="Dispositivos">
      <Flex justify="flex-end" w="100" py="8">
        <Button colorScheme="green">
          <Link to="create" as={RouterLink}>
            Criar Novo Dispositivo
          </Link>
        </Button>
      </Flex>
      {isLoading ? (
        <Box>{"loading"}</Box>
      ) : devices ? (
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
      ) : null}
    </PageContainer>
  )
}
