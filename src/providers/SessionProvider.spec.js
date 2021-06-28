import { expect, describe } from "@jest/globals"
import { SessionProvider, useSession } from "./SessionProvider"
import { renderHook } from "@testing-library/react-hooks"

describe("Given the user has a session", () => {
  afterEach(() => {
    localStorage.clear()
  })

  it("useSession Custom Hook should return the correct state", () => {
    const localStorage = {
      user: {
        id: "dcb75217-1a76-4132-ad23-edbdf1405af3",
        name: "renan",
        annotation: "teste",
        email: "re_pinheiro97@hotmail.com",
        contact: "11989557847",
        customerId: "8cdbd3c4-8a6e-4df0-848d-69fbc961935e",
      },
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlX3BpbmhlaXJvOTdAaG90bWFpbC5jb20iLCJyb2xlIjoiQWRtaW5pc3RyYWRvciIsIm5iZiI6MTYyNDg0MTMzMywiZXhwIjoxNjI0ODQ0OTMzLCJpYXQiOjE2MjQ4NDEzMzN9.hWlAEbESHiueXD4MS3Tvbv0Egs4lECTP5b0zWEMuPQ0",
    }

    window.localStorage.setItem("session", JSON.stringify(localStorage))

    const wrapper = ({ children }) => (
      <SessionProvider>{children}</SessionProvider>
    )
    const { result } = renderHook(() => useSession(), {
      wrapper,
    })

    expect(result.current.session).toEqual({
      ...localStorage,
      isAdmin: true,
      hasSession: true,
    })
  })
})

describe("Given the user does not a session", () => {
  it("useSession Custom Hook should return the correct state", () => {
    const expected = {
      hasSession: false,
    }

    const wrapper = ({ children }) => (
      <SessionProvider>{children}</SessionProvider>
    )
    const { result } = renderHook(() => useSession(), {
      wrapper,
    })

    expect(result.current.session).toEqual(expected)
  })
})

// test case for user without session
// test case for user withouth a valid sessionState
// test case for for reducer
