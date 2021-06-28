import { createContext, useContext, useReducer, useCallback } from "react"
import { object, string, define, is } from "superstruct"
import jwt_decode from "jwt-decode"

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

const init = () => {
  const previousSession = JSON.parse(localStorage.getItem("session"))

  if (validateLocalStorage(previousSession)) {
    return {
      session: {
        ...previousSession,
        hasSession: true,
        isAdmin: isAdmin(previousSession.token),
      },
    }
  }
  return { session: { hasSession: false } }
}

export const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {}, init)
  console.log(state)
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
      return {
        session: {
          token: action.payload.token,
          user: action.payload.user,
          hasSession: true,
          isAdmin: isAdmin(action.payload.token),
        },
      }
    case LOGOUT_ACTION:
      return { session: { hasSession: false } }
    default:
      return state
  }
}

// function subscribe(reducer) {
//   const reducerSubscribed = (state, action) => {
//     const newState = reducer(state, action)
//     const stateKeys = Object.keys(newState)

//     dataToStore.forEach((key) => {
//       if (stateKeys.includes(key)) {
//         if (newState[key] === null || newState[key] === undefined)
//           localStorage.removeItem(key)
//         else localStorage.setItem(key, newState[key])
//       }
//     })

//     return newState
//   }

//   return reducerSubscribed
// }
