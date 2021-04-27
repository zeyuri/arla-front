import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { useMutation } from "react-query"
import { ResourceType } from "../../@types"
import api from "../../api"

type DeleteModalProps = {
  onClose: () => void
  isOpen: boolean
  id: string
  title: string
  resource: ResourceType
}

export const DeleteModal = ({
  onClose,
  isOpen,
  id,
  resource,
  title,
}: DeleteModalProps): JSX.Element => {
  const deleteMutation = useMutation(
    (id: string) => api.delete(`/${resource}/${id}`),
    {
      onSuccess: onClose,
      onError: () => {
        onClose()
      },
    }
  )
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {"Tem certeza que deseja deletar" + " " + title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>Batata</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={() => {
              deleteMutation.mutate(id)
            }}
            isDisabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? "Deletando" : "Deletar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
