import ErrorMessage from "@/Components/ErrorMessage";
import { authLogin } from "@/Services/AuthServices";
import { UserLoginForm } from "@/Types/User";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
   const navigation = useNavigate();
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<UserLoginForm>({
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const mutation = useMutation({
      mutationFn: authLogin,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: () => {
         reset();
         navigation("/");
      },
   });

   const handleLogin = async (formData: UserLoginForm) => {
      await mutation.mutateAsync(formData);
   };

   return (
      <>
         <h1 className="text-5xl font-bold text-center mb-4">Iniciar Sesión</h1>
         <p className="text-center text-2xl mb-3">
            Comienza a planificar y admnistrar tus{" "}
            <span className="text-fuchsia-500 font-bold">Proyectos</span>
         </p>

         <form
            onSubmit={handleSubmit(handleLogin)}
            className="bg-discord-darker space-y-5 p-10"
         >
            <div className="flex flex-col gap-3">
               <label className="font-normal text-2xl">Email</label>
               <input
                  className="w-full p-3 border border-gray-500 text-gray-700"
                  placeholder="Correo electronico"
                  type="email"
                  id="email"
                  {...register("email", {
                     required: "Debe ingresar el email que registó",
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
            <div className="flex flex-col gap-3">
               <label className="font-normal text-2xl">Contraseña</label>
               <input
                  className="w-full p-3 border border-gray-500 text-gray-700"
                  placeholder="Contraseña de usuario"
                  type="password"
                  id="password"
                  {...register("password", {
                     required: "La contraseña es requerida",
                  })}
               />
               {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
               )}
            </div>

            <input
               className="w-full text-xl bg-fuchsia-600 hover:bg-fuchsia-800 transition-colors cursor-pointer p-2 font-bold"
               type="submit"
               value="Login"
            />
         </form>

         <nav className="flex flex-col gap-2 mt-5 text-center">
            <Link
               to={"/auth/create-user"}
               className="font-normal text-gray-300 hover:text-gray-100"
            >
               ¿No tienes cuenta? Registrate aquí
            </Link>
            <Link
               to={"/auth/forgot-password"}
               className="font-normal text-gray-300 hover:text-gray-100"
            >
               ¿Has olvidado tu contraseña? Restablecela aquí
            </Link>
         </nav>
      </>
   );
}
