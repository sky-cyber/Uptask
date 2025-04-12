import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import TeamForm from "./TeamForm";

export default function TeamRegisterModal() {
   const navigate = useNavigate();
   const queryParams = new URLSearchParams(location.search);
   const showModal = queryParams.get("newMember")!;

   return (
      <>
         <Transition appear show={showModal ? true : false} as={Fragment}>
            <Dialog
               as="div"
               className="relative z-10"
               onClose={() => navigate(location.pathname, { replace: true })}
            >
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black/60" />
               </Transition.Child>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                     >
                        <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-discord-darker text-left align-middle shadow-xl transition-all p-16">
                           <Dialog.Title
                              as="h3"
                              className="font-black text-4xl text-slate-200 my-5"
                           ></Dialog.Title>
                           <TeamForm />
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
}
