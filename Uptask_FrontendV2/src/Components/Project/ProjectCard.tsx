import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/Services/ProjectServices";
import { toast } from "react-toastify";

import { FaEye, FaPencilAlt, FaTrashRestore } from "react-icons/fa";
import { IsManager } from "@/helpers/IsManager";
import { Projects } from "@/Types/Projects";
import { Profile } from "@/Types/User";
import { useMemo } from "react";

type ProjectCardProps = {
   project: Projects;
   user: Profile["_id"];
};

export default function ProjectCard({ project, user }: ProjectCardProps) {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: deleteProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         queryClient.invalidateQueries({ queryKey: ["ListProjects"] });
         toast.success(result);
      },
   });

   const handleDeleteProject = async (projectID: Projects["_id"]) => {
      await mutation.mutateAsync(projectID);
   };

   const IsValidManager = useMemo(
      () => IsManager(project.manager.toString(), user),
      [project]
   );

   return (
      <div className="flex flex-col">
         <div
            className={`flex w-28 justify-center text-sm border ${
               IsValidManager
                  ? "bg-red-100 border-red-800 text-red-700"
                  : "bg-green-100 border-green-800 text-green-700"
            }  py-1 rounded-xl mb-3`}
            role="alert"
         >
            <span className="block sm:inline">
               <strong className="font-bold">
                  {IsValidManager ? "Manager" : "Colaborador"}
               </strong>
            </span>
         </div>

         <Link
            to={`/projects/${project._id}`}
            className="text-center text-white cursor-pointer hover:underline text-3xl font-bold border-b border-gray-500 pb-3"
         >
            <div className="break-words">{project.projectName} </div>
         </Link>
         <div className="m-5">
            <p className="space-y-2 mt-3 text-gray-200 break-words mb-2 text-xl">
               Cliente: {project.clientName}{" "}
            </p>
            <p className="text-sm text-gray-400 break-words">
               Descripción: {project.description}{" "}
            </p>
         </div>
         <div className="flex justify-center items-center pt-5 mt-3">
            <Link
               to={`/projects/${project._id}`}
               className="bg-blue-500 p-2 rounded-xl mr-2 hover:bg-blue-800 transition-colors"
            >
               <FaEye />
            </Link>
            {IsValidManager && (
               <>
                  <Link
                     to={`projects/${project._id}/edit`}
                     className="bg-amber-500 p-2 rounded-xl mr-2 hover:bg-amber-800 transition-colors"
                  >
                     <FaPencilAlt />
                  </Link>
                  <button
                     onClick={() => handleDeleteProject(project._id)}
                     className="bg-red-500 p-2 rounded-xl mr-2 hover:bg-red-800 transition-colors"
                  >
                     <FaTrashRestore />
                  </button>
               </>
            )}
         </div>
      </div>
   );
}
