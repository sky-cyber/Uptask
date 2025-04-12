import { deleteTask } from "@/Services/TaskServices";
import { TaskCardData } from "@/Types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { FaEye, FaPencilAlt, FaTrashRestore } from "react-icons/fa";

type TaskCardProp = {
   task: TaskCardData;
   CanUseThisFunction: boolean;
};

export default function TaskCard({ task, CanUseThisFunction }: TaskCardProp) {
   const navigate = useNavigate();
   const paramsURL = useParams();
   const projectID = paramsURL.projectID!;

   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: deleteTask,
      onError: (error) => toast.error(error.message),
      onSuccess: (result) => {
         queryClient.invalidateQueries({
            queryKey: ["ProjectDetails", projectID],
         });
         toast.success(result);
      },
   });

   const handleDeleteTask = async (taskID: TaskCardData["_id"]) => {
      const data = { projectID, taskID };
      await mutation.mutateAsync(data);
   };

   return (
      <li className="bg-discord-darker p-3 border flex justify-between gap-3 rounded-lg ring-1 ring-gray-500/20 border-b border-black/55">
         <div className="flex-auto min-w-16 flex flex-col gap-2">
            <div
               className="flex justify-center w-16 text-xs bg-amber-100 border border-amber-800 text-amber-700 rounded-xl"
               role="alert"
            >
               <span className="block sm:inline">
                  <strong className="font-bold">Media</strong>
               </span>
            </div>

            <div className="mb-3">
               <button className="break-words text-xl font-bold text-slate-200 text-left">
                  {task.name}
               </button>
               <p className="text-gray-400 text-md break-words">
                  {task.description}
               </p>
            </div>

            <div className="flex justify-between items-center">
               <div>
                  <button
                     type="button"
                     onClick={() =>
                        navigate(location.pathname + `?viewTask=${task._id}`)
                     }
                     className="text-blue-500 hover:text-blue-400 p-1 rounded-xl transition-colors"
                  >
                     <FaEye />
                  </button>

                  {CanUseThisFunction && (
                     <>
                        <button
                           type="button"
                           onClick={() =>
                              navigate(
                                 location.pathname + `?editTask=${task._id}`
                              )
                           }
                           className="text-amber-500 hover:text-amber-400 p-1 rounded-xl  transition-colors"
                        >
                           <FaPencilAlt />
                        </button>
                        <button
                           onClick={() => handleDeleteTask(task._id)}
                           className="text-red-500 hover:text-red-400 rounded-xl transition-colors"
                        >
                           <FaTrashRestore />
                        </button>
                     </>
                  )}
               </div>

               <div className="flex justify-center items-cente">
                  <img
                     src="https://randomuser.me/api/portraits/women/5.jpg"
                     alt="Usuario"
                     className="w-8 h-8 rounded-full"
                  />
               </div>
            </div>
         </div>
      </li>
   );
}
