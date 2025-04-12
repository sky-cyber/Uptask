import { H_NoteList } from "@/Hooks/Note";
import NoteDetails from "./NoteDetails";
import { Project } from "@/Types/Projects";
import { Task } from "@/Types/Task";
import { Profile } from "@/Types/User";

type NoteListProps = {
   projectID: Project["_id"];
   taskID: Task["_id"];
   user: Profile["_id"];
};

export default function NoteList({ projectID, taskID, user }: NoteListProps) {
   const { data, isLoading } = H_NoteList(projectID, taskID);

   if (isLoading) {
      return "Cargando...";
   }

   if (data)
      return (
         <div className="border-t border-t-slate-800 m-2">
            <div className="mt-2">
               <h1 className="text-center text-lg font-bold text-slate-300 p-3">
                  {data.length ? "Comentarios de los colaboradores" : ""}
               </h1>

               <div className="p-3 space-y-4">
                  {data.map((item) => (
                     <NoteDetails
                        key={item._id}
                        data={item}
                        projectID={projectID}
                        taskID={taskID}
                        user={user}
                     />
                  ))}
               </div>
            </div>
         </div>
      );
}
