import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type ChangePasswordProps = {
   register: UseFormRegister<{
      password: string;
      confirm_password: string;
      newPassword: string;
   }>;
   errors: FieldErrors<{
      password: string;
      confirm_password: string;
      newPassword: string;
   }>;
   watch: UseFormWatch<{
      password: string;
      confirm_password: string;
      newPassword: string;
   }>;
};

export default function ChangePassword({
   register,
   errors,
   watch,
}: ChangePasswordProps) {
   const newPassword = watch("newPassword");

   return (
      <>
         <div className="mb-5 space-y-3">
            <label className="text-sm font-bold uppercase" htmlFor="password">
               Contraseña actual: (*)
            </label>
            <input
               id="password"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
               ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="password"
               placeholder="Contraseña actual"
               autoComplete="off"
               {...register("password", {
                  required: "La contraseña es obligatoria",
               })}
            />
            {errors.password && (
               <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
         </div>
         <div className="mb-5 space-y-3">
            <label
               className="text-sm font-bold uppercase"
               htmlFor="newPassword"
            >
               Nueva contraseña: (*)
            </label>
            <input
               id="newPassword"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
               ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="password"
               placeholder="Nueva contraseña"
               autoComplete="off"
               {...register("newPassword", {
                  required: "La nueva contraseña es obligatoria",
                  minLength: {
                     value: 8,
                     message: "La contraseña debe tener minimo 8 caracteres",
                  },
               })}
            />
            {errors.newPassword && (
               <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
            )}
         </div>

         <div className="mb-5 space-y-3">
            <label
               className="text-sm font-bold uppercase"
               htmlFor="confirm_password"
            >
               Confirmar contraseña: (*)
            </label>
            <input
               id="confirm_password"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
               ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="password"
               placeholder="Confirmar la contraseña"
               autoComplete="off"
               {...register("confirm_password", {
                  required: "Debe repetir la contraseña",
                  validate: (value) =>
                     value === newPassword || "Las contraseñas no son iguales",
               })}
            />
            {errors.confirm_password && (
               <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
            )}
         </div>
      </>
   );
}
