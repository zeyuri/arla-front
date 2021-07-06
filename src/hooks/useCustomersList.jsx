import { useQuery } from "react-query"
import { useAxiosProvider } from "../providers"
import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

export const useCustomersList = (options = {}) => {
  const axios = useAxiosProvider()
  const [params] = useSearchParams()
  const name = params.get("name")

  const fetchCustomerList = useCallback(async () => {
    const { data } = await axios.get("/customer", {
      params: name && { name },
    })
    return data.data
  }, [axios, name])

  return useQuery(["customer-list", "name", name], fetchCustomerList, options)
}
