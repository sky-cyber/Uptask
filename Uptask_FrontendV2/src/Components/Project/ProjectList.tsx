import { Projects } from "@/Types/Projects";

import ProjectCard from "./ProjectCard";
import { H_UserAuth } from "@/Hooks/UseAuth";

type ProjecttemProps = {
   data: Projects[];
};

export default function ProjectList({ data }: ProjecttemProps) {
   const { data: user } = H_UserAuth();

   if (user)
      return (
         <>
            {data.length ? (
               <ul
                  role="list"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10 bg-discord-background"
               >
                  {data.map((project) => (
                     <li
                        key={project._id}
                        className="border 
                  bg-discord-darker p-5 rounded-lg 
                  transition-all duration-300 hover:scale-105 hover:shadow-blue-700
                  ring-1 ring-gray-500/20 border-b border-black/55 shadow-xl"
                     >
                        <ProjectCard project={project} user={user._id} />
                     </li>
                  ))}
               </ul>
            ) : (
               <p>No tiene nada</p>
            )}
         </>
      );
}
