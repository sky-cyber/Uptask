import ProfileForm from "@/Components/Profile/profileForm";

export default function ProfileView() {
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
            >
               <ProfileForm />

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
