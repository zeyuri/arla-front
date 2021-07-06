import { Box, Alert, AlertIcon } from "@chakra-ui/react"

export function NotFoundBox({ entity }) {
  return (
    <Box>
      <Alert status="info">
        <AlertIcon />
        {entity
          ? `Não encontramos nenhum(a) ${entity}`
          : "Não pudemos encontrar o q procura"}
      </Alert>
    </Box>
  )
}
