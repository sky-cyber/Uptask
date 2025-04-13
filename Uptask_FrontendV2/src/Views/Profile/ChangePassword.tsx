import ProfilePasswordPut from "@/Components/Profile/ProfilePasswordPut";

export default function ChangePassword() {
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
            >
               <ProfilePasswordPut />

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
