import { Routes, Route } from "react-router-dom"
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
        <Route path="dashboards" element={<DashboardRoute />} />
      </Route>

      <Route path="/login" element={<LoginRoute />} />
    </Routes>
  )
}

export default App
