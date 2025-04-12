import { Profile } from "@/Types/User";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome, FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";

type NavMenuProps = {
   user: Profile;
};

export default function NavMenu({ user }: NavMenuProps) {
   const [isOpen, setIsOpen] = useState(false);

   const queryClient = useQueryClient();

   const handleLoggout = () => {
      localStorage.removeItem("AUTH_TOKEN");
      queryClient.invalidateQueries({ queryKey: ["user"] });
   };

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div>
         {/* Botón Hamburguesa */}
         <button
            className="md:hidden text-3xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
         >
            {isOpen ? <HiX /> : <HiMenu />}
         </button>
         {/* Menú */}
         <ul
            className={`fixed top-0 right-0 h-full w-64 bg-discord-background transform ${
               isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out z-20 md:static md:flex justify-center items-center md:space-x-2 md:bg-transparent md:h-auto md:w-auto md:translate-x-0`}
         >
            <li className="border-b border-gray-700 md:border-none">
               <Link
                  to="/"
                  className="flex items-center justify-center py-4 px-6 hover:text-discord-primary rounded md:rounded-none"
               >
                  <FaHome />
                  <span className="pl-2">Home</span>
               </Link>
            </li>
            <li className="border-b border-gray-700 md:border-none">
               <Link
                  to="/perfil"
                  className="flex items-center justify-center py-4 px-6 hover:text-discord-primary rounded md:rounded-none"
               >
                  <FaUser />
                  <span className="pl-2">Perfil</span>
               </Link>
            </li>
            <li className="flex py-5 md:p-0 justify-center items-center border-b border-gray-700 md:border-none">
               <img
                  src="https://randomuser.me/api/portraits/women/3.jpg"
                  alt="Usuario"
                  className="w-16 h-16 md:w-10 md:h-10 rounded-full mr-3 md:mr-1"
               />
               <span className="text-white hover:text-discord-primary  text-xl md:text-sm m-1 font-semibold">
                  {user.name}
               </span>
            </li>
            <li className="border-none border-gray-700 md:border-none">
               <button
                  onClick={handleLoggout}
                  className="w-full flex items-center justify-center py-4 px-6 hover:text-discord-primary rounded md:rounded-none"
               >
                  <TbLogout2 />
                  <span className="pl-2">Logout</span>
               </button>
            </li>
         </ul>

         {/* Fondo oscuro al abrir el menú en móvil */}
         {isOpen && (
            <div
               className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
               onClick={toggleMenu}
            ></div>
         )}
      </div>
   );
}
