import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { FaUserPen } from "react-icons/fa6";
import { IoFingerPrint } from "react-icons/io5";

export default function ProfileLayaout() {
   const [openTab, setOpenTab] = useState(1);

   const activeClasses = "border-l border-t border-r rounded-t text-blue-200";
   const inactiveClasses = "text-discord-primary hover:text-blue-700";

   return (
      <div>
         <div className="p-6">
            <ul className="flex border-b">
               <Link
                  to="/profile/view"
                  onClick={() => setOpenTab(1)}
                  className={`mr-1 ${openTab === 1 ? "-mb-px" : ""}`}
               >
                  <button
                     className={`bg-discord-background inline-block py-2 px-4 font-semibold ${
                        openTab === 1 ? activeClasses : inactiveClasses
                     }`}
                  >
                     <div className="text-xl flex items-center gap-2">
                        <FaUserPen />
                        Perfil
                     </div>
                  </button>
               </Link>
               <Link
                  to="/profile/change-password"
                  onClick={() => setOpenTab(2)}
                  className={`mr-1 ${openTab === 2 ? "-mb-px" : ""}`}
               >
                  <button
                     className={`bg-discord-background inline-block py-2 px-4 font-semibold ${
                        openTab === 2 ? activeClasses : inactiveClasses
                     }`}
                  >
                     <div className="text-xl flex items-center gap-2">
                        <IoFingerPrint />
                        <p>Password</p>
                     </div>
                  </button>
               </Link>
            </ul>

            <div className="w-full mt-4">
               <Outlet />
            </div>
         </div>
      </div>
   );
}
