import { ChakraProvider } from "@chakra-ui/react"
import "@testing-library/jest-dom/extend-expect"
import { render as rtlRender, fireEvent } from "@testing-library/react"
import * as React from "react"
import { toHaveNoViolations, axe } from "jest-axe"
import { createSerializer } from "@emotion/jest"

expect.addSnapshotSerializer(createSerializer())
expect.extend(toHaveNoViolations)

function ChildrenPassthrough({ children }) {
  return children
}

/**
 * Custom render for @testing-library/react
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 * @param component the component under test
 * @param options customized test options
 */

export const render = (
  ui,
  { wrapper: Wrapper = ChildrenPassthrough, ...options } = {}
) =>
  rtlRender(
    <ChakraProvider>
      <Wrapper>{ui}</Wrapper>
    </ChakraProvider>,
    options
  )

export { rtlRender }
export { axe }

export * from "@testing-library/react"

export { default as userEvent } from "@testing-library/user-event"

export const escape = (ui) =>
  fireEvent.keyDown(ui, { key: "Escape", keyCode: 27 })

export const testA11y = async (ui, { axeOptions, ...options } = {}) => {
  const container = React.isValidElement(ui)
    ? render(ui, options).container
    : ui

  const results = await axe(container, axeOptions)

  expect(results).toHaveNoViolations()
}
