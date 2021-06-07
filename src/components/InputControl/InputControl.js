import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

export const InputControl = ({ name, rules, label, placeholder, ...rest }) => {
  const {
    formState: { errors, isSubmitting },
    register,
  } = useFormContext()

  return (
    <FormControl isInvalid={Boolean(errors[name])} isDisabled={isSubmitting}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        placeholder={placeholder}
        colorScheme="green"
        {...register(name, rules)}
        {...rest}
      />
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}
