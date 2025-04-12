import { TaskFormData } from "@/Types/Task";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type TaskFormPros = {
   register: UseFormRegister<TaskFormData>;
   errors: FieldErrors<TaskFormData>;
};

export default function TaskForm({ register, errors }: TaskFormPros) {
   return (
      <>
         <div className="flex flex-col gap-5">
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

         <div className="flex flex-col gap-5">
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
      </>
   );
}
