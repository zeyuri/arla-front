import { useNavigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { useSession } from "./providers"
import {
  HomeRoute,
  CustomerList,
  CustomersCreateRoute,
  CustomersEditRoute,
  DevicesListRoute,
  DevicesCreateRoute,
  UserEditRoute,
  UserCreateRoute,
  UserListRoute,
  DashboardRoute,
  DevicesEditRoute,
  LoginRoute,
} from "./routes"

function App() {
  return (
    <Routes>
      <Route path="/app" element={<HomeRoute />}>
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/create" element={<CustomersCreateRoute />} />
        <Route
          path="customers/edit/:customerId"
          element={<CustomersEditRoute />}
        />
        <Route path="devices" element={<DevicesListRoute />} />
        <Route path="devices/create" element={<DevicesCreateRoute />} />
        <Route path="devices/edit/:deviceId" element={<DevicesEditRoute />} />
        <Route path="users" element={<UserListRoute />} />
        <Route path="users/create" element={<UserCreateRoute />} />
        <Route path="users/edit/:userId" element={<UserEditRoute />} />
      </Route>
      <Route path="/dashboards" element={<DashboardRoute />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/" element={<DefaultRoute />} />
    </Routes>
  )
}

const DefaultRoute = () => {
  const { session } = useSession()
  const navigate = useNavigate()

  if (!session.hasSession) {
    navigate("/login")
    return null
  }

  if (session.hasSession) {
    if (session.isAdmin) {
      navigate("/app")
    } else {
      navigate("/dashboards")
    }
    return null
  }
}

export default App
