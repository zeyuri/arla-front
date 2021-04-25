import { extendTheme, Theme } from "@chakra-ui/react"

// 3. extend the theme
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
}) as Theme

export default theme
