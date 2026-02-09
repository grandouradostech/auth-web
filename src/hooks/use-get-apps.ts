import { auth_api } from "@/services/http/auth"
import { useQuery } from "@tanstack/react-query"

export const useGetApps = () => {
  const query = useQuery({
    queryKey: ["query-get-apps"],
    queryFn: async () => {
      //  const response = await auth_api.get("/")
      return []
    },
  })

  return query
}
