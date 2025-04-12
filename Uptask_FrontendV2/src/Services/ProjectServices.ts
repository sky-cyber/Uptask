import api from "@/Lib/Axios";
import {
   Project,
   ProjectFormData,
   ProjectListSchema,
   ProjectSchema,
} from "@/Types/Projects";

import { isAxiosError } from "axios";

type ApiServicesProps = {
   formData: ProjectFormData;
   projectID: Project["_id"];
};

export const RegisterProject = async (formData: ProjectFormData) => {
   try {
      const { data } = await api.post<string>("/projects", formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const getAllProject = async () => {
   try {
      const { data } = await api.get<Project[]>("/projects");
      const result = ProjectListSchema.safeParse(data);
      if (result.success) {
         return result.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const getProjectById = async (projectID: Project["_id"]) => {
   try {
      const { data } = await api.get<Project>(`/projects/${projectID}`);
      const result = ProjectSchema.safeParse(data);
      if (result.success) {
         return result.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const updateProject = async ({
   projectID,
   formData,
}: Pick<ApiServicesProps, "projectID" | "formData">) => {
   try {
      const { data } = await api.put<string>(
         `/projects/${projectID}`,
         formData
      );
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const deleteProject = async (projectID: Project["_id"]) => {
   try {
      const { data } = await api.delete<string>(`/projects/${projectID}`);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};
