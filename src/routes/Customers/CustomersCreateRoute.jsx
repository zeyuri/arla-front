import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select as ChakraSelect,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useQuery, useMutation } from "react-query"
import api from "../../api"
import { useNavigate } from "react-router-dom"
import { DevTool } from "@hookform/devtools"

// const fetchDevices = async (): Promise<Device[]> => {
//   const { data } = await api.get<{ data: Device[] }>("/device")
//   return data.data
// }

// const postCustomer = async (payload: Inputs): Promise<unknown> => {
//   return await api.post("/customer", payload)
// }

const fetchEstates = async () => {
  const { data } = await api.get("/location/estate")
  return data.data
}

const fetchCitysByEstateId = async (estateId) => {
  const { data } = await api.get(`/location/city/${estateId}`)
  return data.data
}

export function CustomersCreateRoute() {
  const { data, isLoading } = useQuery("estate-options", fetchEstates, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  return isLoading ? (
    <Text>Loading</Text>
  ) : data ? (
    <CustomerForm estateOptions={data} />
  ) : (
    <Text>Algo deu errado</Text>
  )
}

const CustomerForm = ({ estateOptions }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm()

  const estateId = watch("estateId")

  const { data: cityOptions, isIdle, isLoading } = useQuery(
    ["city-options", estateId],
    () => fetchCitysByEstateId(estateId),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      enabled: Boolean(estateId),
    }
  )
  // const navigate = useNavigate()
  // const toast = useToast()

  // const postCostumer = useMutation(
  //   (payload: unknown) => api.post("/customer", payload),
  //   {
  //     onSuccess: () => {
  //       toast({
  //         title: "Cliente criado com sucesso",
  //         status: "success",
  //         duration: 9000,
  //         isClosable: true,
  //         position: "top",
  //       })
  //       navigate("/customers")
  //     },
  //     onError: () => {
  //       toast({
  //         title: "Oops! Algo deu errado ao criar o cliente",
  //         status: "error",
  //         duration: 9000,
  //         isClosable: true,
  //         position: "top",
  //       })
  //     },
  //   }
  // )
  const onSubmit = (data) => {
    // const payload = {
    //   ...data,
    //   devicesId: [data.devicesId],
    // }
    console.log(data)
    // await postCostumer.mutateAsync(payload)
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
        <DevTool control={control} />
        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel htmlFor="name">Nome da Empresa</FormLabel>
          <Input
            isRequired
            placeholder="Insira o nome da empresa"
            {...register("name", { required: "Preenchimento Obrigatório" })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Flex w="100%">
          <FormControl isInvalid={Boolean(errors.estateId)}>
            <FormLabel htmlFor="name">Estado</FormLabel>
            <ChakraSelect
              placeholder="Escolha um estado"
              {...register("estateId", {
                required: "Preenchimento Obrigatório",
              })}
            >
              {estateOptions.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </ChakraSelect>
            <FormErrorMessage>
              {errors.estateId && errors.estateId.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isDisabled={!estateId}
            isInvalid={Boolean(errors.cityId)}
            ml="4"
          >
            <FormLabel htmlFor="name">Cidade</FormLabel>
            <ChakraSelect
              placeholder="Selecione uma cidade"
              {...register("cityId", { required: "Preenchimento Obrigatório" })}
            >
              {/* {cityOptions
                ? cityOptions.map((option) => (
                    <option value={option.id} key={option.id}>
                      {option.name}
                    </option>
                  ))
                : null} */}
            </ChakraSelect>
            <FormErrorMessage>
              {errors.cityId && errors.cityId.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <FormControl isInvalid={Boolean(errors.annotation)}>
          <FormLabel htmlFor="annotation">Anotações</FormLabel>
          <Textarea
            isRequired
            placeholder=""
            {...register("annotation", {
              required: "Preenchimento Obrigatório",
            })}
          />
          <FormErrorMessage>
            {errors.annotation && errors.annotation.message}
          </FormErrorMessage>
        </FormControl>
        {/* <FormControl isInvalid={Boolean(errors.devicesId)} ml="4">
          <FormLabel htmlFor="name">Dispositivos</FormLabel>
          <ChakraSelect
            {...register("devicesId", {
              required: "Preenchimento Obrigatório",
            })}
          >
            {mockedDevices.map((devices) => (
              <option key={devices.id} value={devices.id}>
                {devices.name}
              </option>
            ))}
          </ChakraSelect>
        </FormControl> */}

        <Button type="submit">Enviar</Button>
      </VStack>
    </Box>
  )
}

// const mockData = {
//   id: "b5920d83-b6a0-4779-a7be-ee779fc01715",
//   name: "PARATI",
// }

// const mockedDevices = [
//   {
//     id: "5f5be15a-5e1c-4010-b353-49968fc04524",
//     name: "Apresentacao",
//     annotation: "Teste",
//     primaryKey: "",
//     telemetry: [
//       {
//         id: "f4d9f09b-4211-4da3-9ef7-0480b8453399",
//         node: "Status",
//         typeTelemetry: 1,
//         minValue: 0,
//         maxValue: 1,
//       },
//     ],
//   },
//   {
//     id: "58fea670-9468-4df4-82c3-62b5067a9369",
//     name: "test2",
//     annotation: "teste",
//     primaryKey: "",
//     telemetry: [
//       {
//         id: "e8e6dbdc-75e1-4432-a4d4-40c6868afd92",
//         node: "teste",
//         typeTelemetry: 1,
//         minValue: 0,
//         maxValue: 0,
//       },
//     ],
//   },
//   {
//     id: "e6493433-d171-4852-80c6-c8aa61def190",
//     name: "teste",
//     annotation: "teste",
//     primaryKey: "",
//     telemetry: [
//       {
//         id: "9ba6e06c-ec32-437a-bec4-39d83dd4db05",
//         node: "teste",
//         typeTelemetry: 0,
//         minValue: 0,
//         maxValue: 1,
//       },
//     ],
//   },
// ]
