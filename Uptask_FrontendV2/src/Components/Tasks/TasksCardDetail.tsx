import { formaFulltDate, formatDate } from "@/helpers/Format";
import { statusColor, statusTraslations } from "@/helpers/TransisionStatus";
import { updateStatusTask } from "@/Services/TaskServices";
import { Project } from "@/Types/Projects";
import { Task, TaskStatus } from "@/Types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SlArrowDownCircle, SlArrowUpCircle } from "react-icons/sl";
import NotePanel from "../Notes/NotePanel";

type TasksCardDetailProps = {
   projectID: Project["_id"];
   taskID: Task["_id"];
   data: Task;
};

export default function TasksCardDetail({
   projectID,
   taskID,
   data,
}: TasksCardDetailProps) {
   const [openButton, setopenButton] = useState(false);

   const navigate = useNavigate();

   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: updateStatusTask,
      onError: (error) => {
         toast.error(error.message);
         toast.error("algo mal");
      },
      onSuccess: (result) => {
         queryClient.invalidateQueries({
            queryKey: ["ProjectDetails", projectID],
         });
         queryClient.invalidateQueries({ queryKey: ["taskView", taskID] });
         toast.success(result);
         navigate(location.pathname);
      },
   });

   const handleChangeStatus = async (e: ChangeEvent<HTMLSelectElement>) => {
      const status = e.target.value as TaskStatus;
      const data = { projectID, taskID, status };
      await mutation.mutateAsync(data);
   };

   const HandleOpenHistory = () => {
      setopenButton(!openButton);
   };

   return (
      <div>
         <p className="text-sm text-slate-200">
            Agregada el: {formatDate(data.createdAt)}
         </p>
         <p className="text-sm text-slate-400">
            Última actualización: {formatDate(data.updatedAt)}
         </p>
         <div className="font-black text-4xl text-slate-200 my-5 bg-discord-background p-5 text-center rounded-lg">
            <div>
               {data.name}
               <div className="font-bold text-lg text-slate-300 mb-2 mt-2">
                  {data.description}
               </div>
            </div>
         </div>

         {data.createBy.length > 0 && (
            <>
               <button
                  onClick={HandleOpenHistory}
                  className="text-2xl transition-all duration-500 bg-discord-primary p-2 rounded-lg hover:bg-blue-700 border border-discord-background_Second"
               >
                  {openButton ? (
                     <div className="flex justify-center items-center">
                        <SlArrowUpCircle />
                     </div>
                  ) : (
                     <div className="flex justify-center items-center">
                        <SlArrowDownCircle />
                     </div>
                  )}
               </button>

               {openButton && (
                  <div className="bg-discord-background p-5 border border-discord-background_Second shadow-xl transition-all">
                     <p className="text-center font-bold text-2xl border-b m-2">
                        Historial de cambios
                     </p>

                     <div className="overflow-auto max-h-40 hide-scrollbar">
                        {data.createBy.map((item) => (
                           <div key={item._id} className="p-2 mb-1">
                              <span className="font-bold text-discord-textGrey">
                                 Usuario
                              </span>
                              : {item.user.name} hizo una modificación a{" "}
                              <span
                                 className={`${
                                    statusColor[item.status]
                                 } font-bold`}
                              >
                                 {statusTraslations[item.status]}
                              </span>{" "}
                              el {formaFulltDate(item.updateAt)}
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </>
         )}

         <div className="my-5 space-y-3">
            <label className="font-bold text-slate-300">
               Estado Actual: {statusTraslations[data.status]}
            </label>

            <select
               defaultValue={data.status}
               onChange={handleChangeStatus}
               className="w-full p-3 bg-discord-background rounded-lg "
            >
               {Object.entries(statusTraslations).map(([key, value]) => (
                  <option key={key} value={key}>
                     {value}
                  </option>
               ))}
            </select>
         </div>

         <NotePanel />
      </div>
   );
}
