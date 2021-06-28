import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"

export const useCustomersList = (options = {}) => {
  const axios = useAxiosProvider()

  const fetchCustomerList = useCallback(async () => {
    const { data } = await axios.get("/customer")
    return data.data
  }, [axios])

  return useQuery("customer-list", fetchCustomerList, options)
}
