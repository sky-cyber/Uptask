import { Content } from "@/Types/Notes";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { H_NoteCreate } from "@/Hooks/Note";
import { Project } from "@/Types/Projects";
import { Task } from "@/Types/Task";
import { useQueryClient } from "@tanstack/react-query";

type NoteFormProps = {
   projectID: Project["_id"];
   taskID: Task["_id"];
};

export default function NoteForm({ projectID, taskID }: NoteFormProps) {
   const inicialValue: Content = {
      content: "",
   };

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<Content>({ defaultValues: inicialValue });

   const queryClient = useQueryClient();

   const { mutate } = H_NoteCreate({ reset, queryClient });

   const handleCreateNote = async (formData: Content) => {
      const data = { projectID, taskID, formData };
      mutate(data);
   };

   return (
      <form
         onSubmit={handleSubmit(handleCreateNote)}
         className="p-5 rounded-lg mt-2"
      >
         <textarea
            id="content"
            placeholder="Agrega tu comentario aquí"
            className="w-full h-28 p-3 bg-discord-darker rounded-lg shadow-lg
                              ring-1 ring-gray-500/20 border-b border-black/55 text-white"
            {...register("content", {
               required: "Debe escribir un comentario",
            })}
         />

         {errors.content && (
            <ErrorMessage>{errors.content.message}</ErrorMessage>
         )}

         <div className="flex justify-end">
            <input
               type="submit"
               value="Guardar cambios"
               className="bg-discord-primary hover:bg-blue-700 p-3 rounded-lg text-white cursor-pointer transition-colors mt-4 shadow-lg"
            />
         </div>
      </form>
   );
}
