import api from "@/Lib/Axios";
import { Project } from "@/Types/Projects";
import { Task, TaskFormData, TaskSchemma } from "@/Types/Task";
import { isAxiosError } from "axios";

type ApiParamsServices = {
   projectID: Project["_id"];
   taskID: Task["_id"];
   status: Task["status"];
   formData: TaskFormData;
};

export const CreateTask = async ({
   projectID,
   formData,
}: Pick<ApiParamsServices, "projectID" | "formData">) => {
   try {
      const { data } = await api.post<string>(
         `projects/${projectID}/tasks`,
         formData
      );

      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const getTaskByID = async ({
   projectID,
   taskID,
}: Pick<ApiParamsServices, "projectID" | "taskID">) => {
   try {
      const { data } = await api.get<Task>(
         `projects/${projectID}/tasks/${taskID}`
      );

      const result = TaskSchemma.safeParse(data);
      if (result.success) {
         return result.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const updateTask = async ({
   projectID,
   taskID,
   formData,
}: Pick<ApiParamsServices, "projectID" | "taskID" | "formData">) => {
   try {
      const { data } = await api.put<string>(
         `projects/${projectID}/tasks/${taskID}`,
         formData
      );

      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const deleteTask = async ({
   projectID,
   taskID,
}: Pick<ApiParamsServices, "projectID" | "taskID">) => {
   try {
      const { data } = await api.delete<string>(
         `projects/${projectID}/tasks/${taskID}`
      );

      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const updateStatusTask = async ({
   projectID,
   taskID,
   status,
}: Pick<ApiParamsServices, "projectID" | "taskID" | "status">) => {
   try {
      const url = `projects/${projectID}/tasks/${taskID}/status`;
      const { data } = await api.patch<string>(url, { status });
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};
