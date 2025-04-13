import CreateTaskModal from "@/Components/Tasks/CreateTaskModal";
import ListTasks from "@/Components/Tasks/ListTasks";
import TaskModalDetails from "@/Components/Tasks/TaskModalDetails";
import UpdateTaskData from "@/Components/Tasks/UpdateTaskData";
import { IsManager } from "@/helpers/IsManager";
import { H_UserAuth } from "@/Hooks/UseAuth";
import { getProjectById } from "@/Services/ProjectServices";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProjectDetails() {
   const { data: user } = H_UserAuth();

   const navigate = useNavigate();

   const queryParams = useParams();
   const projectID = queryParams.projectID!;

   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["ProjectDetails", projectID],
      queryFn: () => getProjectById(projectID),
      retry: false,
   });

   const CanUseThisFunction = useMemo(
      () => IsManager(data?.manager, user?._id),
      [data, user]
   );

   if (isError) {
      toast.error(error.message, { toastId: "error" });
      return <Navigate to="/" replace />;
   }

   if (isLoading) {
      return "Cargando....";
   }

   if (data && user)
      return (
         <>
            <h1 className="text-5xl font-black ">{data.projectName}</h1>
            <p className="text-2xl text-discord-primary mt-3">
               {data.description}
            </p>

            {CanUseThisFunction && (
               <button
                  type="button"
                  className="bg-discord-primary hover:bg-blue-700 p-5 rounded-lg cursor-pointer font-bold uppercase mt-4"
                  onClick={() => {
                     navigate(location.pathname + "?NewTask=true");
                  }}
               >
                  Agregar una tarea
               </button>
            )}

            <Link
               to={location.pathname + `/teams`}
               className={CanUseThisFunction ? "pl-3" : ""}
            >
               <button
                  type="button"
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 p-5 rounded-lg cursor-pointer font-bold uppercase mt-4"
               >
                  Colaborador
               </button>
            </Link>

            <ListTasks
               tasks={data.tasks}
               CanUseThisFunction={CanUseThisFunction}
            />

            <CreateTaskModal />
            <UpdateTaskData />
            <TaskModalDetails />
         </>
      );
}
