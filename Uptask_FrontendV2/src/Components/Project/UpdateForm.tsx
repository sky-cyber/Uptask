import { Project, ProjectFormData } from "@/Types/Projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectForm from "./ProjectForm";
import { updateProject } from "@/Services/ProjectServices";

type UpdateFormProps = {
   data: Project;
   projectID: Project["_id"];
};

export default function UpdateForm({ data, projectID }: UpdateFormProps) {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const initialValue: ProjectFormData = {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ProjectFormData>({ defaultValues: initialValue });

   const mutation = useMutation({
      mutationFn: updateProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         queryClient.invalidateQueries({
            queryKey: ["updateProject", projectID],
         });
         queryClient.invalidateQueries({ queryKey: ["ListProjects"] });
         toast.success(result);
         navigate("/");
      },
   });

   const handleForm = async (formData: ProjectFormData) => {
      const data = { projectID, formData };
      await mutation.mutateAsync(data);
   };

   return (
      <>
         <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black ">Editar proyecto</h1>
            <p className="text-2xl text-discord-primary mt-3">
               Llena el siguiente formulario
            </p>

            <nav className="mt-4">
               <Link to={"/"}>
                  <button className="bg-discord-primary hover:bg-blue-700 p-5 rounded-lg cursor-pointer font-bold uppercase transition-colors">
                     Volver a Proyectos
                  </button>
               </Link>
            </nav>

            <form
               className="mt-10 p-10 border 
                  bg-discord-darker rounded-lg shadow-lg
                  ring-1 ring-gray-500/20 border-b border-black/55"
               onSubmit={handleSubmit(handleForm)}
               noValidate
            >
               <ProjectForm register={register} errors={errors} />

               <input
                  type="submit"
                  value="Guardar cambios"
                  className="bg-discord-primary hover:bg-blue-700 w-full p-3 rounded-lg text-white font-black uppercase cursor-pointer transition-colors"
               />
            </form>
         </div>
      </>
   );
}
