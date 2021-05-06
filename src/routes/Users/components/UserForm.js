import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Button,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export function UserForm({ customersOptions, mutateFn, defaultValues }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues })

  const onSubmit = async (formData) => {
    await mutateFn(formData)
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
      <VStack
        spacing="8"
        as="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        w="100%"
      >
        {/* <DevTool control={control} /> */}
        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel htmlFor="name">Nome Completo</FormLabel>
          <Input
            isRequired
            placeholder="Insira o seu nome completo"
            {...register("name", { required: "Preenchimento Obrigatório" })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="name">E-mail</FormLabel>
          <Input
            isRequired
            placeholder="Insira o seu email"
            {...register("email", {
              required: "Preenchimento Obrigatório",
              pattern: {
                value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Insira um e-mail valido",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.contact)}>
          <FormLabel htmlFor="contact">Contato</FormLabel>
          <Input
            isRequired
            placeholder="Insira o seu nome completo"
            {...register("contact", { required: "Preenchimento Obrigatório" })}
          />
          <FormErrorMessage>
            {errors.contact && errors.contact.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.customerId)}>
          <FormLabel htmlFor="name">Cliente</FormLabel>
          <Select
            placeholder="Escolha o Cliente"
            defaultValue={defaultValues ? defaultValues.customerId : null}
            {...register("customerId", {
              required: "Preenchimento Obrigatório",
            })}
          >
            {customersOptions.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.customerId && errors.customerId.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.annotation)}>
          <FormLabel htmlFor="annotation">Anotação</FormLabel>
          <Input
            isRequired
            placeholder="Insira o seu nome completo"
            {...register("annotation", {
              required: "Preenchimento Obrigatório",
            })}
          />
          <FormErrorMessage>
            {errors.annotation && errors.annotation.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" w="100%" size="lg" colorScheme="green">
          Enviar
        </Button>
      </VStack>
    </Box>
  )
}
