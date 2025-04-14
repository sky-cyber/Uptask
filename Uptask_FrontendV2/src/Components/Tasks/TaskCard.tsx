import { deleteTask } from "@/Services/TaskServices";
import { TaskCardData } from "@/Types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
   FaEye,
   FaPencilAlt,
   FaTrashRestore,
   FaCommentDots,
} from "react-icons/fa";
import { VscListFlat } from "react-icons/vsc";
import { H_TasksCantRegistro } from "@/Hooks/Tasks";

type TaskCardProp = {
   task: TaskCardData;
   CanUseThisFunction: boolean;
};

export default function TaskCard({ task, CanUseThisFunction }: TaskCardProp) {
   const navigate = useNavigate();
   const paramsURL = useParams();
   const projectID = paramsURL.projectID!;

   const queryClient = useQueryClient();

   const { data: cant } = H_TasksCantRegistro(projectID, task._id);

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

               <div className="flex justify-center items-center gap-3">
                  <div className="relative text-blue-100 rounded">
                     <FaCommentDots className="text-xl text-bag-400" />
                     <span className="absolute bg-discord-background text-blue-100 px-1 text-xs font-bold rounded-full -top-2 -right-1">
                        {cant?.notes}
                     </span>
                  </div>
                  <div className="relative text-blue-100 rounded">
                     <VscListFlat className="text-xl" />
                     <span className="absolute bg-discord-background text-blue-100 px-1 text-xs font-bold rounded-full -top-2 -right-1">
                        {cant?.createBy}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </li>
   );
}
