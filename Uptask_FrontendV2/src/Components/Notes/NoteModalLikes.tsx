import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import NoteListLikes from "./NoteListLikes";

export default function NoteModalLikes() {
   const navigate = useNavigate();
   const paramsURL = useParams();
   const queryParams = new URLSearchParams(location.search);
   const projectID = paramsURL.projectID!;
   const taskID = queryParams.get("viewTask")!;
   const noteID = queryParams.get("viewLikes")!;
   const show = noteID ? true : false;

   return (
      <>
         <Transition appear show={show} as={Fragment}>
            <Dialog
               as="div"
               className="relative z-10"
               onClose={() => {
                  navigate(location.pathname + `?viewTask=${taskID}`, {
                     replace: true,
                  });
               }}
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
                        <Dialog.Panel className="w-full max-w-xl transform rounded-2xl text-left shadow-xl">
                           <NoteListLikes
                              projectID={projectID}
                              taskID={taskID}
                              noteID={noteID}
                           />
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
}
