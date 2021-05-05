import {
  Box,
  Button,
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
  Textarea,
  Select as ChakraSelect,
} from "@chakra-ui/react"
import {
  useForm,
  FormProvider,
  useFormContext,
  useWatch,
  Controller,
} from "react-hook-form"
import { useCitys } from "../../../hooks"
import { DevTool } from "@hookform/devtools"
import Select from "react-select"

export function CustomerForm({
  estateOptions = [],
  devicesOptions = [],
  mutateFn,
  defaultValues,
}) {
  const methods = useForm({ defaultValues })

  const onSubmit = async (formData) => {
    await mutateFn({
      ...formData,
      devicesId: formData.devicesId.map((devices) => devices.value),
    })
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
            placeholder="Insira o nome da empresa"
            label="Nome da Empresa"
          />
          <Flex w="100%">
            <SelectControl
              name="estateId"
              options={estateOptions}
              label="Estado"
              placeholder="Escolha um estado"
              rules={{
                required: "Preenchimento Obrigatório",
              }}
            />
            <CityInput />
          </Flex>
          <TextareaControl
            name="annotation"
            label="Anotações"
            rules={{ required: "Preenchimento Obrigatório" }}
          />
          <FormControl
            isInvalid={Boolean(methods.formState.errors.devicesId)}
            ml="4"
          >
            <FormLabel htmlFor="devicesId">Dispositivos</FormLabel>
            <Controller
              name="devicesId"
              control={methods.control}
              placeholder="Selecione um dispositivo"
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={devicesOptions.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))}
                />
              )}
            />
          </FormControl>

          <Button type="submit">Enviar</Button>
        </VStack>
      </FormProvider>
    </Box>
  )
}

const InputControl = ({ name, rules, label, placeholder }) => {
  const {
    formState: { errors, isSubmitting },
    register,
  } = useFormContext()

  return (
    <FormControl isInvalid={Boolean(errors[name])} isDisabled={isSubmitting}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input placeholder={placeholder} {...register(name, rules)} />
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}

const SelectControl = ({ name, rules, label, placeholder, options = [] }) => {
  const {
    formState: { errors, isSubmitting },
    register,
  } = useFormContext()

  return (
    <FormControl isInvalid={Boolean(errors[name])} isDisabled={isSubmitting}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraSelect placeholder={placeholder} {...register(name, rules)}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </ChakraSelect>
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}

const TextareaControl = ({ name, rules, label, placeholder }) => {
  const {
    formState: { errors, isSubmitting },
    register,
  } = useFormContext()

  return (
    <FormControl isInvalid={Boolean(errors[name])} isDisabled={isSubmitting}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        isRequired
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}

const CityInput = () => {
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const estateId = useWatch({ control, name: "estateId" })

  const { cityOptions } = useCitys(estateId)

  return (
    <FormControl
      isDisabled={!estateId || isSubmitting}
      isInvalid={Boolean(errors.cityId)}
      ml="4"
    >
      <FormLabel htmlFor="name">Cidade</FormLabel>
      <ChakraSelect
        placeholder="Selecione uma cidade"
        {...register("cityId", {
          required: "Preenchimento Obrigatório",
        })}
      >
        {cityOptions
          ? cityOptions.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))
          : null}
      </ChakraSelect>
      <FormErrorMessage>
        {errors.cityId && errors.cityId.message}
      </FormErrorMessage>
    </FormControl>
  )
}
