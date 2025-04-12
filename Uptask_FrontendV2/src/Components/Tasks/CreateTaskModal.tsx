import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateTask } from "@/Services/TaskServices";
import { toast } from "react-toastify";
import { TaskFormData } from "@/Types/Task";

export default function AddTaskModal() {
   const navigate = useNavigate();
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const newTask = queryParams.get("NewTask");
   const show = newTask ? true : false;

   const paramsUrl = useParams();
   const projectID = paramsUrl.projectID!;

   const InitialValue: TaskFormData = {
      name: "",
      description: "",
   };

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<TaskFormData>({ defaultValues: InitialValue });

   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: CreateTask,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         queryClient.invalidateQueries({
            queryKey: ["ProjectDetails", projectID],
         });
         toast.success(result);
         reset();
         navigate(location.pathname, { replace: true });
      },
   });

   const handleForm = async (formData: TaskFormData) => {
      const data = { projectID, formData };
      await mutation.mutateAsync(data);
   };

   return (
      <>
         <Transition appear show={show} as={Fragment}>
            <Dialog
               as="div"
               className="relative z-10"
               onClose={() => {
                  navigate(location.pathname, { replace: true });
               }}
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
                           <Dialog.Title
                              as="h3"
                              className="font-black text-4xl  my-5"
                           >
                              Nueva Tarea
                           </Dialog.Title>

                           <p className="text-xl font-bold">
                              Llena el formulario y crea {""}
                              <span className="text-discord-primary">
                                 una tarea
                              </span>
                           </p>

                           <form
                              className="mt-10 p-10 border 
                                bg-discord-background rounded-lg shadow-lg
                                ring-1 ring-gray-500/20 border-b border-black/55"
                              onSubmit={handleSubmit(handleForm)}
                              noValidate
                           >
                              <TaskForm register={register} errors={errors} />

                              <input
                                 type="submit"
                                 value="Guardar cambios"
                                 className="bg-discord-primary hover:bg-blue-700 w-full p-3 rounded-lg text-white font-black uppercase cursor-pointer transition-colors mt-4"
                              />
                           </form>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
}
