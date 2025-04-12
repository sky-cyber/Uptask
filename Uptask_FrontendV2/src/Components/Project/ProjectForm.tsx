import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type ProjectFormProps = {
   register: UseFormRegister<{
      projectName: string;
      clientName: string;
      description: string;
   }>;
   errors: FieldErrors<{
      projectName: string;
      clientName: string;
      description: string;
   }>;
};

export default function ProjectForm({ register, errors }: ProjectFormProps) {
   return (
      <>
         <div className="mb-5 space-y-3">
            <label
               className="text-sm font-bold uppercase"
               htmlFor="projectName"
            >
               Nombre del proyecto
            </label>
            <input
               id="projectName"
               className="w-full p-3 bg-discord-darker rounded-lg shadow-lg
                  ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Nombre del Proyecto"
               autoComplete="off"
               {...register("projectName", {
                  required: "El nombre del proyecto es obligatorio",
               })}
            />

            {errors.projectName && (
               <ErrorMessage>{errors.projectName.message}</ErrorMessage>
            )}
         </div>

         <div className="mb-5 space-y-3">
            <label className="text-sm font-bold uppercase" htmlFor="clientName">
               Nombre del Cliente
            </label>
            <input
               id="clientName"
               className="w-full p-3 bg-discord-darker rounded-lg shadow-lg
                  ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Nombre del Cliente"
               autoComplete="off"
               {...register("clientName", {
                  required: "El nombre del cliente es obligatorio",
               })}
            />

            {errors.clientName && (
               <ErrorMessage>{errors.clientName.message}</ErrorMessage>
            )}
         </div>

         <div className="mb-5 space-y-3">
            <label
               className="text-sm font-bold uppercase"
               htmlFor="description"
            >
               Descripción del proyecto
            </label>
            <input
               id="description"
               className="w-full p-3 bg-discord-darker rounded-lg shadow-lg
                  ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Descripción del Proyecto"
               autoComplete="off"
               {...register("description", {
                  required: "La descripción es obligatoria",
               })}
            />
            {errors.description && (
               <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
         </div>
      </>
   );
}
