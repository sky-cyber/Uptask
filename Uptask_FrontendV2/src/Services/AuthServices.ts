import api from "@/Lib/Axios";
import {
   authShemma,
   ConfirmAccountForm,
   ForgotPasswordForm,
   NewTokenForm,
   RestorePasswordTypeForm,
   UserLoginForm,
   UserRegristerForm,
} from "@/Types/User";
import { isAxiosError } from "axios";

export const RegisterUser = async (formData: UserRegristerForm) => {
   try {
      const url = `/auth/create-user`;
      const { data } = await api.post<string>(url, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const ConfirmAccountUser = async (
   token: ConfirmAccountForm["token"]
) => {
   try {
      const url = `/auth/confirm-account`;
      const { data } = await api.post<string>(url, { token });
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const sendNewToken = async (formData: NewTokenForm) => {
   try {
      const url = `/auth/new-token`;
      const { data } = await api.post<string>(url, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const authLogin = async (formData: UserLoginForm) => {
   try {
      const url = `/auth/login`;
      const { data } = await api.post<string>(url, formData);
      localStorage.setItem("AUTH_TOKEN", data);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
   try {
      const url = `/auth/forgot-password`;
      const { data } = await api.post<string>(url, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const requestCodePassword = async (
   token: ConfirmAccountForm["token"]
) => {
   try {
      const url = `/auth/request-code-password`;
      const { data } = await api.post<string>(url, { token });
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

type paramsApiProps = {
   Token: ConfirmAccountForm["token"];
   formData: RestorePasswordTypeForm;
};

export const restoreNewPassword = async ({
   Token,
   formData,
}: paramsApiProps) => {
   try {
      const url = `/auth/restore-new-password/${Token}`;
      const { data } = await api.post<string>(url, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
};

export const getUser = async () => {
   try {
      const url = "/auth/get-user";
      const { data } = await api.get(url);
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
