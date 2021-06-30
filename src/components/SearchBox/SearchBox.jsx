import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react"
import { RiSearchLine as SearchIcon } from "react-icons/ri"

export function SearchBox({ placeholder }) {
  return (
    <InputGroup maxWidth="12.5rem">
      <InputLeftElement
        pointerEvents="none"
        // eslint-disable-next-line react/no-children-prop
        children={<SearchIcon />}
      />
      <Input placeholder={placeholder} />
    </InputGroup>
  )
}
