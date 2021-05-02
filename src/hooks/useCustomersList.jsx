import { useQuery } from "react-query"
import api from "../api"

const fetchCustomerList = async () => {
  const { data } = await api.get("/customer")
  return data.data
}

export const useCustomersList = (options = {}) =>
  useQuery("customer-list", fetchCustomerList, options)
