export default function profileForm() {
   return (
      <>
         <div className="flex flex-row justify-center">
            <img
               src="https://randomuser.me/api/portraits/women/10.jpg"
               alt="Usuario"
               className="w-48 rounded-full"
            />
         </div>

         <div className="mb-5 space-y-3">
            <label
               className="text-sm font-bold uppercase"
               htmlFor="projectName"
            >
               Nombre:
            </label>
            <input
               id="UserName"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
                     ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Nombre del Usuario"
               autoComplete="off"
            />
         </div>

         <div className="mb-5 space-y-3">
            <label className="text-sm font-bold uppercase" htmlFor="clientName">
               Email:
            </label>
            <input
               id="UserEmail"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
                     ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Correo electronico del usuario"
               autoComplete="off"
            />
         </div>
         <div className="mb-5 space-y-3">
            <label className="text-sm font-bold uppercase" htmlFor="clientName">
               Url-Imagen:
            </label>
            <input
               id="UrlImagen"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
                     ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Url para la foto de perfil"
               autoComplete="off"
            />
         </div>
      </>
   );
}
