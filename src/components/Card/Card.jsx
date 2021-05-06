import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react"
import { LinkBox, LinkOverlay } from "@chakra-ui/react"
import { DeleteModal } from "../DeleteMotal/DeleteModal"
import { RiDeleteBin7Fill, RiEdit2Fill } from "react-icons/ri"
import { Link } from "react-router-dom"

export const Card = ({ title, subtitle, id, entity }) => {
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
        <Flex flexBasis="40%" align="center" justify="flex-end">
          <LinkOverlay to={`edit/${id}`} as={Link}>
            <Link to={`edit/${id}`}>
              <Button
                isFullWidth
                leftIcon={<RiEdit2Fill />}
                colorScheme="green"
              >
                Editar
              </Button>
            </Link>
          </LinkOverlay>
          <Button
            onClick={onOpen}
            leftIcon={<RiDeleteBin7Fill />}
            colorScheme="red"
            ml="4"
          >
            Delete
          </Button>
        </Flex>
      </LinkBox>
      <DeleteModal
        onClose={onClose}
        id={id}
        title={title}
        isOpen={isOpen}
        entity={entity}
      />
    </>
  )
}
