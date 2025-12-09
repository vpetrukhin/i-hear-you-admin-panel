import { useQuery } from "@tanstack/react-query"
import { getPathsList } from "../api/path"

export const usePathsQuery = () => {
  return useQuery({
    queryKey: ["paths"],
    queryFn: async () => {
      const data = await getPathsList()

      return data
    }
  })
}
