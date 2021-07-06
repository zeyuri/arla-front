import { useState } from "react"
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react"
import { RiSearchLine as SearchIcon } from "react-icons/ri"
import { useSearchParams } from "react-router-dom"

export function SearchBox({ placeholder }) {
  const [params, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => params.get("name") ?? "")

  return (
    <InputGroup maxWidth="12.5rem">
      <InputLeftElement
        pointerEvents="none"
        // eslint-disable-next-line react/no-children-prop
        children={<SearchIcon />}
      />
      <Input
        placeholder={placeholder}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            if (event.target.value) {
              setSearchParams({ name: event.target.value })
            } else {
              setSearchParams({})
            }
          }
        }}
      />
    </InputGroup>
  )
}
