import {
   createNoteFromTask,
   deleteNoteFromTask,
   getNoteDetailsFromTask,
   getNotesFromTask,
   updateNoteFromTask,
} from "@/Services/NoteServices";
import { Content, Note } from "@/Types/Notes";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

type h_Params = {
   reset: UseFormReset<Content>;
   queryClient: QueryClient;
   noteID: Note["_id"];
   handleActiveTextArea: () => void;
};

export const H_NoteList = (projectID: string, taskID: string) => {
   const { data, isError, isLoading } = useQuery({
      queryKey: ["NoteList"],
      queryFn: () => getNotesFromTask({ projectID, taskID }),
      retry: false,
      refetchOnWindowFocus: false,
   });

   return { data, isError, isLoading };
};

export const H_NoteDetails = (
   projectID: string,
   taskID: string,
   noteID: string
) => {
   const { data, isError, isLoading } = useQuery({
      queryKey: ["NoteDetails", noteID],
      queryFn: () => getNoteDetailsFromTask({ projectID, taskID, noteID }),
      retry: false,
      refetchOnWindowFocus: false,
   });

   return { data, isError, isLoading };
};

export const H_NoteCreate = ({
   reset,
   queryClient,
}: Pick<h_Params, "reset" | "queryClient">) => {
   return useMutation({
      mutationFn: createNoteFromTask,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         queryClient.invalidateQueries({
            queryKey: ["NoteList"],
         });
         toast.success(result);
         reset();
      },
   });
};

export const H_NoteDelete = ({
   queryClient,
}: Pick<h_Params, "queryClient">) => {
   return useMutation({
      mutationFn: deleteNoteFromTask,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         queryClient.invalidateQueries({
            queryKey: ["NoteList"],
         });
         toast.success(result);
      },
   });
};

export const H_NoteUpdate = ({
   queryClient,
}: Pick<h_Params, "queryClient">) => {
   return useMutation({
      mutationFn: updateNoteFromTask,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result, dt) => {
         queryClient.refetchQueries({
            queryKey: ["NoteDetails", dt.noteID],
         });
         queryClient.invalidateQueries({
            queryKey: ["NoteList"],
         });
         toast.success(result);
      },
   });
};
