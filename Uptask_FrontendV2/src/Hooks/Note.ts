import {
   addLikeMember,
   createNoteFromTask,
   deleteNoteFromTask,
   getListLikeMember,
   getNoteDetailsFromTask,
   getNotesFromTask,
   updateNoteFromTask,
} from "@/Services/NoteServices";
import { Content, Note } from "@/Types/Notes";
import { Project } from "@/Types/Projects";
import { Task } from "@/Types/Task";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

type h_Params = {
   reset: UseFormReset<Content>;
   queryClient: QueryClient;
   noteID: Note["_id"];
   handleActiveTextArea: () => void;
   taskID: Task["_id"];
   projectID: Project["_id"];
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
   taskID,
}: Pick<h_Params, "reset" | "queryClient" | "taskID">) => {
   return useMutation({
      mutationFn: createNoteFromTask,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (result) => {
         queryClient.invalidateQueries({
            queryKey: ["NoteList"],
         });
         queryClient.refetchQueries({
            queryKey: ["cantRegister", taskID],
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

export const H_NoteAddLikeMember = ({
   queryClient,
}: Pick<h_Params, "queryClient">) => {
   return useMutation({
      mutationFn: addLikeMember,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["NoteList"],
         });
      },
   });
};

export const H_NoteLikesMember = ({
   projectID,
   taskID,
   noteID,
}: Pick<h_Params, "projectID" | "taskID" | "noteID">) => {
   const { data, isError, isLoading } = useQuery({
      queryKey: ["like", noteID],
      queryFn: () => getListLikeMember({ projectID, taskID, noteID }),
      retry: false,
      refetchOnWindowFocus: false,
   });

   return { data, isError, isLoading };
};
