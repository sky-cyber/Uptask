import { formaFulltDate } from "@/helpers/Format";
import { IsManager } from "@/helpers/IsManager";
import { H_NoteAddLikeMember, H_NoteDelete } from "@/Hooks/Note";
import { Note } from "@/Types/Notes";
import { Project } from "@/Types/Projects";
import { Task } from "@/Types/Task";
import { Profile } from "@/Types/User";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaEye, FaPencilAlt, FaTrashRestore } from "react-icons/fa";
import NoteData from "./NoteData";
import { useNavigate } from "react-router-dom";

type NoteDetailsProps = {
   projectID: Project["_id"];
   taskID: Task["_id"];
   data: Note;
   user: Profile["_id"];
};

export default function NoteDetails({
   projectID,
   taskID,
   data,
   user,
}: NoteDetailsProps) {
   const navigate = useNavigate();

   const IsActiveLike = data.likes.some((x) => x === user);

   const [activeLike, setActiveLike] = useState(IsActiveLike);
   const [activeEditText, setActiveEditText] = useState(false);

   const handleActiveLike = () => {
      setActiveLike(!activeLike);
   };

   const handleActiveTextArea = () => {
      setActiveEditText(!activeEditText);
   };

   const queryClient = useQueryClient();

   const { mutate: noteDelete } = H_NoteDelete({ queryClient });
   const { mutate: noteAddLike } = H_NoteAddLikeMember({
      queryClient,
   });

   const handleDeleteNote = async (noteID: Note["_id"]) => {
      const data = { projectID, taskID, noteID };
      noteDelete(data);
   };

   const handleAddLikeMember = (noteID: Note["_id"]) => {
      const data = { projectID, taskID, noteID };
      noteAddLike(data);
      handleActiveLike();
   };

   const canDoneFuntion = useMemo(
      () => IsManager(data.user._id, user),
      [data, user]
   );

   const IsReacionNote = data.likes.length ? "text-amber-500" : "text-gray-500";

   return (
      <div className="bg-discord-darker p-4 rounded-lg shadow">
         <div className="block md:flex items-center mb-2">
            <img
               src={data.user.urlImagen}
               alt="User Avatar"
               className="w-14 h-14 rounded-full mr-3"
            />
            <div className="flex-grow">
               <h3 className="font-semibold">{data.user.name}</h3>
               <h3 className="text-sm text-slate-400">{data.user.email}</h3>
            </div>
            <p className="text-sm text-gray-400 ml-auto">
               Posteado el {formaFulltDate(data.updatedAt)}
            </p>
         </div>

         {activeEditText ? (
            <NoteData
               handleActiveTextArea={handleActiveTextArea}
               projectID={projectID}
               taskID={taskID}
               noteID={data._id}
            />
         ) : (
            <p className="text-gray-200">{data.content}</p>
         )}

         <div className="flex justify-between items-center mt-2">
            {!activeEditText && (
               <div className="flex justify-center items-center">
                  <button
                     className={`flex justify-center items-center gap-1 text-lg hover:text-xl transition-all duration-100 ${
                        activeLike
                           ? "text-discord-primary hover:text-blue-700"
                           : "text-gray-500"
                     } hover:text-discord-primary mr-2`}
                     onClick={() => handleAddLikeMember(data._id)}
                  >
                     <BiSolidLike />
                     Like
                  </button>
                  <button
                     type="button"
                     onClick={() => {
                        navigate(
                           location.pathname +
                              `?viewTask=${taskID}&viewLikes=${data._id}`
                        );
                     }}
                     className={`flex justify-center items-center gap-1 text-lg hover:text-xl transition-all duration-100 ${IsReacionNote}
                     } hover:text-amber-500 mr-2`}
                  >
                     <FaEye />
                     <span className="text-xs">{data.likes.length}</span>
                  </button>
               </div>
            )}

            {canDoneFuntion && !activeEditText && (
               <div>
                  <button
                     onClick={handleActiveTextArea}
                     className="bg-[#2e2a31] bg-opacity-60 text-[#f8b037] text-lg p-2 rounded-xl mr-2 hover:bg-[#2e2a31] hover:text-[#f8ee5e] transition-colors"
                  >
                     <FaPencilAlt />
                  </button>
                  <button
                     onClick={() => handleDeleteNote(data._id)}
                     className="bg-[#443345] bg-opacity-60 text-[#f86666] text-lg p-2 rounded-xl mr-2 hover:bg-[#443345] hover:text-[#ad2d2d] transition-colors"
                  >
                     <FaTrashRestore />
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}
