import ErrorMessage from "@/Components/ErrorMessage";
import { sendNewToken } from "@/Services/AuthServices";
import { NewTokenForm } from "@/Types/User";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewCodeToken() {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<NewTokenForm>({
      defaultValues: {
         email: "",
      },
   });

   const mutation = useMutation({
      mutationFn: sendNewToken,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
         reset();
      },
   });

   const handleNewToken = async (formData: NewTokenForm) => {
      await mutation.mutateAsync(formData);
   };

   return (
      <div>
         <h1 className="text-3xl text-center">
            Solicita un nuevo Token de confirmación
         </h1>
         <p className="text-xl text-center mt-2">
            Agrege su email{" "}
            <span className="text-fuchsia-500">
               para recibir el nuevo código
            </span>
         </p>
         <form
            onSubmit={handleSubmit(handleNewToken)}
            className="bg-discord-darker space-y-4 p-10 mt-4"
         >
            <div className="flex flex-col gap-3">
               <label className="text-xl">Email</label>
               <input
                  className="w-full p-3 border border-gray-500 text-gray-700"
                  placeholder="Email de registro"
                  type="email"
                  {...register("email", {
                     required: "El Email de registro es obligatorio",
                     pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                     },
                  })}
               />
               {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
               )}
            </div>
            <input
               className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors cursor-pointer p-3 font-bold text-xl"
               type="submit"
               value="Envíar"
            />
         </form>

         <nav className="mt-5 text-center">
            <Link
               to={"/auth/login"}
               className="font-normal text-gray-300 hover:text-gray-100"
            >
               ¿Ya tienes cuenta? Inicia sessión
            </Link>
         </nav>
      </div>
   );
}
