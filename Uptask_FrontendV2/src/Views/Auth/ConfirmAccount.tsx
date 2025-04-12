import { ConfirmAccountUser } from "@/Services/AuthServices";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ConfirmAccount() {
   const [token, setToken] = useState("");

   const mutation = useMutation({
      mutationFn: ConfirmAccountUser,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
      },
   });

   const handleChangePing = (token: string) => {
      setToken(token);
   };

   const handleCompletePing = async (token: string) => {
      await mutation.mutateAsync(token);
   };

   return (
      <>
         <h1 className="text-center text-4xl font-bold">Confirmar tu cuenta</h1>
         <p className="text-center text-gray-300 text-xl mt-3">
            Ingresa el código que recibiste{" "}
            <span className="text-fuchsia-500 font-semibold">por e-mail</span>
         </p>

         <form className="bg-discord-darker text-gray-700 p-8 mt-4 space-y-4">
            <label className="text-center text-gray-200 text-2xl font-medium block">
               Código de 6 digitos
            </label>
            <div className="flex justify-between gap-5">
               <PinInput
                  value={token}
                  onChange={handleChangePing}
                  onComplete={handleCompletePing}
               >
                  <PinInputField className="h-10 w-10 rounded-lg p-3 border border-gray-300 placeholder:text-white"></PinInputField>
                  <PinInputField className="h-10 w-10 rounded-lg p-3 border border-gray-300 placeholder:text-white"></PinInputField>
                  <PinInputField className="h-10 w-10 rounded-lg p-3 border border-gray-300 placeholder:text-white"></PinInputField>
                  <PinInputField className="h-10 w-10 rounded-lg p-3 border border-gray-300 placeholder:text-white"></PinInputField>
                  <PinInputField className="h-10 w-10 rounded-lg p-3 border border-gray-300 placeholder:text-white"></PinInputField>
                  <PinInputField className="h-10 w-10 rounded-lg p-3 border border-gray-300 placeholder:text-white"></PinInputField>
               </PinInput>
            </div>
         </form>

         <nav className="mt-4 text-center">
            <Link
               to={"/auth/new-token"}
               className="font-normal text-gray-300 hover:text-gray-100"
            >
               Solitar nuevo coódigo
            </Link>
         </nav>
      </>
   );
}
