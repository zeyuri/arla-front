import { useState } from "react"
import {
  Center,
  Container,
  Image,
  Flex,
  VStack,
  Button,
  Input,
  InputGroup,
  IconButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputRightElement,
  useToast,
} from "@chakra-ui/react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { InputControl } from "../../components"
import logourl from "../../assets/logo.png"
import { RiEyeFill as ShowIcon, RiEyeOffFill as HideIcon } from "react-icons/ri"
import { useAxiosProvider, useSession } from "../../providers"
import { useMutation } from "react-query"
import jwtDecode from "jwt-decode"
import { ADMIN_ROLE } from "../../providers"
import { useNavigate } from "react-router-dom"
import bgImage from "../../assets/loginBg.jpg"

export function LoginRoute() {
  const axios = useAxiosProvider()
  const methods = useForm()
  const navigate = useNavigate()
  const toast = useToast()
  const { login } = useSession()

  const postLogin = useMutation((payload) => axios.post("/auth", payload), {
    onSuccess: ({ data }) => {
      login({ user: data.data.user, token: data.data.token })
      if (jwtDecode(data.data.token).role === ADMIN_ROLE) {
        navigate("/app")
      } else {
        navigate("/dashboards")
      }
    },
    onError: () => {
      toast({
        title: "Ops, algo deu errado!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      })
    },
  })

  const onSubmit = async (data) => {
    await postLogin.mutateAsync(data)
  }
  return (
    <Center h="100vh" w="100%" bgImage={`url(${bgImage})`} bgSize="cover">
      <Container
        borderWidth="1px"
        bgColor="gray.900"
        borderRadius={20}
        maxW="18.75rem"
        p="6"
      >
        <Flex justify="center">
          <Image src={logourl} w="7.25rem" />
        </Flex>
        <FormProvider {...methods}>
          <VStack
            spacing="5"
            as="form"
            noValidate
            onSubmit={methods.handleSubmit(onSubmit)}
            w="100%"
          >
            <InputControl
              name="email"
              rules={{
                required: "Preenchimento Obrigat??rio",
                pattern: {
                  value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Insira um e-mail valido",
                },
              }}
              placeholder="Insira o nome da dispositivo"
              label="E-mail"
            />
            <PasswordInput />
            <Button type="submit" colorScheme="green" size="lg" w="100%">
              Login
            </Button>
          </VStack>
        </FormProvider>
      </Container>
    </Center>
  )
}

function PasswordInput() {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const {
    formState: { errors, isSubmitting },
    register,
  } = useFormContext()

  return (
    <FormControl>
      <FormLabel htmlFor="password">Senha</FormLabel>

      <InputGroup size="md">
        <Input
          pr="2.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          name="password"
          isDisabled={isSubmitting}
          {...register("password", {
            required: "Preenchimento Obrigat??rio",
          })}
        />
        <InputRightElement>
          <IconButton
            colorScheme="green"
            aria-label="Mostrar/Esconder Senha"
            onClick={handleClick}
            size="md"
            isRound
            variant="ghost"
            icon={show ? <HideIcon /> : <ShowIcon />}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>
        {errors.password && errors.password.message}
      </FormErrorMessage>
    </FormControl>
  )
}
