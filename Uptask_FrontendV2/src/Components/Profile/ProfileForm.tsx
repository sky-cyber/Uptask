import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type ProfileProps = {
   register: UseFormRegister<{
      email: string;
      name: string;
      urlImagen: string;
      _id: string;
   }>;
   errors: FieldErrors<{
      email: string;
      name: string;
      urlImagen: string;
      _id: string;
   }>;
   urlImagen: string;
};

export default function profileForm({
   register,
   errors,
   urlImagen,
}: ProfileProps) {
   return (
      <>
         <div className="flex flex-row justify-center">
            <img src={urlImagen} alt="Usuario" className="w-48 rounded-full" />
         </div>

         <div className="mb-5 space-y-3">
            <label
               className="text-sm font-bold uppercase"
               htmlFor="projectName"
            >
               Nombre: (*)
            </label>
            <input
               id="name"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
                     ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Nombre del Usuario"
               autoComplete="off"
               {...register("name", {
                  required: "El nombre del usuario es obligatorio",
               })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}{" "}
         </div>

         <div className="mb-5 space-y-3">
            <label className="text-sm font-bold uppercase" htmlFor="clientName">
               Email: (*)
            </label>
            <input
               id="email"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
                     ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Correo electronico del usuario"
               autoComplete="off"
               {...register("email", {
                  required: "El correo electronico es obligatorio",
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
         <div className="mb-5 space-y-3">
            <label className="text-sm font-bold uppercase" htmlFor="clientName">
               Url-Imagen:
            </label>
            <input
               id="urlImagen"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
                     ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Url para la foto de perfil"
               autoComplete="off"
               {...register("urlImagen")}
            />
         </div>
      </>
   );
}
