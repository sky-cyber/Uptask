import ProjectList from "@/Components/Project/ProjectList";
import { getAllProject } from "@/Services/ProjectServices";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function DashBoardView() {
   const { data, isLoading } = useQuery({
      queryKey: ["ListProjects"],
      queryFn: getAllProject,
   });

   if (isLoading) {
      return "Cargando...";
   }

   if (data)
      return (
         <>
            <h1 className="text-5xl font-black ">Mis Proyectos</h1>
            <p className="text-2xl text-discord-primary mt-3">
               Maneja y administra tus proyectos
            </p>

            <Link to={"/create/project"}>
               <button className="bg-discord-primary hover:bg-blue-700 p-5 rounded-lg cursor-pointer font-bold uppercase mt-4">
                  Nuevo proyecto
               </button>
            </Link>

            <ProjectList data={data} />
         </>
      );
}
