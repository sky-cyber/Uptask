import { Outlet, Link, useNavigate } from "react-router-dom";
import Logo from "@/Components/Logo";
import NavMenu from "@/Components/NavMenu";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { H_UserAuth } from "@/Hooks/UseAuth";

export default function AppLayout() {
   const navigate = useNavigate();

   const { data, isError, isLoading } = H_UserAuth();

   if (isLoading) return "Cargando...";

   if (isError) navigate("auth/login");

   if (data)
      return (
         <>
            <header className="bg-discord-darker py-5">
               <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center ">
                  <div className="w-64">
                     <Link to={"/"}>
                        <Logo />
                     </Link>
                  </div>
                  <NavMenu user={data} />
               </div>
            </header>

            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
               <Outlet />
            </section>

            <footer className="p-5">
               <p className="text-center">
                  Todo los derechos reservados {new Date().getFullYear()}
               </p>
            </footer>

            <ToastContainer />
         </>
      );
}
