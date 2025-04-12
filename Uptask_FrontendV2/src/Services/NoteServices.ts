import api from "@/Lib/Axios";
import { ListNoteShema, Note } from "@/Types/Notes";
import { Project } from "@/Types/Projects";
import { Task } from "@/Types/Task";
import { isAxiosError } from "axios";
import { Content } from "../Types/Notes";

type NoteApiProps = {
   projectID: Project["_id"];
   taskID: Task["_id"];
   noteID: Note["_id"];
   formData: Content;
};

export const getNotesFromTask = async ({
   projectID,
   taskID,
}: Pick<NoteApiProps, "projectID" | "taskID">) => {
   try {
      const url = `projects/${projectID}/tasks/${taskID}/read-notes`;
      const { data } = await api.get(url);
      const response = ListNoteShema.safeParse(data);
      if (response.success) {
         return response.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const getNoteDetailsFromTask = async ({
   projectID,
   taskID,
   noteID,
}: Pick<NoteApiProps, "projectID" | "taskID" | "noteID">) => {
   try {
      const url = `projects/${projectID}/tasks/${taskID}/get-note/${noteID}`;
      const { data } = await api.get(url);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const createNoteFromTask = async ({
   projectID,
   taskID,
   formData,
}: Pick<NoteApiProps, "projectID" | "taskID" | "formData">) => {
   try {
      const url = `projects/${projectID}/tasks/${taskID}/create-note`;
      const { data } = await api.post<string>(url, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const deleteNoteFromTask = async ({
   projectID,
   taskID,
   noteID,
}: Pick<NoteApiProps, "projectID" | "taskID" | "noteID">) => {
   try {
      const url = `projects/${projectID}/tasks/${taskID}/delete-note/${noteID}`;
      const { data } = await api.delete<string>(url);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const updateNoteFromTask = async ({
   noteID,
   formData,
}: Pick<NoteApiProps, "noteID" | "formData">) => {
   try {
      const url = `projects/update-note/${noteID}`;
      const { data } = await api.patch<string>(url, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};
