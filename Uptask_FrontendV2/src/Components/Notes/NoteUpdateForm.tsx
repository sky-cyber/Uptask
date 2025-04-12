import { Content, Note } from "@/Types/Notes";
import { useForm } from "react-hook-form";
import { ImCancelCircle } from "react-icons/im";
import { MdSend } from "react-icons/md";
import ErrorMessage from "../ErrorMessage";
import { H_NoteUpdate } from "@/Hooks/Note";
import { useQueryClient } from "@tanstack/react-query";

type NoteUpdateFormProps = {
   handleActiveTextArea: () => void;
   content: Note["content"];
   noteID: Note["_id"];
};

export default function NoteUpdateForm({
   handleActiveTextArea,
   content,
   noteID,
}: NoteUpdateFormProps) {
   const initialValue: Content = {
      content: content,
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Content>({ defaultValues: initialValue });

   const queryClient = useQueryClient();

   const { mutate } = H_NoteUpdate({
      queryClient,
   });

   const handleEditForm = (formData: Content) => {
      const data = { noteID, formData };
      mutate(data);
      handleActiveTextArea();
   };

   return (
      <form onSubmit={handleSubmit(handleEditForm)}>
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
         <div className="flex justify-center items-center">
            <button
               onClick={handleActiveTextArea}
               className="bg-[#443345] bg-opacity-60 text-[#f86666] text-lg p-2 rounded-xl mr-2 hover:bg-[#443345] hover:text-[#ad2d2d] transition-colors"
            >
               <ImCancelCircle />
            </button>
            <button className="bg-[#104f18] bg-opacity-60 text-[#4fe83b] text-lg p-2 rounded-xl mr-2 hover:bg-[#1c4334] hover:text-[#c0dac3] transition-colors">
               <MdSend />
            </button>
         </div>
      </form>
   );
}
