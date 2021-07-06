import { createContext, useContext, useReducer, useCallback } from "react"
import { object, string, define, is } from "superstruct"
import jwt_decode from "jwt-decode"
import { boolean } from "superstruct"
import { tryCatch } from "../utils"

const LOGIN_ACTION = "LOGIN"
const LOGOUT_ACTION = "LOGOUT"
const token = () => define("token", (payload) => Boolean(jwt_decode(payload)))

const User = object({
  id: string(),
  name: string(),
  annotation: string(),
  email: string(),
  contact: string(),
  customerId: string(),
})

const user = () => define("user", (payload) => is(payload, User))

const Session = object({
  user: user(),
  hasSession: boolean(),
  isAdmin: boolean(),
  token: token(),
})

/**
 * @typedef {{
 * user?: User;
 * hasSession: boolean
 * isAdmin?: boolean
 * token?: string;
 * }} SessionState
 *
 * @typedef {{
 * id: string;
 * name: string;
 * annotation: string;
 * email: string;
 * contact: string;
 * customerId: string;
 * }} User
 */

export const SessionContext = createContext({})

const validateLocalStorage = (payload) => is(payload, Session)

export const ADMIN_ROLE = "Administrador"

const isAdmin = (token) => jwt_decode(token).role === ADMIN_ROLE

const decodeToken = (token) => tryCatch(() => jwt_decode(token))

const isExpired = (token) =>
  decodeToken(token)
    .map(({ exp }) => new Date(exp * 1000) < Date.now())
    .mapLeft((x) => {
      console.log(x)
      return true
    })

const init = () => {
  const previousSession = JSON.parse(localStorage.getItem("session"))
  const isTokenExpired =
    previousSession && isExpired(previousSession.token).extract()

  if (validateLocalStorage(previousSession) && !isTokenExpired) {
    return {
      session: {
        ...previousSession,
        hasSession: true,
        isAdmin: isAdmin(previousSession.token),
      },
    }
  }

  localStorage.setItem("session", JSON.stringify({ hasSession: false }))
  return { session: { hasSession: false } }
}

export const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {}, init)

  const login = useCallback((payload) => {
    dispatch({ type: LOGIN_ACTION, payload })
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT_ACTION })
  }, [])

  return (
    <SessionContext.Provider value={{ ...state, login, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

/**
 * @type SessionState
 */
export const useSession = () => useContext(SessionContext)

function reducer(state, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      // eslint-disable-next-line no-case-declarations
      const loggedSession = {
        token: action.payload.token,
        user: action.payload.user,
        hasSession: true,
        isAdmin: isAdmin(action.payload.token),
      }
      localStorage.setItem("session", JSON.stringify(loggedSession))
      return {
        session: loggedSession,
      }
    case LOGOUT_ACTION:
      // eslint-disable-next-line no-case-declarations
      const logoutSession = { hasSession: false }
      localStorage.setItem("session", JSON.stringify(logoutSession))
      return { session: logoutSession }
    default:
      return state
  }
}
