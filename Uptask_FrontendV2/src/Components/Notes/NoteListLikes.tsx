import { H_NoteLikesMember } from "@/Hooks/Note";
import { Note } from "@/Types/Notes";
import { Project } from "@/Types/Projects";
import { Task } from "@/Types/Task";

type NoteListLikesProps = {
   projectID: Project["_id"];
   taskID: Task["_id"];
   noteID: Note["_id"];
};

export default function NoteListLikes({
   projectID,
   taskID,
   noteID,
}: NoteListLikesProps) {
   console.log(noteID);

   const { data, isLoading } = H_NoteLikesMember({ projectID, taskID, noteID });

   if (isLoading) {
      return <div>Cargando....</div>;
   }

   if (data)
      return (
         <>
            <div className="bg-discord-background rounded-xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300 hover:shadow-3xl animate-fade-in">
               {data.length ? (
                  <>
                     <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Reaciones</h2>
                        <div className="space-y-2">
                           {data.map((item) => (
                              <div
                                 key={item._id}
                                 className="flex items-center space-x-4 p-2 bg-discord-darker rounded-lg transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-gray-600"
                              >
                                 <img
                                    src={item.urlImagen}
                                    alt="Sarah Johnson"
                                    className="w-12 h-12 rounded-full border-2 border-indigo-800 dark:border-blue-900"
                                 />
                                 <div>
                                    <h3 className="text-lg font-semibold text-indigo-800 dark:text-white">
                                       {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                       {item.email}
                                    </p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="px-6 py-4 bg-discord-darker flex justify-between items-center">
                        <span className="text-sm text-indigo-800 dark:text-gray-300">
                           {data.length} miembros
                        </span>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                           No hay Reaciones
                        </h2>
                        <div className="space-y-2">
                           <div className="flex items-center space-x-4 p-2 bg-discord-darker rounded-lg transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-gray-600"></div>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </>
      );
}
