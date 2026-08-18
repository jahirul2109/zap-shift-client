import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import { useAxiousSecoure } from "./useAxiousSecoure";

export const useRole = () => {
    const { user } = useAuth();
    const axiousInstence = useAxiousSecoure()
    const { data: users = {}, error, isLoading } = useQuery(
        {
            queryKey: ['users', user.email],
            queryFn: async () => {
                const result = await axiousInstence.get(`/users/${user.email}/role`)
                return result.data
            }
        }
    )
    return { users, isLoading }
}