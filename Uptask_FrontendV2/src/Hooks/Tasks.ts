import { getCantRegister, updateStatusTask } from "@/Services/TaskServices";
import { Project } from "@/Types/Projects";
import { Task } from "@/Types/Task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type H_ParamsTasks = {
   projectID: Project["_id"];
   taskID: Task["_id"];
};

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

export const H_UpdateStatusTask = ({
   projectID,
   taskID = "",
}: Pick<H_ParamsTasks, "projectID" | "taskID">) => {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateStatusTask,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         queryClient.invalidateQueries({
            queryKey: ["ProjectDetails", projectID],
         });

         if (taskID !== "") {
            queryClient.invalidateQueries({ queryKey: ["taskView", taskID] });
            navigate(location.pathname);
         }

         toast.success(result);
      },
   });
};
