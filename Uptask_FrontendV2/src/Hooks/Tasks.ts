import { getCantRegister } from "@/Services/TaskServices";
import { Project } from "@/Types/Projects";
import { Task } from "@/Types/Task";
import { useQuery } from "@tanstack/react-query";

export const H_TasksCantRegistro = (
   projectID: Project["_id"],
   taskID: Task["_id"]
) => {
   const { data, isError, isLoading } = useQuery({
      queryKey: ["cantRegister", taskID],
      queryFn: () => getCantRegister({ projectID, taskID }),
      retry: false,
      refetchOnWindowFocus: false,
   });

   return { data, isError, isLoading };
};
