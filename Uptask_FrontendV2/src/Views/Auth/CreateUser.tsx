import ErrorMessage from "@/Components/ErrorMessage";
import { RegisterUser } from "@/Services/AuthServices";
import { UserRegristerForm } from "@/Types/User";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateUser() {
   const initialValue: UserRegristerForm = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
   };

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<UserRegristerForm>({ defaultValues: initialValue });

   const mutation = useMutation({
      mutationFn: RegisterUser,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
      },
   });

   const handleRegisterForm = async (formData: UserRegristerForm) => {
      await mutation.mutateAsync(formData);
   };

   const password = watch("password");

   return (
      <>
         <h1 className="text-center text-4xl font-semibold">
            Registro de Usuarios
         </h1>
         <p className="text-xl mt-2">
            Llena el siguiente formulario para{" "}
            <span className="text-fuchsia-500">crear tu cuenta</span>
         </p>
         <form
            onSubmit={handleSubmit(handleRegisterForm)}
            className="bg-discord-darker space-y-4 p-10 mt-4"
         >
            <div className="flex flex-col gap-1">
               <label className="text-xl font-normal">Email</label>
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
               {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
               )}
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-xl font-normal">Nombre</label>
               <input
                  className="w-full p-2 border border-gray-500 text-gray-700"
                  type="text"
                  placeholder="Nombre de usuario"
                  {...register("name", {
                     required: "El nombre no puede ir vacío",
                  })}
               />
               {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
               )}
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-xl font-normal">Contraseña</label>
               <input
                  className="w-full p-2 border border-gray-500 text-gray-700"
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", {
                     required: "Debe agregar una contraseña",
                     minLength: {
                        value: 8,
                        message:
                           "La contraseña es muy corta, minimo 8 caracteres",
                     },
                  })}
               />
               {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
               )}
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-xl font-normal">Repetir contraseña</label>
               <input
                  className="w-full p-2 border border-gray-500 text-gray-700"
                  id="password_confirmation"
                  type="password"
                  placeholder="Repetir contraseña"
                  {...register("confirm_password", {
                     required: "Debe repetir la contraseñas",
                     validate: (value) =>
                        value === password || "Los Passwords no son iguales",
                  })}
               />
               {errors.confirm_password && (
                  <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
               )}
            </div>
            <input
               className="w-full bg-fuchsia-600 hover:bg-fuchsia-800 transition-colors cursor-pointer p-3 font-bold"
               type="submit"
               value="Registrarme"
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
               to={"/auth/forgot-password"}
               className="font-normal text-gray-300 hover:text-gray-100"
            >
               ¿Has olvidado tu contraseña? Restablecela aquí
            </Link>
         </nav>
      </>
   );
}
