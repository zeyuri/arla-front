import { Box, Flex, Heading, Link } from "@chakra-ui/react"

export type CardProps = {
  title: string
  subtitle: string
  id: string
}

export const Card = ({ title, subtitle, id }: CardProps): JSX.Element => {
  return (
    <Flex
      borderRadius={4}
      boxShadow="0 0 0 1px #333"
      bgColor="gray.900"
      as="li"
      role="listitem"
      p={4}
      w="100%"
    >
      <Box flexBasis="50%" textAlign="left">
        <Heading as="h3" size="md" color="gray.300">
          {title}
        </Heading>
        <Heading as="h4" size="xs" fontWeight="medium" color="gray.400">
          {subtitle}
        </Heading>
      </Box>
      <Link href={`/${id}`} flexBasis="50%">
        editar
      </Link>
    </Flex>
  )
}
