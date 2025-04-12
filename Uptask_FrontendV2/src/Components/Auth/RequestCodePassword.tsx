import { requestCodePassword } from "@/Services/AuthServices";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type RequestCodePasswordProps = {
   Token: string;
   setToken: React.Dispatch<React.SetStateAction<string>>;
   setIsToken: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RequestCodePassword({
   Token,
   setToken,
   setIsToken,
}: RequestCodePasswordProps) {
   const handleChangePing = (token: string) => {
      setToken(token);
   };

   const mutation = useMutation({
      mutationFn: requestCodePassword,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         toast.success(result);
         setIsToken(true);
      },
   });

   const handleCompletePing = async (token: string) => {
      await mutation.mutateAsync(token);
   };

   return (
      <>
         <p className="text-center text-xl mt-3 font-semibold">
            Ingrese el código de 6 digitos para activar formulario para
            restablecer{" "}
            <span className="text-fuchsia-500">sus credenciales</span>
         </p>
         <form className="bg-discord-darker text-gray-700 p-8 mt-4 space-y-4">
            <label className="text-center text-gray-200 text-2xl font-medium block">
               Código de 6 digitos
            </label>
            <div className="flex justify-between gap-5">
               <PinInput
                  value={Token}
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
               to={"/auth/forgot-password"}
               className="font-normal text-gray-300 hover:text-gray-100"
            >
               Restablecer la contraseña
            </Link>
         </nav>
      </>
   );
}
