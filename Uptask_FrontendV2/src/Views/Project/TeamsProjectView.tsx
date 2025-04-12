import { TbLogout2 } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import TeamRegisterModal from "@/Components/Teams/TeamRegisterModal";
import TeamList from "@/Components/Teams/TeamList";
import { GetAllMemberToProject } from "@/Services/TeamsServices";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { IsManager } from "@/helpers/IsManager";
import { H_UserAuth } from "@/Hooks/UseAuth";

export default function TeamsProjectView() {
   const { data: user } = H_UserAuth();

   const params = useParams();
   const projectID = params.projectID!;

   const { data, isLoading } = useQuery({
      queryKey: ["TeamList"],
      queryFn: () => GetAllMemberToProject({ projectID }),
   });

   const CanDoneThisFunction = useMemo(
      () => IsManager(data?.manager._id, user?._id),
      [data, user]
   );

   if (isLoading) {
      return "Cargando...";
   }

   if (data && user)
      return (
         <>
            <Link
               to={`/projects/${projectID}`}
               className="text-2xl flex gap-3 items-center hover:text-fuchsia-600 transition-colors mb-5"
            >
               <TbLogout2 />
               <span className="font-medium">Volver</span>
            </Link>

            <div className="block md:flex justify-between items-center">
               <h1 className="text-5xl font-bold">Colaboradores</h1>

               {CanDoneThisFunction && (
                  <Link to={location.pathname + `?newMember=true`} className="">
                     <button className="flex items-center gap-2 bg-discord-primary rounded-lg p-3 mt-5 md:mt-3 font-bold hover:bg-blue-600 transition-colors">
                        <FaUsers className="text-xl" />
                        <span className="font-bold">Agregar colaborador</span>
                     </button>
                  </Link>
               )}
            </div>

            <p className="text-gray-300 mt-3 text-xl">
               Los miembros que participan en el proyecto
            </p>

            <TeamList
               data={data}
               CanDoneThisFunction={CanDoneThisFunction}
               projectID={projectID}
            />
            <TeamRegisterModal />
         </>
      );
}
