import ProfileForm from "@/Components/Profile/ProfileForm";
import { H_UserAuth } from "@/Hooks/UseAuth";
import { updateProfile } from "@/Services/AuthServices";
import { Profile } from "@/Types/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProfileView() {
   const { data, isLoading, isError } = H_UserAuth();

   const initialValue: Profile = {
      _id: data?._id!,
      name: data?.name!,
      email: data?.email!,
      urlImagen: data?.urlImagen!,
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Profile>({ defaultValues: initialValue });

   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: updateProfile,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
         queryClient.invalidateQueries({
            queryKey: ["user"],
         });
      },
   });

   const handleUpdateProfile = async (formData: Profile) => {
      await mutation.mutateAsync(formData);
   };

   if (isError) {
      return <Navigate to={"/auth/login"} replace></Navigate>;
   }

   if (isLoading) {
      return <div>Cargando....</div>;
   }

   if (data)
      return (
         <>
            <div className="max-w-3xl mx-auto">
               <h1 className="text-5xl font-black ">Perfil de usuario</h1>
               <p className="text-2xl text-discord-primary mt-3">
                  Aquí verá la información de su perfil
               </p>

               <form
                  className="mt-10 border 
                     bg-discord-darker p-5 rounded-lg shadow-lg
                     ring-1 ring-gray-500/20 border-b border-black/55"
                  noValidate
                  onSubmit={handleSubmit(handleUpdateProfile)}
               >
                  <ProfileForm
                     register={register}
                     errors={errors}
                     urlImagen={data.urlImagen}
                  />

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
