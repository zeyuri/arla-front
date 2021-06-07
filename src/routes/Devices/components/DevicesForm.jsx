import { useForm, FormProvider } from "react-hook-form"
import { Box, VStack, Button } from "@chakra-ui/react"
import { DevTool } from "@hookform/devtools"
import { InputControl } from "../../../components"
import { TelemetryFieldArray } from "./TelemetryFieldArray"

const mockValues = {
  name: "Batata",
  annotation: "Agora vai",
  telemetry: [
    {
      id: "batata",
      node: "string",
      typeTelemetry: 0,
      minValue: 0,
      maxValue: 1,
      telemetryId: "",
    },
  ],
}

export function DevicesForm({
  mutateFn = (data) => {
    console.log(data)
  },
  defaultValues,
}) {
  const methods = useForm({ defaultValues: defaultValues ?? mockValues })

  const onSubmit = async (formData) => {
    console.log(formData)
    console.log(defaultValues)
    if (defaultValues) {
      formData.primaryKey = defaultValues.primaryKey
    }
    await mutateFn(parseFormData(formData))
  }

  return (
    <Box
      borderWidth="1px"
      rounded="md"
      borderRadius={4}
      w="100%"
      boxShadow="0 0 0 1px #333"
      bgColor="gray.900"
      mt="20"
      p="10"
    >
      <FormProvider {...methods}>
        <DevTool control={methods.control} />
        <VStack
          spacing="8"
          as="form"
          noValidate
          onSubmit={methods.handleSubmit(onSubmit)}
          w="100%"
        >
          <InputControl
            name="name"
            rules={{ required: "Preenchimento Obrigatório" }}
            placeholder="Insira o nome da dispositivo"
            label="Nome"
          />
          <InputControl
            name="annotation"
            rules={{ required: "Preenchimento Obrigatório" }}
            placeholder="Insira a anotação do dispositivo"
            label="Anotação"
          />
          <TelemetryFieldArray />
          <Button
            type="submit"
            colorScheme="green"
            size="lg"
            w="100%"
            isDisabled={methods.formState.isSubmitting}
          >
            Enviar
          </Button>
        </VStack>
      </FormProvider>
    </Box>
  )
}

function parseFormData(formData) {
  return {
    ...formData,
    telemetry: formData.telemetry.map((t) => {
      if (!t.telemetryId) {
        return t
      }

      return {
        ...t,
        id: t.telemetryId,
      }
    }),
  }
}
