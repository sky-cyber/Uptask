import {
   FaTwitter,
   FaLinkedin,
   FaGithub,
   FaTrashRestore,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { FaHandPointLeft } from "react-icons/fa";
import { ListTeam, Team } from "@/Types/Teams";
import { Project } from "@/Types/Projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteMemeberToProject } from "@/Services/TeamsServices";
import { toast } from "react-toastify";

type TeamListProps = {
   data: ListTeam;
   CanDoneThisFunction: boolean;
   projectID: Project["_id"];
};

export default function TeamList({
   data,
   CanDoneThisFunction,
   projectID,
}: TeamListProps) {
   const queryClient = useQueryClient();
   const mutation = useMutation({
      mutationFn: DeleteMemeberToProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
         queryClient.invalidateQueries({ queryKey: ["TeamList"] });
      },
   });

   const handleDeleteTeam = async (id: Team["_id"]) => {
      const data = { projectID, userID: id };
      await mutation.mutateAsync(data);
   };

   if (data)
      return (
         <>
            <div className="p-5 mt-4">
               <div className="flex flex-col gap-8">
                  <div className="flex justify-center ">
                     <div className="text-center p-8 w-full md:w-6/12 lg:w-4/12 2xl:w-3/12 bg-discord-darker ring-1 ring-gray-500/20 border-b border-black/55 shadow-2xl rounded-lg">
                        <div className="flex flex-row justify-center">
                           <img
                              src="https://randomuser.me/api/portraits/women/3.jpg"
                              alt="Usuario"
                              className="w-28 rounded-full"
                           />
                        </div>
                        <div className="flex flex-row justify-center py-3">
                           <div
                              className="p-2 md:p-1 text-md bg-red-100 border border-red-800 text-red-700 rounded-xl"
                              role="alert"
                           >
                              <span className="block sm:inline">
                                 <strong className="font-bold">Manager</strong>
                              </span>
                           </div>
                        </div>

                        <p className="text-discord-primary font-bold text-xl p-1">
                           Produc Owner
                        </p>
                        <p>
                           Usuario:{" "}
                           <span className="font-semibold text-white">
                              {data.manager.name}
                           </span>
                        </p>
                        <p className="text-gray-400 font-semibold text-xl">
                           {data.manager.email}
                        </p>

                        <div className="flex flex-row justify-center py-3">
                           <div className="flex gap-5 text-xl">
                              <FaTwitter className="hover:text-discord-primary transition-colors" />
                              <FaGithub className="hover:text-discord-primary transition-colors" />
                              <FaLinkedin className="hover:text-discord-primary transition-colors" />
                           </div>
                        </div>
                     </div>
                  </div>

                  {data.teams.length ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-center gap-5">
                        {data.teams.map((item) => (
                           <div className="text-center p-8 w-full bg-discord-darker ring-1 ring-gray-500/20 border-b border-black/55 shadow-2xl rounded-lg">
                              <div className="flex flex-row justify-center">
                                 <img
                                    src="https://randomuser.me/api/portraits/women/3.jpg"
                                    alt="Usuario"
                                    className="w-28 rounded-full"
                                 />
                              </div>
                              <div className="flex flex-row justify-center py-3">
                                 <div
                                    className="p-2 md:p-1 text-md bg-green-100 border border-green-800 text-green-700 rounded-xl"
                                    role="alert"
                                 >
                                    <span className="block sm:inline">
                                       <strong className="font-bold">
                                          Colaborador
                                       </strong>
                                    </span>
                                 </div>
                              </div>

                              <p className="text-discord-primary font-bold text-xl p-1">
                                 Web Developer
                              </p>
                              <p>
                                 Usuario:{" "}
                                 <span className="font-semibold text-white">
                                    {item.name}
                                 </span>
                              </p>
                              <p className="text-gray-400 font-semibold text-xl">
                                 {item.email}
                              </p>

                              <div className="flex flex-row justify-center py-3">
                                 <div className="flex gap-5 text-xl">
                                    <FaTwitter className="hover:text-discord-primary transition-colors" />
                                    <FaGithub className="hover:text-discord-primary transition-colors" />
                                    <FaLinkedin className="hover:text-discord-primary transition-colors" />
                                 </div>
                              </div>
                              {CanDoneThisFunction && (
                                 <div className="mt-4">
                                    <button
                                       onClick={() =>
                                          handleDeleteTeam(item._id)
                                       }
                                       className="bg-red-500 p-2 rounded-xl mr-2 hover:bg-red-800 transition-colors"
                                    >
                                       <FaTrashRestore />
                                    </button>
                                 </div>
                              )}
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="flex flex-row justify-center items-center text-indigo-100 p-5 text-2xl">
                        No tienes colaboradores{" "}
                        <span className="font-bol pl-2">
                           puedes agregar haciendo
                        </span>{" "}
                        <Link
                           className="flex justify-center items-center text-discord-primary hover:text-blue-300 transition-colors"
                           to={location.pathname + `?newMember=true`}
                        >
                           <p className="pl-2">click aquí</p>
                           <FaHandPointLeft className="ml-3" />
                        </Link>
                     </p>
                  )}
               </div>
            </div>
         </>
      );
}
