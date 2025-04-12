import UpdateForm from "@/Components/Project/UpdateForm";
import { getProjectById } from "@/Services/ProjectServices";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateProject() {
   const queryParams = useParams();
   const projectID = queryParams.projectID!;

   const navigate = useNavigate();
   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["updateProject", projectID],
      queryFn: () => getProjectById(projectID),
      retry: false,
   });

   useEffect(() => {
      if (isError) {
         toast.error(error.message, { toastId: "error" });
         navigate(`/`);
      }
   }, [isError, error]);

   if (isLoading) {
      return "Cargando...";
   }

   if (data) return <UpdateForm data={data} projectID={projectID} />;
}
