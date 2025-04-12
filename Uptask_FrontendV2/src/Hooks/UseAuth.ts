import { getUser } from "@/Services/AuthServices";
import { useQuery } from "@tanstack/react-query";

export const H_UserAuth = () => {
   const { data, isError, isLoading } = useQuery({
      queryKey: ["user"],
      queryFn: getUser,
      retry: false,
      refetchOnWindowFocus: false,
   });

   return { data, isError, isLoading };
};
