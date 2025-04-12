import { useState } from "react";
import RestorePasswordForm from "../../Components/Auth/RestorePasswordForm";
import RequestCodePassword from "@/Components/Auth/RequestCodePassword";

export default function RestorePassword() {
   const [isToken, setIsToken] = useState(false);
   const [Token, setToken] = useState("");

   return (
      <>
         <h1 className="text-center text-4xl">
            Solicitud de cambio de contraseña
         </h1>
         {isToken ? (
            <RestorePasswordForm Token={Token} />
         ) : (
            <RequestCodePassword
               Token={Token}
               setToken={setToken}
               setIsToken={setIsToken}
            />
         )}
      </>
   );
}
