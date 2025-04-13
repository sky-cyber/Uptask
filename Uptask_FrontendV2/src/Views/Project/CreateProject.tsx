import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ProjectForm from "@/Components/Project/ProjectForm";

import { useMutation } from "@tanstack/react-query";
import { RegisterProject } from "@/Services/ProjectServices";

import { toast } from "react-toastify";
import { ProjectFormData } from "@/Types/Projects";

export default function CreateProject() {
   const navigate = useNavigate();

   const initialValue: ProjectFormData = {
      projectName: "",
      clientName: "",
      description: "",
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ProjectFormData>({ defaultValues: initialValue });

   const mutation = useMutation({
      mutationFn: RegisterProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
         navigate("/");
      },
   });

   const handleForm = async (formData: ProjectFormData) => {
      await mutation.mutateAsync(formData);
   };

   return (
      <>
         <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black ">Crear proyectos</h1>
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
               className="mt-10 border 
                  bg-discord-darker p-5 rounded-lg shadow-lg
                  ring-1 ring-gray-500/20 border-b border-black/55"
               onSubmit={handleSubmit(handleForm)}
               noValidate
            >
               <ProjectForm register={register} errors={errors} />

               <input
                  type="submit"
                  value="Crear proyecto"
                  className="bg-discord-primary hover:bg-blue-700 w-full p-3 rounded-lg text-white font-black uppercase cursor-pointer transition-colors"
               />
            </form>
         </div>
      </>
   );
}
