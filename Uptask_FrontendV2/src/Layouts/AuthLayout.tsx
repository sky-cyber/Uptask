import Logo from "@/Components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
   return (
      <>
         <div className="bg-discord-background min-h-screen">
            <div className="py-10 lg:py-20 mx-auto w-[450px]">
               <Logo />
               <div className="mt-10">
                  <Outlet />
               </div>
            </div>
         </div>

         <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
      </>
   );
}
