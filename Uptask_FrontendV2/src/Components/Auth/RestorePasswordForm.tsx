import { RestorePasswordTypeForm } from "@/Types/User";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { restoreNewPassword } from "@/Services/AuthServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RestorePasswordForm({ Token }: { Token: string }) {
   const navigate = useNavigate();

   const initialValue: RestorePasswordTypeForm = {
      password: "",
      confirm_password: "",
   };

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<RestorePasswordTypeForm>({
      defaultValues: initialValue,
   });

   const mutation = useMutation({
      mutationFn: restoreNewPassword,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
         navigate("/auth/login");
      },
   });

   const handleRestorePassword = async (formData: RestorePasswordTypeForm) => {
      const data = {
         Token,
         formData,
      };

      await mutation.mutateAsync(data);
   };

   const password = watch("password");

   return (
      <>
         <p className="text-center text-xl mt-2 font-semibold">
            Ingrese las nuevas credenciales{" "}
            <span className="text-fuchsia-500">aquí</span>
         </p>

         <form
            onSubmit={handleSubmit(handleRestorePassword)}
            className="bg-discord-darker space-y-4 mt-4 p-10"
         >
            <div className="flex flex-col gap-4">
               <label className="text-xl font-normal">Password</label>
               <input
                  className="w-full p-2 border border-gray-500 text-gray-700"
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", {
                     required: "Dege agregar una contraseña",
                     minLength: {
                        value: 8,
                        message: "La contraseña debe tener minimo 8 caracteres",
                     },
                  })}
               />

               {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
               )}
            </div>
            <div className="flex flex-col gap-4">
               <label className="text-xl font-normal">Password</label>
               <input
                  className="w-full p-2 border border-gray-500 text-gray-700"
                  placeholder="Repetir contraseña"
                  type="password"
                  id="password_confirmation"
                  {...register("confirm_password", {
                     required: "Debe repetir la contraseña",
                     validate: (value) =>
                        value === password || "Las contraseñas no son iguales",
                  })}
               />
               {errors.confirm_password && (
                  <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
               )}
            </div>
            <input
               type="submit"
               className="w-full p-2 bg-fuchsia-600 hover:bg-fuchsia-800 cursor-pointer font-bold"
               value={"Envíar"}
            />
         </form>
      </>
   );
}
