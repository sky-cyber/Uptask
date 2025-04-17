import { TaskFormData, TasksPriority } from "@/Types/Task";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { priorityTraslations } from "@/helpers/TrasnsitionPriority";

type TaskFormPros = {
   register: UseFormRegister<TaskFormData>;
   errors: FieldErrors<TaskFormData>;
   setTaskPriority: React.Dispatch<
      React.SetStateAction<"low" | "medium" | "high" | "urgent">
   >;
   taskPriority: "low" | "medium" | "high" | "urgent";
};

export default function TaskForm({
   register,
   errors,
   setTaskPriority,
   taskPriority,
}: TaskFormPros) {
   const handleSelectPriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTaskPriority(e.target.value as TasksPriority);
   };

   return (
      <>
         <div className="flex flex-col gap-3 mb-3">
            <label className="font-normal text-2xl" htmlFor="name">
               Nombre de la tarea
            </label>
            <input
               id="name"
               type="text"
               placeholder="Nombre de la tarea"
               autoComplete="off"
               className="w-full p-3 bg-discord-darker rounded-lg shadow-lg
                  ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               {...register("name", {
                  required: "El nombre de la tarea es obligatorio",
               })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
         </div>

         <div className="flex flex-col gap-3 mb-3">
            <label className="font-normal text-2xl" htmlFor="description">
               Descripción de la tarea
            </label>
            <textarea
               id="description"
               placeholder="Descripción de la tarea"
               className="w-full p-3 bg-discord-darker rounded-lg shadow-lg
                  ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               {...register("description", {
                  required: "La descripción de la tarea es obligatoria",
               })}
            />
            {errors.description && (
               <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
         </div>

         <div className="flex flex-col gap-3">
            <label className="font-normal text-2xl" htmlFor="description">
               Prioridad de la tarea
            </label>

            <select
               className="w-full p-3 bg-discord-darker rounded-lg"
               id="PriorityTasks"
               onChange={handleSelectPriority}
               defaultValue={taskPriority}
            >
               {Object.entries(priorityTraslations).map(([key, value]) => (
                  <option key={key} value={key}>
                     {value}
                  </option>
               ))}
            </select>
         </div>
      </>
   );
}
