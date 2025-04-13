import { z } from "zod";

export const UserSchemma = z.object({
   name: z.string(),
   email: z.string().email(),
   urlImagen: z.string(),
   password: z.string(),
   confirm_password: z.string(),
   token: z.string(),
});

export type User = z.infer<typeof UserSchemma>;

export type UserRegristerForm = Pick<
   User,
   "name" | "email" | "password" | "confirm_password"
>;

export type UserLoginForm = Pick<User, "email" | "password">;

export type UserEmailForm = Pick<User, "email">;

export type NewTokenForm = Pick<User, "email">;

export type ConfirmAccountForm = Pick<User, "token">;

export type ForgotPasswordForm = Pick<User, "email">;

export type RestorePasswordTypeForm = Pick<
   User,
   "password" | "confirm_password"
>;

export const authShemma = UserSchemma.pick({
   name: true,
   email: true,
   urlImagen: true,
}).extend({
   _id: z.string(),
});

export type Profile = z.infer<typeof authShemma>;
