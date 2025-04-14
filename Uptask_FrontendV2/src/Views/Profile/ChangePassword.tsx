import ProfilePasswordPut from "@/Components/Profile/ProfilePasswordPut";
import { updatePasswordProfile } from "@/Services/AuthServices";
import { PutPasswordUser } from "@/Types/User";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ChangePassword() {
   const initialValue: PutPasswordUser = {
      password: "",
      newPassword: "",
      confirm_password: "",
   };

   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
   } = useForm<PutPasswordUser>({ defaultValues: initialValue });

   const mutation = useMutation({
      mutationFn: updatePasswordProfile,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
         reset();
      },
   });

   const handlePutPassword = async (formData: PutPasswordUser) => {
      await mutation.mutateAsync(formData);
   };

   return (
      <>
         <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black ">Chambio de contraseñas</h1>
            <p className="text-2xl text-discord-primary mt-3">
               Aquí verá la información de sus credenciales
            </p>

            <form
               className="mt-10 border 
                        bg-discord-darker p-5 rounded-lg shadow-lg
                        ring-1 ring-gray-500/20 border-b border-black/55"
               noValidate
               onSubmit={handleSubmit(handlePutPassword)}
            >
               <ProfilePasswordPut
                  register={register}
                  errors={errors}
                  watch={watch}
               />

               <input
                  type="submit"
                  value="Guardar cambios"
                  className="bg-pink-500 hover:bg-pink-600 w-full p-3 rounded-lg text-white font-black uppercase cursor-pointer transition-colors"
               />
            </form>
         </div>
      </>
   );
}
