import { useParams } from "react-router-dom";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { H_UserAuth } from "@/Hooks/UseAuth";

export default function NotePanel() {
   const paramsURL = useParams();
   const queryParams = new URLSearchParams(location.search);
   const projectID = paramsURL.projectID!;
   const taskID = queryParams.get("viewTask")!;

   const { data: user } = H_UserAuth();

   if (user)
      return (
         <>
            <p className="font-bold text-slate-300">Sesión de comentarios</p>
            <div className="bg-discord-background">
               <NoteForm projectID={projectID} taskID={taskID} />
               <NoteList
                  user={user._id}
                  projectID={projectID}
                  taskID={taskID}
               />
            </div>
         </>
      );
}
