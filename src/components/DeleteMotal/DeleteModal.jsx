import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "react-query"
import api from "../../a"

export const DeleteModal = ({ onClose, isOpen, id, resource, title }) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const deleteMutation = useMutation((id) => api.delete(`/${resource}/${id}`), {
    onSuccess: () => {
      queryClient.setQueryData("customer-list", (oldData) => {
        return oldData ? oldData.filter((customer) => customer.id !== id) : []
      })
      toast({
        title: "Deletado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      })
      onClose()
    },
    onError: () => {
      toast({
        title: "Ops, algo deu errado!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      })
      onClose()
    },
  })
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Tem certeza que deseja deletar ${title}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{`Essa ação apagará todos os registros de ${title} no sistema`}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="yellow">
            Não apagar
          </Button>
          <Button
            ml="2"
            onClick={() => {
              deleteMutation.mutate(id)
            }}
            isDisabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? "Deletando" : "Confirmar Exclusão"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}