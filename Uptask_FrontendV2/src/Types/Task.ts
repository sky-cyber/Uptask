import { z } from "zod";
import { authShemma } from "./User";

export const TaskStatusSchemma = z.enum([
   "pending",
   "onHold",
   "inProgress",
   "underReview",
   "completed",
]);

export const LogMovTasksByUser = z.object({
   _id: z.string(),
   user: authShemma,
   status: z.string(),
   updateAt: z.string(),
});

export const TaskSchemma = z.object({
   _id: z.string(),
   name: z.string(),
   description: z.string(),
   status: TaskStatusSchemma,
   project: z.string(),
   createdAt: z.string(),
   updatedAt: z.string(),
   createBy: z.array(LogMovTasksByUser),
});

export const ListTasksSchema = z.array(TaskSchemma.omit({ createBy: true }));

export type Task = z.infer<typeof TaskSchemma>;

export type TaskCardData = Omit<Task, "createBy">;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskStatus = z.infer<typeof TaskStatusSchemma>;
