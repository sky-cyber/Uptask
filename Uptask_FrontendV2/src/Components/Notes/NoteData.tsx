import { H_NoteDetails } from "@/Hooks/Note";
import NoteUpdateForm from "./NoteUpdateForm";
import { Project } from "@/Types/Projects";
import { Task } from "@/Types/Task";
import { Note } from "@/Types/Notes";

type NoteDataProps = {
   handleActiveTextArea: () => void;
   projectID: Project["_id"];
   taskID: Task["_id"];
   noteID: Note["_id"];
};

export default function NoteData({
   handleActiveTextArea,
   projectID,
   taskID,
   noteID,
}: NoteDataProps) {
   const { data, isLoading } = H_NoteDetails(projectID, taskID, noteID);

   if (isLoading) {
      return "Cargando...";
   }

   console.log(data);

   if (data)
      return (
         <NoteUpdateForm
            content={data.content}
            handleActiveTextArea={handleActiveTextArea}
            noteID={noteID}
         />
      );
}
