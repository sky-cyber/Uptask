import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskByID } from "@/Services/TaskServices";
import { toast } from "react-toastify";
import TasksCardDetail from "./TasksCardDetail";

export default function TaskModalDetails() {
   const navigate = useNavigate();
   const paramsURL = useParams();
   const queryParams = new URLSearchParams(location.search);
   const projectID = paramsURL.projectID!;
   const taskID = queryParams.get("viewTask")!;
   const show = taskID ? true : false;

   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["taskView", taskID],
      queryFn: () => getTaskByID({ projectID, taskID }),
      enabled: !!taskID,
      retry: false,
   });

   useEffect(() => {
      if (isError) {
         toast.error(error.message, { toastId: "error" });
         navigate(`/projects/${projectID}`);
      }
   }, [isError, error]);

   if (isLoading) {
      return "Cargando...";
   }

   if (data)
      return (
         <>
            <Transition appear show={show} as={Fragment}>
               <Dialog
                  as="div"
                  className="relative z-10"
                  onClose={() => navigate(location.pathname, { replace: true })}
               >
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0"
                     enterTo="opacity-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                  >
                     <div className="fixed inset-0 bg-black/60" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                     <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                           as={Fragment}
                           enter="ease-out duration-300"
                           enterFrom="opacity-0 scale-95"
                           enterTo="opacity-100 scale-100"
                           leave="ease-in duration-200"
                           leaveFrom="opacity-100 scale-100"
                           leaveTo="opacity-0 scale-95"
                        >
                           <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-discord-darker text-left align-middle shadow-xl transition-all p-16">
                              <TasksCardDetail
                                 data={data}
                                 projectID={projectID}
                                 taskID={taskID}
                              />
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </Dialog>
            </Transition>
         </>
      );
}
