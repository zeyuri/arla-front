import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"
import { IconType } from "react-icons"

export const ColorModeSwitcher = (
  props: Omit<IconButtonProps, "aria-label">
): JSX.Element => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue<IconType, IconType>(FaMoon, FaSun)

  return (
    <IconButton
      {...props}
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      size="md"
      fontSize="lg"
    />
  )
}
