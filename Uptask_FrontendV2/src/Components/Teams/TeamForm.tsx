import { UserEmailForm } from "@/Types/User";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/Components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { FindMemberToProject } from "@/Services/TeamsServices";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import TeamSearch from "./TeamSearch";

export default function TeamForm() {
   const queryParams = useParams();
   const projectID = queryParams.projectID!;

   const initialValue: UserEmailForm = {
      email: "",
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValue });

   const mutation = useMutation({
      mutationFn: FindMemberToProject,
      onError: (error) => {
         toast.error(error.message);
      },
   });

   const handleRegisterForm = async (formData: UserEmailForm) => {
      const data = { projectID, formData };
      await mutation.mutateAsync(data);
   };

   return (
      <div>
         <h1 className="font-bold text-2xl">Agregar Colaborador</h1>
         <p className="text-gray-300 mt-3 text-xl">Ingrese Email</p>

         <form
            onSubmit={handleSubmit(handleRegisterForm)}
            className="bg-discord-dark space-y-4 p-10 mt-1"
         >
            <div className="flex flex-col gap-3">
               <label className="text-xl font-normal">Email</label>

               <div className="block md:flex justify-between items-center gap-6">
                  <input
                     className="w-full p-2 border border-gray-500 text-gray-700"
                     type="email"
                     placeholder="Correo electronico"
                     {...register("email", {
                        required: "El Email de registro es obligatorio",
                        pattern: {
                           value: /\S+@\S+\.\S+/,
                           message: "E-mail no válido",
                        },
                     })}
                  />
                  <input
                     className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors cursor-pointer p-2 font-bold rounded-lg w-full md:w-24 mt-3 md:mt-0"
                     type="submit"
                     value="Buscar"
                  />
               </div>

               {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
               )}
            </div>
            {mutation.isPending && (
               <p className="text-center p-2">Cargando....</p>
            )}
            {mutation.data && (
               <TeamSearch user={mutation.data} projectID={projectID} />
            )}
         </form>
      </div>
   );
}
