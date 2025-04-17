import { Task, TaskFormData, TasksPriority } from "@/Types/Task";
import { Project } from "@/Types/Projects";
import { Dialog, Transition } from "@headlessui/react";
import TaskForm from "./TaskForm";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/Services/TaskServices";
import { useState } from "react";

type UpdateTaskModalProp = {
   task: Task;
   projectID: Project["_id"];
};

export default function UpdateTaskModal({
   task,
   projectID,
}: UpdateTaskModalProp) {
   const navigate = useNavigate();

   const taskID = task._id;

   // Capturar la propiedad de la tarea
   const [taskPriority, setTaskPriority] = useState<TasksPriority>(
      task.priority
   );

   const InitialValue: TaskFormData = {
      name: task.name,
      description: task.description,
      priority: task.priority,
   };

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<TaskFormData>({ defaultValues: InitialValue });

   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: updateTask,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         queryClient.invalidateQueries({
            queryKey: ["ProjectDetails", projectID],
         });
         queryClient.invalidateQueries({
            queryKey: ["task", taskID],
         });
         toast.success(result);
         reset();
         navigate(location.pathname, { replace: true });
      },
   });

   const handleForm = async (formData: TaskFormData) => {
      formData.priority = taskPriority as TasksPriority;
      const data = { projectID, taskID, formData };
      await mutation.mutateAsync(data);
   };

   return (
      <>
         <Transition appear show={true} as={Fragment}>
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
                              <TaskForm
                                 register={register}
                                 errors={errors}
                                 setTaskPriority={setTaskPriority}
                                 taskPriority={taskPriority}
                              />

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
