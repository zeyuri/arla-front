import { useFieldArray, useFormContext } from "react-hook-form"
import {
  Box,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react"
import {
  RiAddLine as AddIcon,
  RiSubtractLine as RemoveIcon,
} from "react-icons/ri"

export function TelemetryFieldArray() {
  const { control, register, isSubmitting } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "telemetry",
  })

  return (
    <Box w="100%">
      <Flex align="center" mb="4">
        <Heading as="h3" size="md">
          Telemetria
        </Heading>
        <IconButton
          colorScheme="red"
          aria-label="Remover"
          onClick={() => {
            remove(fields.length - 1)
          }}
          icon={<RemoveIcon />}
          ml="4"
        />
        <IconButton
          colorScheme="green"
          aria-label="Remover"
          ml="4"
          onClick={() => {
            append({ node: "", typeTelemetry: 0, minValue: 0, maxValue: 1 })
          }}
          icon={<AddIcon />}
        />
      </Flex>

      {fields.length ? (
        fields.map((item, index) => {
          return (
            <Flex key={item.id} w="100%" justify="space-between">
              <input
                type="hidden"
                {...register(`telemetry.${index}.telemetryId`)}
                defaultValue={item.telemetryId}
              />
              <FormControl
                isDisabled={isSubmitting}
                flexBasis={{ base: "100%", md: "24%" }}
              >
                <FormLabel htmlFor={item.node}>Node</FormLabel>
                <Input
                  {...register(`telemetry.${index}.node`)}
                  colorScheme="green"
                  defaultValue={item.node}
                />
              </FormControl>
              <FormControl
                isDisabled={isSubmitting}
                flexBasis={{ base: "100%", md: "24%" }}
              >
                <FormLabel htmlFor={item.node}>Gráfico</FormLabel>
                <Select
                  {...register(`telemetry.${index}.typeTelemetry`, {
                    valueAsNumber: true,
                  })}
                  colorScheme="green"
                  defaultValue={item.typeTelemetry}
                >
                  {telemetryTypeOptions.map((o) => (
                    <option value={o.value} key={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                isDisabled={isSubmitting}
                flexBasis={{ base: "100%", md: "24%" }}
              >
                <FormLabel htmlFor={item.node}>Min Value</FormLabel>
                <Input
                  {...register(`telemetry.${index}.minValue`, {
                    valueAsNumber: true,
                  })}
                  colorScheme="green"
                  defaultValue={item.minValue}
                />
              </FormControl>
              <FormControl
                isDisabled={isSubmitting}
                flexBasis={{ base: "100%", md: "24%" }}
              >
                <FormLabel htmlFor={item.node}>Max Value</FormLabel>
                <Input
                  {...register(`telemetry.${index}.maxValue`, {
                    valueAsNumber: true,
                  })}
                  colorScheme="green"
                  defaultValue={item.maxValue}
                />
              </FormControl>
            </Flex>
          )
        })
      ) : (
        <Text color="">
          Por favor, adicione uma telemetria ao seu dispositivo
        </Text>
      )}
    </Box>
  )
}

const telemetryTypeOptions = [
  {
    value: 0,
    label: "Boolean",
  },
  {
    value: 1,
    label: "Integer",
  },
  {
    value: 2,
    label: "Decimal",
  },
]
