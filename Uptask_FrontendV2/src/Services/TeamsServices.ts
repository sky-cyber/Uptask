import api from "@/Lib/Axios";
import { Project } from "@/Types/Projects";
import { ListTeam, Team, TeamShemma } from "@/Types/Teams";

import { authShemma, UserEmailForm } from "@/Types/User";
import { isAxiosError } from "axios";

type FindMemberToProjectProps = {
   projectID: Project["_id"];
   userID: Team["_id"];
   formData: UserEmailForm;
};

export const FindMemberToProject = async ({
   projectID,
   formData,
}: Pick<FindMemberToProjectProps, "projectID" | "formData">) => {
   try {
      const url = `projects/${projectID}/team/find`;

      const { data } = await api.post<Team>(url, formData);
      const response = authShemma.safeParse(data);

      if (response.success) {
         return response.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const SaveMemberToProject = async ({
   projectID,
   userID,
}: Pick<FindMemberToProjectProps, "projectID" | "userID">) => {
   try {
      const url = `projects/${projectID}/team`;
      const { data } = await api.post<string>(url, { userID });
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const GetAllMemberToProject = async ({
   projectID,
}: Pick<FindMemberToProjectProps, "projectID">) => {
   try {
      const url = `projects/${projectID}/team`;
      const { data } = await api.get<ListTeam>(url);
      const response = TeamShemma.safeParse(data);
      if (response.success) {
         return response.data;
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const DeleteMemeberToProject = async ({
   projectID,
   userID,
}: Pick<FindMemberToProjectProps, "projectID" | "userID">) => {
   try {
      const url = `projects/${projectID}/team/${userID}`;
      const { data } = await api.delete<string>(url);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};
