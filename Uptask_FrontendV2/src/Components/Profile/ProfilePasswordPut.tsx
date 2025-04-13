export default function ChangePassword() {
   return (
      <>
         <div className="mb-5 space-y-3">
            <label
               className="text-sm font-bold uppercase"
               htmlFor="projectName"
            >
               Contraseña actual:
            </label>
            <input
               id="password"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
               ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Nombre del Usuario"
               autoComplete="off"
            />
         </div>
         <div className="mb-5 space-y-3">
            <label
               className="text-sm font-bold uppercase"
               htmlFor="projectName"
            >
               Nueva contraseña:
            </label>
            <input
               id="NewPassword"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
               ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Nombre del Usuario"
               autoComplete="off"
            />
         </div>

         <div className="mb-5 space-y-3">
            <label className="text-sm font-bold uppercase" htmlFor="clientName">
               Confirmar contraseña:
            </label>
            <input
               id="password"
               className="w-full p-3 bg-discord-background rounded-lg shadow-lg
               ring-1 ring-gray-500/20 border-b border-black/55 text-white"
               type="text"
               placeholder="Correo electronico del usuario"
               autoComplete="off"
            />
         </div>
      </>
   );
}
