import ErrorMessage from "@/Components/ErrorMessage";
import { forgotPassword } from "@/Services/AuthServices";
import { ForgotPasswordForm } from "@/Types/User";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<ForgotPasswordForm>({ defaultValues: { email: "" } });

   const mutation = useMutation({
      mutationFn: forgotPassword,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
         reset();
      },
   });

   const handleForgotPassword = async (formData: ForgotPasswordForm) => {
      await mutation.mutateAsync(formData);
   };

   return (
      <>
         <h1 className="text-center text-5xl font-normal">
            Restablece tu contraseña
         </h1>
         <form
            className="bg-discord-darker p-10 mt-5"
            onSubmit={handleSubmit(handleForgotPassword)}
         >
            <div className="flex flex-col gap-3">
               <label className="font-normal text-2xl">Email:</label>
               <input
                  className="w-full p-2 border border-gray-300 text-gray-700"
                  type="email"
                  {...register("email", {
                     required: "El Email de registro es obligatorio",
                     pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                     },
                  })}
               />
            </div>
            {errors.email && (
               <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            <input
               className="w-full bg-fuchsia-600 hover:bg-fuchsia-800 transition-colors cursor-pointer font- text-xl font-semibold p-3 mt-3"
               value="Enviar"
               type="submit"
            />
         </form>

         <nav className="flex flex-col gap-2 mt-5 text-center">
            <Link
               to={"/auth/login"}
               className="font-normal text-gray-300 hover:text-gray-100"
            >
               ¿Ya tienes cuenta? Inicia sessión
            </Link>
            <Link
               to={"/auth/create-user"}
               className="font-normal text-gray-300 hover:text-gray-100"
            >
               ¿No tienes cuenta? Registrate aquí
            </Link>
         </nav>
      </>
   );
}
