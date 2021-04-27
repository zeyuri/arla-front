import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react"
import { LinkBox, LinkOverlay } from "@chakra-ui/react"
import { RiDeleteBin7Fill, RiEdit2Fill } from "react-icons/ri"
import { DeleteModal } from "../DeleteMotal/DeleteModal"

export type CardProps = {
  title: string
  subtitle: string
  id: string
}

export const Card = ({ title, subtitle, id }: CardProps): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <LinkBox
        maxW="sm"
        p={5}
        borderWidth="1px"
        rounded="md"
        borderRadius={4}
        maxWidth="unset"
        boxShadow="0 0 0 1px #333"
        bgColor="gray.900"
        d="flex"
        as="li"
        w="100%"
        justifyContent="space-between"
      >
        <Box flexBasis="50%" textAlign="left">
          <Heading as="h3" size="md" color="gray.300">
            {title}
          </Heading>
          <Heading as="h4" size="xs" fontWeight="medium" color="gray.400">
            {subtitle}
          </Heading>
        </Box>
        <Flex justify="space-between" flexBasis="30%" align="center">
          <LinkOverlay href={`consumer/${id}`}>
            <Button isFullWidth leftIcon={<RiEdit2Fill />}>
              Editar
            </Button>
          </LinkOverlay>
          <Button onClick={onOpen} leftIcon={<RiDeleteBin7Fill />}>
            Delete
          </Button>
        </Flex>
      </LinkBox>
      <DeleteModal
        onClose={onClose}
        id={id}
        resource="consumer"
        title={title}
        isOpen={isOpen}
      />
    </>
  )
}
