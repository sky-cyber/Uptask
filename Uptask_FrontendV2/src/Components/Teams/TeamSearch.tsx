import { SaveMemberToProject } from "@/Services/TeamsServices";
import { Project } from "@/Types/Projects";
import { Team } from "@/Types/Teams";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type TeamSearchProps = {
   user: Team;
   projectID: Project["_id"];
};

export default function TeamSearch({ user, projectID }: TeamSearchProps) {
   const navigate = useNavigate();

   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: SaveMemberToProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
         navigate(location.pathname, { replace: true });
         queryClient.invalidateQueries({ queryKey: ["TeamList"] });
      },
   });

   const handleRegisterTeam = async (id: Team["_id"]) => {
      const data = { projectID, userID: id };
      await mutation.mutateAsync(data);
   };

   return (
      <div className="bg-discord-dark p-10 mt-4">
         <div className="p-2 text-center font-bold text-2xl border-b border-gray-400">
            Resultado
         </div>

         <div className="flex py-5 md:mt-5 md:p-0 justify-center items-center border-b md:border-none border-gray-700">
            <img
               src="https://randomuser.me/api/portraits/women/3.jpg"
               alt="Usuario"
               className="w-24 md:h-24 rounded-full mr-3 md:mr-1"
            />
         </div>

         <div className="mt-5">
            <p className="text-xl">
               Usuario: <span className="font-bold">{user.name}</span>
            </p>
            <div className="block md:flex md:justify-between md:items-center">
               <p className="text-xl">
                  Correo: <span className="font-bold">{user.email}</span>
               </p>
               <button
                  onClick={() => handleRegisterTeam(user._id)}
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors mt-2 p-2 font-bold w-full md:w-24 rounded-lg"
               >
                  Agregar
               </button>
            </div>
         </div>
      </div>
   );
}
